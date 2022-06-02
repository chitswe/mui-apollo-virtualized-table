/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum LandType {
  AGRICULTURAL = "AGRICULTURAL",
  FREEHOLD = "FREEHOLD",
  GARDEN = "GARDEN",
  GRANT = "GRANT",
  ZONE = "ZONE",
}

export enum OwnerType {
  COMPANY = "COMPANY",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum PricingMethod {
  GFA = "GFA",
  NFA = "NFA",
}

export enum PropertyActiveStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  SOLD_OUT = "SOLD_OUT",
}

export enum PropertyOrderByInput {
  address = "address",
  address_Desc = "address_Desc",
  area = "area",
  area_Desc = "area_Desc",
  city_Name = "city_Name",
  city_Name_Desc = "city_Name_Desc",
  electricAndWaterMeter = "electricAndWaterMeter",
  electricAndWaterMeter_Desc = "electricAndWaterMeter_Desc",
  elevator = "elevator",
  elevator_Desc = "elevator_Desc",
  floor = "floor",
  floor_Desc = "floor_Desc",
  height = "height",
  height_Desc = "height_Desc",
  homeLoanAvailable = "homeLoanAvailable",
  homeLoanAvailable_Desc = "homeLoanAvailable_Desc",
  landType = "landType",
  landType_Desc = "landType_Desc",
  length = "length",
  length_Area = "length_Area",
  mBRoom = "mBRoom",
  mBRoom_Desc = "mBRoom_Desc",
  owner_Name = "owner_Name",
  owner_Name_Desc = "owner_Name_Desc",
  price = "price",
  price_Desc = "price_Desc",
  pricingMethod = "pricingMethod",
  pricingMethod_Desc = "pricingMethod_Desc",
  propertyCode = "propertyCode",
  propertyCode_Desc = "propertyCode_Desc",
  propertyStatus = "propertyStatus",
  propertyStatus_Desc = "propertyStatus_Desc",
  propertyType = "propertyType",
  propertyType_Desc = "propertyType_Desc",
  sBRoom = "sBRoom",
  sBRoom_Desc = "sBRoom_Desc",
  swimmingPool = "swimmingPool",
  swimmingPool_Desc = "swimmingPool_Desc",
}

export enum PropertyStatus {
  PROJECT = "PROJECT",
  RENT = "RENT",
  SELL = "SELL",
}

export enum PropertyType {
  APARTMENT = "APARTMENT",
  COMMERCIAL = "COMMERCIAL",
  CONDO = "CONDO",
  HOUSING = "HOUSING",
  LAND = "LAND",
  MINI_CONDO = "MINI_CONDO",
  OFFICE = "OFFICE",
  ZONE = "ZONE",
}

export interface CityWhereInput {
  aND?: CityWhereInput[] | null;
  oR?: CityWhereInput[] | null;
  id?: string | null;
  id_Not?: string | null;
  id_In?: string[] | null;
  id_NotIn?: string[] | null;
  id_Lt?: string | null;
  id_Lte?: string | null;
  id_Gt?: string | null;
  id_Gte?: string | null;
  id_Contains?: string | null;
  id_NotContains?: string | null;
  id_StartsWith?: string | null;
  id_NotStartsWith?: string | null;
  id_EndsWith?: string | null;
  id_NotEndsWith?: string | null;
  name?: string | null;
  name_Not?: string | null;
  name_In?: string[] | null;
  name_NotIn?: string[] | null;
  name_Lt?: string | null;
  name_Lte?: string | null;
  name_Gt?: string | null;
  name_Gte?: string | null;
  name_Contains?: string | null;
  name_NotContains?: string | null;
  name_StartsWith?: string | null;
  name_NotStartsWith?: string | null;
  name_EndsWith?: string | null;
  name_NotEndsWith?: string | null;
  alias?: string | null;
  alias_Not?: string | null;
  alias_In?: string[] | null;
  alias_NotIn?: string[] | null;
  alias_Lt?: string | null;
  alias_Lte?: string | null;
  alias_Gt?: string | null;
  alias_Gte?: string | null;
  alias_Contains?: string | null;
  alias_NotContains?: string | null;
  alias_StartsWith?: string | null;
  alias_NotStartsWith?: string | null;
  alias_EndsWith?: string | null;
  alias_NotEndsWith?: string | null;
  region?: RegionWhereInput | null;
}

