/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PropertyWhereInput, PropertyOrderByInput, PaginationInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: PropertyFindAll
// ====================================================

export interface PropertyFindAll_propertyQuery_properties_edges_city_region {
  id: string | null;
  alias: string | null;
  name: string;
}

export interface PropertyFindAll_propertyQuery_properties_edges_city {
  id: string | null;
  alias: string | null;
  name: string;
  region: PropertyFindAll_propertyQuery_properties_edges_city_region | null;
}

export interface PropertyFindAll_propertyQuery_properties_edges {
  id: string | null;
  address: string;
  city: PropertyFindAll_propertyQuery_properties_edges_city;
  price: number | null;
  propertyCode: string;
}

export interface PropertyFindAll_propertyQuery_properties_pageInfo {
  /**
   * Current page number of result set.
   */
  currentPage: number | null;
  /**
   * If true, next page is availabe.
   */
  hasNextPage: boolean | null;
  /**
   * If true, previous page is available
   */
  hasPreviousPage: boolean | null;
  /**
   * Total number of pages to be fetched
   */
  pageCount: number | null;
  /**
   * Number of rows in a page
   */
  pageSize: number | null;
  /**
   * Total number of rows to be fetched
   */
  rowCount: number | null;
}

export interface PropertyFindAll_propertyQuery_properties {
  /**
   * Actual list of connection
   */
  edges: PropertyFindAll_propertyQuery_properties_edges[];
  /**
   * Pagination info.
   */
  pageInfo: PropertyFindAll_propertyQuery_properties_pageInfo;
}

export interface PropertyFindAll_propertyQuery {
  id: string | null;
  properties: PropertyFindAll_propertyQuery_properties | null;
}

export interface PropertyFindAll {
  propertyQuery: PropertyFindAll_propertyQuery | null;
}

export interface PropertyFindAllVariables {
  where?: PropertyWhereInput | null;
  orderBy?: (PropertyOrderByInput | null)[] | null;
  pagination?: PaginationInput | null;
}
