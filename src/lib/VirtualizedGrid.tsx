import * as React from "react";
import range from "lodash/range";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";
import {
    AutoSizer,
    Table,
    Index,
    Column,
    TableHeaderProps,
    SortDirectionType,
    TableCellProps,
    TableCellDataGetterParams,
    InfiniteLoader,
    RowMouseEventHandlerParams,
    Size,
    InfiniteLoaderChildProps,
    List,
    ListRowProps,
    SortDirection,
    ListProps,
    TableProps,
    ColumnProps,
    AutoSizerProps,
    InfiniteLoaderProps,
} from "react-virtualized";
import Box from '@mui/material/Box';
import classNames from "classnames";
import update from "immutability-helper";
import Badge from "@mui/material/Badge/Badge";
import TableSortLabel from "@mui/material/TableSortLabel/TableSortLabel";
import TableCell from "@mui/material/TableCell/TableCell";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Typography from "@mui/material/Typography/Typography";
import './style.css';
import { Skeleton } from "@mui/material";

const ListFixed = List as unknown as React.ElementType<ListProps>;
const TableFixed = Table as unknown as React.ElementType<TableProps>;
const ColumnFixed = Column as unknown as React.ElementType<ColumnProps>;
const AutoSizerFixed = AutoSizer as unknown as React.ElementType<AutoSizerProps>;
const InfiniteLoaderFixed = InfiniteLoader as unknown as React.ElementType<InfiniteLoaderProps>;

enum SearchMode {
    in = 1,
    contain = 2,
    startWith = 3,
}

enum CheckBoxColumnMode {
    none,
    first,
    last,
}

export interface GridColumn<T> {
    label: React.ReactNode;
    key: string;
    width: number;
    flexGrow?: number;
    sortable?: boolean;
    searchMode?: SearchMode;
    sortDirection?: SortDirectionType;
    sorted?: boolean;
    sortOrder?: number;
    labelAlign?: "right" | "left" | "center";
    textAlign?: "right" | "left" | "center";
    format?: (props: {
        key: string;
        rowData: T;
        selected: boolean;
        index: number;
        extraData: any;
    }) => React.ReactNode;
    hideAt?: number;
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

export interface VirtualizedGridProps<T> {
    extraData?: any,
    columns: ReadonlyArray<GridColumn<T>>;
    displayRowCount?: boolean;
    rowGetter: (index: number) => T;
    initialLoading: boolean;
    rowCount: number;
    totalRowCount: number;
    rowClassName?: string;
    onRowClick?: (rowData: T, index: number) => void;
    loadMoreRows: (page: number) => Promise<T[]>;
    isRowLoaded: (index: number) => boolean;
    pageSize?: number;
    onColumnPropsChanged?: (
        columns: ReadonlyArray<GridColumn<T>>,
        orderBy: string[]
    ) => void;
    listItemHeight?: number;
    listModeBreakPoint?: number;
    listItemRenderer?: (renderProps: ListItemRenderProps<T>) => JSX.Element;
    selectedItems: readonly number[];
    scrollToIndex?: number;
    loading?: boolean;
    tableClassName?: string;
    listClassName?: string;
    headerComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    rootClassName?: string;
    checkBoxColumnMode?: CheckBoxColumnMode;
    setSelectedItems?: (items: number[]) => void;
    selectedAll?: boolean;
    setSelectedAll?: (items: number[]) => void;
    clearSelectedAll?: () => void;
    registerForLoaderCacheReset?: (resetLoaderCache: () => void) => void;
}

const _sx = {
    circularProgress: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
    },
    cellLoadingIndicator: {
        backgroundColor: "#DDDDDD",
        flex: 1,
        color: "#DDDDDD",
    },
    tableCell: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "initial",
    },
    rowCountPanel: {
        textAlign: "center",
    }
};

class VritualizedGrid<T> extends React.PureComponent<VirtualizedGridProps<T>> {
    static defaultProps: any = {
        listItemHeight: 56,
        pageSize: 20,
        listModeBreakPoint: 600,
        checkBoxColumnMode: CheckBoxColumnMode.none,
        displayRowCount: true,
        selectedItems: [],
    };
    infiniteLoader: InfiniteLoader | null = null;
    tableRef: Table | null = null;
    listRef: List | null = null;
    loadingJobs: { [id: number]: Promise<T[]> } = {};
    getRowClassName({ index }: Index) {
        const { rowClassName, onRowClick, selectedItems } = this.props;
        return classNames("Vg-row", rowClassName, {
            "Vg-row-hover": index !== -1 && onRowClick != null,
            "Vg-row-selected": selectedItems && selectedItems.indexOf(index) > -1,
        });
    }