export interface OwnerWhereInput {
  aND?: OwnerWhereInput[] | null;
  oR?: OwnerWhereInput[] | null;
  id?: string | null;
  id_Not?: string | null;
  id_In?: string[] | null;
  id_NotIn?: string[] | null;
  id_Lt?: string | null;
  id_Lte?: string | null;
  id_Gt?: string | null;
  id_Gte?: string | null;
  id_Contains?: string | null;
  id_NotContains?: string | null;
  id_StartsWith?: string | null;
  id_NotStartsWith?: string | null;
  id_EndsWith?: string | null;
  id_NotEndsWith?: string | null;
  code?: string | null;
  code_Not?: string | null;
  code_In?: string[] | null;
  code_NotIn?: string[] | null;
  code_Lt?: string | null;
  code_Lte?: string | null;
  code_Gt?: string | null;
  code_Gte?: string | null;
  code_Contains?: string | null;
  code_NotContains?: string | null;
  code_StartsWith?: string | null;
  code_NotStartsWith?: string | null;
  code_EndsWith?: string | null;
  code_NotEndsWith?: string | null;
  name?: string | null;
  name_Not?: string | null;
  name_In?: string[] | null;
  name_NotIn?: string[] | null;
  name_Lt?: string | null;
  name_Lte?: string | null;
  name_Gt?: string | null;
  name_Gte?: string | null;
  name_Contains?: string | null;
  name_NotContains?: string | null;
  name_StartsWith?: string | null;
  name_NotStartsWith?: string | null;
  name_EndsWith?: string | null;
  name_NotEndsWith?: string | null;
  contactPerson?: string | null;
  contactPerson_Not?: string | null;
  contactPerson_In?: string[] | null;
  contactPerson_NotIn?: string[] | null;
  contactPerson_Lt?: string | null;
  contactPerson_Lte?: string | null;
  contactPerson_Gt?: string | null;
  contactPerson_Gte?: string | null;
  contactPerson_Contains?: string | null;
  contactPerson_NotContains?: string | null;
  contactPerson_StartsWith?: string | null;
  contactPerson_NotStartsWith?: string | null;
  contactPerson_EndsWith?: string | null;
  contactPerson_NotEndsWith?: string | null;
  contactNumber?: string | null;
  contactNumber_Not?: string | null;
  contactNumber_In?: string[] | null;
  contactNumber_NotIn?: string[] | null;
  contactNumber_Lt?: string | null;
  contactNumber_Lte?: string | null;
  contactNumber_Gt?: string | null;
  contactNumber_Gte?: string | null;
  contactNumber_Contains?: string | null;
  contactNumber_NotContains?: string | null;
  contactNumber_StartsWith?: string | null;
  contactNumber_NotStartsWith?: string | null;
  contactNumber_EndsWith?: string | null;
  contactNumber_NotEndsWith?: string | null;
  address?: string | null;
  address_Not?: string | null;
  address_In?: string[] | null;
  address_NotIn?: string[] | null;
  address_Lt?: string | null;
  address_Lte?: string | null;
  address_Gt?: string | null;
  address_Gte?: string | null;
  address_Contains?: string | null;
  address_NotContains?: string | null;
  address_StartsWith?: string | null;
  address_NotStartsWith?: string | null;
  address_EndsWith?: string | null;
  address_NotEndsWith?: string | null;
  ownerType?: OwnerType | null;
  ownerType_Not?: OwnerType | null;
  ownerType_In?: (OwnerType | null)[] | null;
  ownerType_NotIn?: (OwnerType | null)[] | null;
}

