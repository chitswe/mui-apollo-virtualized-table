import * as React from "react";
import { GridColumn, CheckBoxColumnMode, ListItemRenderProps } from "./lib/VirtualizedGrid";
import ApolloVirtualizedGrid, { ApolloListResult, ApolloVirtualizedGridProps } from "./lib";
import query from "./graphql";
import { PropertyFindAll, PropertyFindAllVariables, PropertyFindAll_propertyQuery_properties_edges } from "./__generated__/PropertyFindAll";
import update from "immutability-helper";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";


const ExampleVirtualizeGrid = ApolloVirtualizedGrid as React.ElementType<ApolloVirtualizedGridProps<PropertyFindAll_propertyQuery_properties_edges>>

type Props = {};

type State = {
  columns: ReadonlyArray<GridColumn<PropertyFindAll_propertyQuery_properties_edges>>;
  variables: PropertyFindAllVariables;
  selected: number[];
  selectedAll: boolean;
};

class Example extends React.Component<Props, State> {
  state: State = {
    selectedAll: false,
    selected: [],
    columns: [
      {
        label: "Code",
        key: "propertyCode",
        sortable: true,
        width: 200
      },
      {
        label: "Address",
        key: "address",
        width: 200,
        flexGrow: 1,
        sortable: true
      },
      {
        label: "Price",
        key: "price",
        width: 100,
        textAlign: "right",
        labelAlign: "right"
      },
      {
        label: "City",
        key: "city/id",
        width: 150,
        format: ({ key, rowData }) => {
          return rowData?.city?.name
        }
      }
    ],
    variables: {
      pagination: {
        pageSize: 40
      }
    }
  };
  render() {
    const { columns, variables, selected, selectedAll } = this.state;
    return (
      <ExampleVirtualizeGrid
        displayRowCount={false}
        checkBoxColumnMode={CheckBoxColumnMode.first}
        setSelectedAll={(items) => {
          this.setState({ selectedAll: true, selected: items });
        }}
        clearSelectedAll={() => {
          this.setState({ selected: [], selectedAll: false });
        }}
        setSelectedItems={(items) => {
          this.setState({ selected: items, selectedAll: false });
        }}
        selectedAll={selectedAll}

        selectedItems={selected}
        graphqlQuery={query}
        columns={columns}
        variables={variables}
        onRowClick={(data, index) => {
          this.setState({ selected: [index] });
          // window.location.href = `https://github.com/${data.nameWithOwner}`;
        }}
        pageSize={variables.pagination?.pageSize!}
        listItemHeight={82}
        listModeBreakPoint={600}
        parseListFromQueryResult={(queryResult: PropertyFindAll) => {
          const properties = queryResult?.propertyQuery?.properties;
          if (!properties) {
            return undefined;
          }
          const result: ApolloListResult<PropertyFindAll_propertyQuery_properties_edges> = properties;
          return result;
        }}
        onColumnPropsChanged={(columns, orderBy:any) => {
          this.setState({ columns });
          const newVariables: PropertyFindAllVariables = {
            ...variables,
            orderBy,
          };
          this.setState({variables:newVariables});
        }}

        listItemRenderer={(renderProps: ListItemRenderProps<PropertyFindAll_propertyQuery_properties_edges>) => {
          const { rowData, key, style, className, onClick } = renderProps;
          if (rowData) {
            const { propertyCode, city } = rowData;
            return (
              <div onClick={onClick} style={style} className={`${className} Vg-list`} key={key}>
                <ListItem>
                  <ListItemText primary={propertyCode} secondary={`${city.alias}-${city.name}`} />
                </ListItem>
                <Divider/>
              </div>
            );
          } else {
            return (
              <div style={style} key={key} className={`${className} Vg-list`}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Skeleton sx={{ color: "rgba(0,0,0,0)" }}>A.....................</Skeleton>
                    }
                    secondary={
                      <Skeleton sx={{ color: "rgba(0,0,0,0)" }}>A.......................................</Skeleton>
                    }
                  />
                </ListItem>
                <Divider/>
              </div>
            );
          }
        }}
        onLoadMore={pageInfo => {
          return update(variables, {
            pagination: {
              page: {
                $set: pageInfo.page
              }
            }
          });
        }}
      />
    );
  }
}

export default Example;