    componentDidUpdate({ extraData }: VirtualizedGridProps<T>) {
        if (extraData !== this.props.extraData) {
            if (this.listRef)
                this.listRef.forceUpdate();
            if (this.tableRef)
                this.tableRef.forceUpdate();
        }
    }

    triggerOnColumnPropsChanged(
        columns: ReadonlyArray<GridColumn<T>>,
        orderBy: string[]
    ) {
        const { onColumnPropsChanged } = this.props;

        if (!onColumnPropsChanged) {
            console.log(
                "%c onColumnPropsChanged function is not provided!",
                "color: red"
            );
            return;
        }
        this.resetInfiniteLoaderCache();
        onColumnPropsChanged(columns, orderBy);
    }

    handleOnRowClick(event: RowMouseEventHandlerParams) {
        const { onRowClick } = this.props;
        if (onRowClick) onRowClick(event.rowData as any, event.index);
    }

    headerRenderer({ label, columnData }: TableHeaderProps) {
        const { sortable, labelAlign, sortDirection, sorted, sortOrder } =
            columnData;
        const { columns } = this.props;
        const columnIndex = columns.indexOf(columnData);
        const inner = sortable ? (
            <Badge badgeContent={sortOrder} color="primary">
                <TableSortLabel
                    direction={sortDirection === "ASC" ? "asc" : "desc"}
                    active={sorted}
                    onClick={() => {
                        let newColumn = Object.assign({}, columnData);
                        if (sorted) {
                            switch (sortDirection) {
                                case "ASC":
                                    newColumn.sortDirection = "DESC";
                                    break;
                                case "DESC":
                                    newColumn.sorted = false;
                                    newColumn.sortDirection = null;
                                    break;
                                default:
                                    newColumn.sortDirection = "ASC";
                                    newColumn.sorted = true;
                            }
                        } else {
                            newColumn.sortDirection = "ASC";
                            newColumn.sorted = true;
                        }

                        var nextColumns = columns;

                        if (!sorted && newColumn.sorted) {
                            // change from non ordering to ordering
                            let maxSortOrder = 0;
                            for (let c of columns) {
                                let sortOrder = c.sortOrder ? c.sortOrder : 0;
                                if (sortOrder > 0) {
                                    if (c.key !== newColumn.key) {
                                        maxSortOrder = Math.max(maxSortOrder, sortOrder);
                                    }
                                }
                            }
                            newColumn.sortOrder = maxSortOrder + 1;
                        } else if (sorted && !newColumn.sorted) {
                            // change from ordering to non ordering
                            for (let c of columns) {
                                let sortOrder = c.sortOrder ? c.sortOrder : 0;
                                if (sortOrder > 0) {
                                    if (c.key !== newColumn.key) {
                                        if (sortOrder > newColumn.sortOrder) {
                                            nextColumns = update(nextColumns, {
                                                [columns.indexOf(c)]: {
                                                    sortOrder: {
                                                        $set: sortOrder - 1,
                                                    },
                                                },
                                            });
                                        }
                                    }
                                }
                            }
                            newColumn.sortOrder = null;
                        }

                        nextColumns = update(nextColumns, {
                            [columnIndex]: {
                                $set: newColumn,
                            },
                        });
                        var orders: GridColumn<T>[] = [];
                        nextColumns.forEach((c) => {
                            if (c.sorted && c.sortOrder) {
                                orders.push(c);
                            }
                        });
                        var _orderBy = orderBy(orders, ["sortOrder"], ["asc"]).map((c) => {
                            switch (c.sortDirection) {
                                case SortDirection.DESC:
                                    return `${c.key}_Desc`;
                                case SortDirection.ASC:
                                default:
                                    return c.key;
                            }
                        });
                        this.triggerOnColumnPropsChanged(nextColumns, _orderBy);
                    }}
                >
                    {label as React.ReactNode}
                </TableSortLabel>
            </Badge>
        ) : (
            label
        );

        return (
            <TableCell
                component="div"
                sx={_sx.tableCell}
                variant="head"
                style={{ height: 56 }}
                align={labelAlign}
            >
                {inner as React.ReactNode}
            </TableCell>
        );
    }

    cellRenderer({ cellData, columnData: { textAlign } }: TableCellProps) {
        const { onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                sx={_sx.tableCell}
                className={classNames("Vg-cell", {
                    "Vg-cell-noclick": onRowClick == null,
                })}
                variant="body"
                style={{ height: 56 }}
                align={textAlign}
            >
                {cellData === "--LOADING--" ? (
                    <Skeleton sx={_sx.cellLoadingIndicator}/>
                ) : (
                    cellData
                )}
            </TableCell>
        );
    }

