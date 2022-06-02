import { ApolloClient, ApolloQueryResult, useQuery } from "@apollo/client";
import range from "lodash/range";
import * as React from "react";
import VirtualizedGrid, { CheckBoxColumnMode, GridColumn, SearchMode, VirtualizedGridProps } from "./VirtualizedGrid";

export type PageInfo = {
    currentPage: number | null;
    hasNextPage: boolean | null;
    hasPreviousPage: boolean | null;
    pageCount: number | null;
    pageSize: number | null;
    endCursor?: string | null;
    rowCount: number | null;
};

const DefaultPageInfoValue: PageInfo = {
    currentPage: null,
    hasNextPage: false,
    hasPreviousPage: false,
    pageCount: 0,
    pageSize: 0,
    endCursor: null,
    rowCount: 0
};


export interface ApolloListResult<T> {
    edges: T[];
    pageInfo: PageInfo;
}

export interface ListItemRenderProps<T> {
    rowData: T;
    key: string;
    style: React.CSSProperties;
    index: number;
    className: string;
    onClick: () => void;
    selected: boolean;
}

export interface ApolloVirtualizedGridProps<T> {
    extraData?: any;
    refetchRequestCounter?: number;
    columns: ReadonlyArray<GridColumn<T>>;
    pageSize?: number;
    graphqlQuery: any;
    variables: any;
    listPropsName?: string;
    parseListFromQueryResult?: (queryResult: any) => ApolloListResult<T> | undefined;
    onColumnPropsChanged?: (
        columns: ReadonlyArray<GridColumn<T>>,
        orderBy: string[]
    ) => void;
    onRowClick?: (rowData: T, index: number) => void;
    listItemHeight?: number;
    listModeBreakPoint?: number;
    listItemRenderer?: (renderProps: ListItemRenderProps<T>) => JSX.Element;
    selectedItems: ReadonlyArray<number>;
    scrollToIndex?: number;
    onDataFetched?: (data: any) => void;
    tableClassName?: string;
    listClassName?: string;
    rootClassName?: string;
    headerComponent?: React.ReactNode;
    checkBoxColumnMode?: CheckBoxColumnMode;
    setSelectedItems?: (items: number[]) => void;
    selectedAll?: boolean;
    setSelectedAll?: (items: number[]) => void;
    clearSelectedAll?: () => void;
    displayRowCount?: boolean;
    debugname?: string;
    onLoadMore: (pagination: {
        page: number;
        pageSize: number;
        after: string;
    }) => any;
    apolloClient?: ApolloClient<object>;
}


function ApolloVirtualizedGrid<T>({ pageSize = 20, listPropsName = "list", displayRowCount = true, refetchRequestCounter = 1, scrollToIndex = -1, ...props }: ApolloVirtualizedGridProps<T>) {
    const { graphqlQuery, apolloClient, variables, onLoadMore, onDataFetched, parseListFromQueryResult, extraData, checkBoxColumnMode, setSelectedItems, selectedAll, setSelectedAll, clearSelectedAll, headerComponent, rootClassName, tableClassName, listClassName, listItemHeight, listItemRenderer, listModeBreakPoint, onColumnPropsChanged, onRowClick, selectedItems, columns } = props;
    const [_scrollToIndex, setScrollToIndex] = React.useState(scrollToIndex);
    React.useEffect(() => {
        if (!scrollToIndex) setScrollToIndex(-1);
        else {
            setScrollToIndex(scrollToIndex);
        }
    }, [_scrollToIndex, scrollToIndex]);
    const lastFatchedData = React.useRef<any>(undefined);
    const loaderCacheResetor = React.useRef<() => void>();

    const refetchQuery = React.useRef<undefined | ((variables: Partial<any> | undefined) => Promise<ApolloQueryResult<any>>)>(undefined);

    const { networkStatus, fetchMore, data, refetch } = useQuery(graphqlQuery, {
        client: apolloClient, notifyOnNetworkStatusChange: true, variables, fetchPolicy: "network-only", onCompleted: (data) => {
            if (onDataFetched && lastFatchedData.current !== data) {
                onDataFetched(data);
            }
            lastFatchedData.current = data;
        }
    });


    React.useEffect(() => {
        refetchQuery.current = refetch;
    }, [refetch]);

    React.useEffect(() => {
        if (loaderCacheResetor.current)
            loaderCacheResetor.current();
    }, [variables]);

    const parseList = React.useCallback((data: any) => {
        const defaultListResult = {
            edges: new Array<T>(),
            pageInfo: {
                hasNextPage: true,
                rowCount: 0,
            },
        };
        if (!data)
            return defaultListResult;
        if (parseListFromQueryResult)
            return parseListFromQueryResult(data);
        if (data[listPropsName])
            return data[listPropsName];
        return defaultListResult;
    }, [listPropsName, parseListFromQueryResult]);

    const parsedList = React.useMemo(() => {
        let parsedList = parseList(data);
        if (!parsedList)
            parsedList = {
                edges: [],
                pageInfo: {
                    hasNextPage: true,
                    rowCount: 0,
                },
            };
        return parsedList;
    }, [data, parseList]);

    const { pageInfo } = parsedList;

    const loadMoreRows = React.useCallback(async (page: number) => {
        const v = onLoadMore({
            page,
            pageSize,
            after: pageInfo.endCursor,
        });
        const moreResult = await fetchMore({
            variables: v,
        });
        const newEdges = parseList(moreResult).edges;
        if (selectedAll && setSelectedAll) {
            const newSelected = range(
                parsedList.edges.length,
                parsedList.edges.length + newEdges.length,
                1
            );
            setSelectedAll([...selectedItems, ...newSelected]);
        }
        return newEdges
    }, [fetchMore, onLoadMore, pageInfo.endCursor, pageSize, parseList, parsedList.edges.length, selectedAll, selectedItems, setSelectedAll]);
    return (
        <VirtualizedGrid
            extraData={extraData}
            displayRowCount={displayRowCount}
            registerForLoaderCacheReset={(resetor: () => void) => {
                loaderCacheResetor.current = resetor;
            }}
            checkBoxColumnMode={checkBoxColumnMode}
            setSelectedItems={setSelectedItems}
            selectedAll={selectedAll}
            setSelectedAll={setSelectedAll}
            clearSelectedAll={clearSelectedAll}
            headerComponent={headerComponent}
            rootClassName={rootClassName}
            tableClassName={tableClassName}
            listClassName={listClassName}
            loading={
                networkStatus === 1 ||
                networkStatus === 2 ||
                networkStatus === 4
            }
            scrollToIndex={_scrollToIndex}
            listItemHeight={listItemHeight}
            listItemRenderer={listItemRenderer}
            listModeBreakPoint={listModeBreakPoint}
            onColumnPropsChanged={onColumnPropsChanged}
            onRowClick={onRowClick}
            selectedItems={selectedItems}
            loadMoreRows={loadMoreRows}
            rowGetter={(index: number) => parsedList.edges[index]}
            totalRowCount={pageInfo.rowCount}
            rowCount={parsedList.edges.length}
            isRowLoaded={(index: number) =>
                parsedList && !!parsedList.edges[index]
            }
            columns={columns}
            pageSize={pageSize}
            initialLoading={networkStatus === 1}
        />
    );
}

export default ApolloVirtualizedGrid;
export {
    DefaultPageInfoValue,
    SearchMode,
    CheckBoxColumnMode, VirtualizedGrid
};
export type { VirtualizedGridProps };
export type { GridColumn };