export interface PaginationInput {
  page?: number | null;
  pageSize?: number | null;
  skip?: number | null;
  take?: number | null;
}

export interface PropertyWhereInput {
  aND?: PropertyWhereInput[] | null;
  oR?: PropertyWhereInput[] | null;
  id?: string | null;
  id_Not?: string | null;
  id_In?: string[] | null;
  id_NotIn?: string[] | null;
  id_Lt?: string | null;
  id_Lte?: string | null;
  id_Gt?: string | null;
  id_Gte?: string | null;
  id_Contains?: string | null;
  id_NotContains?: string | null;
  id_StartsWith?: string | null;
  id_NotStartsWith?: string | null;
  id_EndsWith?: string | null;
  id_NotEndsWith?: string | null;
  propertyCode?: string | null;
  propertyCode_Not?: string | null;
  propertyCode_In?: string[] | null;
  propertyCode_NotIn?: string[] | null;
  propertyCode_Lt?: string | null;
  propertyCode_Lte?: string | null;
  propertyCode_Gt?: string | null;
  propertyCode_Gte?: string | null;
  propertyCode_Contains?: string | null;
  propertyCode_NotContains?: string | null;
  propertyCode_StartsWith?: string | null;
  propertyCode_NotStartsWith?: string | null;
  propertyCode_EndsWith?: string | null;
  propertyCode_NotEndsWith?: string | null;
  price?: number | null;
  price_Not?: number | null;
  price_Lt?: number | null;
  price_Lte?: number | null;
  price_Gt?: number | null;
  price_Gte?: number | null;
  price_In?: any[] | null;
  price_NotIn?: any[] | null;
  price_IsBlank?: boolean | null;
  area?: number | null;
  area_Not?: number | null;
  area_Lt?: number | null;
  area_Lte?: number | null;
  area_Gt?: number | null;
  area_Gte?: number | null;
  area_In?: any[] | null;
  area_NotIn?: any[] | null;
  area_IsBlank?: boolean | null;
  length?: number | null;
  length_Not?: number | null;
  length_Lt?: number | null;
  length_Lte?: number | null;
  length_Gt?: number | null;
  length_Gte?: number | null;
  length_In?: any[] | null;
  length_NotIn?: any[] | null;
  length_IsBlank?: boolean | null;
  width?: number | null;
  width_Not?: number | null;
  width_Lt?: number | null;
  width_Lte?: number | null;
  width_Gt?: number | null;
  width_Gte?: number | null;
  width_In?: any[] | null;
  width_NotIn?: any[] | null;
  width_IsBlank?: boolean | null;
  height?: number | null;
  height_Not?: number | null;
  height_Lt?: number | null;
  height_Lte?: number | null;
  height_Gt?: number | null;
  height_Gte?: number | null;
  height_In?: any[] | null;
  height_NotIn?: any[] | null;
  height_IsBlank?: boolean | null;
  mBRoom?: number | null;
  mBRoom_Not?: number | null;
  mBRoom_Lt?: number | null;
  mBRoom_Lte?: number | null;
  mBRoom_Gt?: number | null;
  mBRoom_Gte?: number | null;
  mBRoom_In?: number[] | null;
  mBRoom_NotIn?: number[] | null;
  mBRoom_IsBlank?: boolean | null;
  sBRoom?: number | null;
  sBRoom_Not?: number | null;
  sBRoom_Lt?: number | null;
  sBRoom_Lte?: number | null;
  sBRoom_Gt?: number | null;
  sBRoom_Gte?: number | null;
  sBRoom_In?: number[] | null;
  sBRoom_NotIn?: number[] | null;
  sBRoom_IsBlank?: boolean | null;
  floor?: number | null;
  floor_Not?: number | null;
  floor_Lt?: number | null;
  floor_Lte?: number | null;
  floor_Gt?: number | null;
  floor_Gte?: number | null;
  floor_In?: number[] | null;
  floor_NotIn?: number[] | null;
  floor_IsBlank?: boolean | null;
  address?: string | null;
  address_Not?: string | null;
  address_In?: string[] | null;
  address_NotIn?: string[] | null;
  address_Lt?: string | null;
  address_Lte?: string | null;
  address_Gt?: string | null;
  address_Gte?: string | null;
  address_Contains?: string | null;
  address_NotContains?: string | null;
  address_StartsWith?: string | null;
  address_NotStartsWith?: string | null;
  address_EndsWith?: string | null;
  address_NotEndsWith?: string | null;
  elevator?: boolean | null;
  swimmingPool?: boolean | null;
  electricAndWaterMeter?: boolean | null;
  homeLoanAvailable?: boolean | null;
  about?: string | null;
  about_Not?: string | null;
  about_In?: string[] | null;
  about_NotIn?: string[] | null;
  about_Lt?: string | null;
  about_Lte?: string | null;
  about_Gt?: string | null;
  about_Gte?: string | null;
  about_Contains?: string | null;
  about_NotContains?: string | null;
  about_StartsWith?: string | null;
  about_NotStartsWith?: string | null;
  about_EndsWith?: string | null;
  about_NotEndsWith?: string | null;
  propertyType?: PropertyType | null;
  propertyType_Not?: PropertyType | null;
  propertyType_In?: (PropertyType | null)[] | null;
  propertyType_NotIn?: (PropertyType | null)[] | null;
  propertyStatus?: PropertyStatus | null;
  propertyStatus_Not?: PropertyStatus | null;
  propertyStatus_In?: (PropertyStatus | null)[] | null;
  propertyStatus_NotIn?: (PropertyStatus | null)[] | null;
  landType?: LandType | null;
  landType_Not?: LandType | null;
  landType_In?: (LandType | null)[] | null;
  landType_NotIn?: (LandType | null)[] | null;
  pricingMethod?: PricingMethod | null;
  pricingMethod_Not?: PricingMethod | null;
  pricingMethod_In?: (PricingMethod | null)[] | null;
  pricingMethod_NotIn?: (PricingMethod | null)[] | null;
  activeStatus?: PropertyActiveStatus | null;
  activeStatus_Not?: PropertyActiveStatus | null;
  activeStatus_In?: (PropertyActiveStatus | null)[] | null;
  activeStatus_NotIn?: (PropertyActiveStatus | null)[] | null;
  owner?: OwnerWhereInput | null;
  city?: CityWhereInput | null;
}