    rowGetter(index: number) {
        const { rowGetter, selectedItems } = this.props;
        const rowData: any = rowGetter(index);
        if (rowData) {
            return {
                ...rowData,
                selected: selectedItems && selectedItems.includes(index),
                index,
            };
        }
        return rowData;
    }

    renderList(
        { width, height }: Size,
        { onRowsRendered, registerChild }: InfiniteLoaderChildProps
    ) {
        const {
            listItemHeight,
            rowCount,
            totalRowCount,
            pageSize,
            listItemRenderer,
            onRowClick,
            selectedItems,
            scrollToIndex,
            listClassName,
        } = this.props;
        if (!listItemRenderer)
            return <Typography color="error">List Item renderer function is missing.</Typography>
        return (
            <ListFixed
                scrollToIndex={
                    scrollToIndex || scrollToIndex === 0 ? scrollToIndex : -1
                }
                className={listClassName}
                ref={(r: any) => {
                    this.listRef = r;
                    registerChild(r);
                }}
                height={height}
                width={width}
                onRowsRendered={onRowsRendered}
                rowHeight={listItemHeight!}
                rowCount={Math.min(rowCount + pageSize!, totalRowCount)}
                rowRenderer={(props: ListRowProps) => {
                    const { index, style } = props;
                    const rowData = this.rowGetter(index);
                    return listItemRenderer({
                        rowData,
                        key: index.toString(),
                        style,
                        index,
                        selected: selectedItems && selectedItems.indexOf(index) > -1,
                        onClick: () => {
                            if (onRowClick) onRowClick(rowData, index);
                        },
                        className: classNames("Vg-row", {
                            "Vg-row-hover": index !== -1 && onRowClick != null,
                            "Vg-row-selected": selectedItems && selectedItems.indexOf(index) > -1,
                        }),
                    });
                }}
            />
        );
    }

