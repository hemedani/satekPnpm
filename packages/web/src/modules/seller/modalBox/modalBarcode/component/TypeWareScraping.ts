export interface MyREST {
  allInfo: AllInfo;
}

export interface AllInfo {
  resData: ResData;
  supplyData: SupplyData;
  catalog: Catalog;
}

export interface Catalog {
  productName: string;
  productNameEn: string;
  productDetailsTable: ProductDetailsTable;
  merchandiseSpecs: MerchandiseSpecs;
}

export interface MerchandiseSpecs {
  countUnit: string;
  shape: string;
  doz: string;
  boxType: string;
  businessName: string;
  constructRefrence: string;
  construcCountry: string;
  releaseRefrence: string;
  type: string;
}

export interface ProductDetailsTable {
  companyName: string;
  merchandiseNationalCode: string;
  businessName: string;
  techNumber: string;
  GS1: string;
  internationalCondes: InternationalCondes;
}

export interface InternationalCondes {
  firstCode: string;
  secondCode: string;
  thirdCode: string;
}

export interface ResData {
  initialIranCodeInfo: { [key: string]: string };
  suplierInfo: SuplierInfo;
}

export interface SuplierInfo {
  gs1: string;
  catalogUrl: string;
  memberCode: string;
}

export interface SupplyData {
  activityField: string;
  memberCode: string;
  supplierName: string;
  ceoName: string;
  companyType: string;
  personType: string;
  activityType: string;
  history: string;
  products: Products;
  contactInfo: ContactInfo;
}

export interface ContactInfo {
  mainOffice: string;
  postalCode: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
}

export interface Products {
  "number of products ": string;
  "number of self developed products ": string;
  "number of imported productions ": string;
}