export interface RegionWhereInput {
  aND?: RegionWhereInput[] | null;
  oR?: RegionWhereInput[] | null;
  id?: string | null;
  id_Not?: string | null;
  id_In?: string[] | null;
  id_NotIn?: string[] | null;
  id_Lt?: string | null;
  id_Lte?: string | null;
  id_Gt?: string | null;
  id_Gte?: string | null;
  id_Contains?: string | null;
  id_NotContains?: string | null;
  id_StartsWith?: string | null;
  id_NotStartsWith?: string | null;
  id_EndsWith?: string | null;
  id_NotEndsWith?: string | null;
  name?: string | null;
  name_Not?: string | null;
  name_In?: string[] | null;
  name_NotIn?: string[] | null;
  name_Lt?: string | null;
  name_Lte?: string | null;
  name_Gt?: string | null;
  name_Gte?: string | null;
  name_Contains?: string | null;
  name_NotContains?: string | null;
  name_StartsWith?: string | null;
  name_NotStartsWith?: string | null;
  name_EndsWith?: string | null;
  name_NotEndsWith?: string | null;
  alias?: string | null;
  alias_Not?: string | null;
  alias_In?: string[] | null;
  alias_NotIn?: string[] | null;
  alias_Lt?: string | null;
  alias_Lte?: string | null;
  alias_Gt?: string | null;
  alias_Gte?: string | null;
  alias_Contains?: string | null;
  alias_NotContains?: string | null;
  alias_StartsWith?: string | null;
  alias_NotStartsWith?: string | null;
  alias_EndsWith?: string | null;
  alias_NotEndsWith?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