    renderCheckBoxColumn() {
        const {
            setSelectedItems,
            setSelectedAll,
            clearSelectedAll,
            selectedAll,
            rowCount,
            selectedItems,
        } = this.props;
        return (
            <ColumnFixed
                dataKey="selected"
                columnData={{}}
                label={
                    <Checkbox
                        checked={selectedAll}
                        onChange={(e, checked) => {
                            if (checked) {
                                if (setSelectedAll)
                                    setSelectedAll(range(0, rowCount, 1));
                            } else {
                                if (clearSelectedAll)
                                    clearSelectedAll();
                            }
                        }}
                    />
                }
                width={96}
                className="Vg-column"
                headerRenderer={this.headerRenderer.bind(this)}
                cellRenderer={this.cellRenderer.bind(this)}
                disableSort={true}
                cellDataGetter={(params: TableCellDataGetterParams) => {
                    if (!params.rowData) return "--LOADING--";
                    else {
                        return (
                            <Checkbox
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                checked={params.rowData.selected}
                                onChange={(e, checked) => {
                                    if (!setSelectedItems)
                                        return;
                                    const { index } = params.rowData;
                                    if (checked) {
                                        setSelectedItems(
                                            update(selectedItems as number[], {
                                                $push: [index],
                                            })
                                        );
                                    } else if (selectedItems.indexOf(index) > -1) {
                                        setSelectedItems(
                                            update(selectedItems as number[], {
                                                $splice: [[selectedItems.indexOf(index), 1]],
                                            })
                                        );
                                    }
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }

    renderTable(
        { width, height }: Size,
        { onRowsRendered, registerChild }: InfiniteLoaderChildProps
    ) {
        const {
            columns,
            rowCount,
            totalRowCount,
            pageSize,
            scrollToIndex,
            tableClassName,
            checkBoxColumnMode,
            extraData
        } = this.props;
        return (
            <TableFixed
                scrollToIndex={
                    scrollToIndex || scrollToIndex === 0 ? scrollToIndex : -1
                }
                onRowClick={this.handleOnRowClick.bind(this)}
                onRowsRendered={onRowsRendered}
                ref={(r: any) => {
                    this.tableRef = r;
                    registerChild(r);
                }}
                rowGetter={({ index }) => {
                    return this.rowGetter(index);
                }}
                className={tableClassName}
                height={height}
                width={width}
                rowHeight={56}
                headerHeight={56}
                rowCount={Math.min(totalRowCount, rowCount + pageSize!)}
                rowClassName={this.getRowClassName.bind(this)}
            >
                {checkBoxColumnMode === CheckBoxColumnMode.first
                    ? this.renderCheckBoxColumn()
                    : null}
                {filter(
                    columns,
                    (column: GridColumn<T>) => !column.hideAt || column.hideAt < width
                ).map((column: GridColumn<T>) => {
                    const cellDataGetter = (params: TableCellDataGetterParams) => {
                        if (!params.rowData) return "--LOADING--";
                        else if (column.format) {
                            return column.format({
                                key: params.dataKey,
                                rowData: params.rowData,
                                selected: params.rowData.selected,
                                index: params.rowData.index,
                                extraData
                            });
                        } else {
                            const cellData = params.rowData[params.dataKey];
                            return cellData ? cellData.toString() : "";
                        }
                    };

                    return (
                        <ColumnFixed
                            key={column.key}
                            columnData={column}
                            dataKey={column.key}
                            label={column.label}
                            width={column.width}
                            className={classNames("Vg-column", column.key)}
                            headerRenderer={this.headerRenderer.bind(this)}
                            cellRenderer={this.cellRenderer.bind(this)}
                            disableSort={!column.sortable}
                            cellDataGetter={cellDataGetter}
                            flexGrow={column.flexGrow}
                        />
                    );
                })}
                {checkBoxColumnMode === CheckBoxColumnMode.last
                    ? this.renderCheckBoxColumn()
                    : null}
            </TableFixed>
        );
    }

    resetInfiniteLoaderCache() {
        this.loadingJobs = {};
        this.infiniteLoader?.resetLoadMoreRowsCache();
    }

    render() {
        const {
            rowCount,
            loadMoreRows,
            isRowLoaded,
            pageSize,
            totalRowCount,
            listModeBreakPoint,
            loading,
            rootClassName,
            headerComponent,
            footerComponent,
            registerForLoaderCacheReset,
        } = this.props;
        return (
            <Box flex={1} display="flex" sx={(theme) => ({ '& .Vg-row-hover:hover': { backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,.1)" : "rgba(254,254,254,.1)" }, '& .Vg-row-selected': { backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,.2)" : "rgba(254,254,254,.2)" } })} flexDirection="column" className={rootClassName}>
                {headerComponent}
                <Box flex={1} >
                    <InfiniteLoaderFixed
                        ref={(infiniteLoader: any) => {
                            this.infiniteLoader = infiniteLoader;
                            if (registerForLoaderCacheReset) {
                                registerForLoaderCacheReset(
                                    this.resetInfiniteLoaderCache.bind(this)
                                );
                            }
                        }}
                        loadMoreRows={({ startIndex, stopIndex }) => {
                            const page = Math.round(startIndex / pageSize! + 1);
                            if (!this.loadingJobs[page]) {
                                const job = loadMoreRows(page);
                                this.loadingJobs[page] = job;
                                return job
                                    .then((result) => {
                                        delete this.loadingJobs[page];
                                        return result;
                                    })
                                    .catch((e) => {
                                        delete this.loadingJobs[page];
                                    });
                            } else {
                                return this.loadingJobs[page];
                            }
                        }}
                        rowCount={Math.min(rowCount + pageSize!, totalRowCount)}
                        minimumBatchSize={pageSize}
                        isRowLoaded={({ index }) => isRowLoaded(index)}
                    >
                        {(infiniteLoaderProps) => (
                            <AutoSizerFixed defaultHeight={500}>
                                {(size) => {
                                    if (loading)
                                        return (
                                            <CircularProgress
                                                color="secondary"
                                                sx={_sx.circularProgress}
                                            />
                                        );
                                    else if (size.width <= (listModeBreakPoint ?? 0))
                                        return this.renderList(size, infiniteLoaderProps);
                                    else return this.renderTable(size, infiniteLoaderProps);
                                }}
                            </AutoSizerFixed>
                        )}
                    </InfiniteLoaderFixed>
                </Box>
                {this.props.displayRowCount ? (
                    <Typography
                        variant="body2"
                        color={
                            this.props.selectedAll || this.props.selectedItems.length > 0
                                ? "secondary"
                                : "textPrimary"
                        }
                        sx={_sx.rowCountPanel}
                    >
                        {(() => {
                            if (
                                this.props.selectedAll ||
                                this.props.selectedItems.length > 0
                            ) {
                                if (this.props.selectedAll) {
                                    return `Total ${totalRowCount} rows selected`;
                                } else {
                                    return `${this.props.selectedItems.length} of ${totalRowCount} rows selected`;
                                }
                            } else {
                                return `${rowCount} of ${totalRowCount} rows loaded`;
                            }
                        })()}
                    </Typography>
                ) : null}
                {footerComponent}
            </Box>
        );
    }
}
export { CheckBoxColumnMode, SearchMode }
export default VritualizedGrid;