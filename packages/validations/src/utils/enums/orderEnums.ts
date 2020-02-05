//order.ts
export enum ChosenPayment {
  LongPayment,
  Incash
}

export enum FastDeliveryTime {
  OneHour = 1,
  TwoHour,
  ThreeHour,
  FourHour,
  FiveHour
}

export enum OrderStatus {
  pendingInUnitHead = 1,
  rejectedByUnitHead,
  pendingInOrganizationHead,
  rejectedByOrganizationHead,
  pendingInStore,
  PreparationByStore,
  rejectedByStore,
  sentByStore,
  rejectedByEmployee,
  pendingForPay,
  rejectedForPay,
  pendingInAcountant,
  partialDelivery,
  Paid
}

export enum CommentByExpertStatus {
  notSendFor = 1,
  sentNoResponse,
  responded
}

export enum CommentByFinanceStatus {
  notSendFor = 1,
  sentNoResponse,
  responded
}

export enum CheckByStockclerkStatus {
  NoResponse,
  responded
}

export enum CheckBySupplierStatus {
  NoResponse,
  responded
}

export enum CheckByStockclerk {
  Valid = 1,
  Invalid
}

export enum CheckBySupplier {
  Valid = 1,
  Invalid
}

export enum CheckByExpert {
  Valid = 1,
  Invalid
}

export enum CheckByFinance {
  Valid = 1,
  Invalid
}
