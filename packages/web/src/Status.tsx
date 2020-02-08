// const roles = [
//     "Master",
//     "Admin",
//     "DiagnosisPosition",
//     "OrganizationHead",
//     "FinanceHead",
//     "FinanceEmployee",
//     "Expert",
//     "UnitHead",
//     "UnitEmployee",
//     "UniversityHead",
//     "StoreHead",
//     "Normal"
//   ];

export const Status = (status: string) => {
  switch (status) {
    case "pendingInUnitHead":
      return "منتظر تایید مسیول واحد";
    case "rejectedByUnitHead":
      return "رد شده توسط مسیول واحد";
    case "pendingInOrganizationHead":
      return "منتظر تایید مقام تشخیص";
    case "rejectedByOrganizationHead":
      return "رد شده توسط مقام تشخیص";
    case "pendingInExpert":
      return "منتظر تایید کارشناس";
    case "pendingInFinance":
      return "منتظر تایید حسابداری";
    case "pendingInStore":
      return "منتظر تایید فروشگاه";
    case "PreparationByStore":
      return "آماده سازی فروشگاه";
    case "rejectedByStore":
      return "رد شده توسط فروشگاه";
    case "sentByStore":
      return "ارسال توسط فروشگاه";
    case "receivedByEmployee":
      return "تحویل گرفته شده توسظ کارمند";
    case "rejectedByEmployee":
      return "رد شده توسط کارمند";
    case "pendingForPay":
      return "منتظر پرداخت";
    case "rejectedForPay":
      return "پرداخت رد شده";
    case "Paid":
      return "پرداخت شده";
    case "pendingInAcountant":
      return "منتظر تایید حسابدار";
    default:
      return "";
  }
};

export const StatusLevel = (status: string) => {
  switch (status) {
    case "pendingInUnitHead":
      return "ثبت درخواست";
    case "rejectedByUnitHead":
      return "رد توسط مسیول واحد";
    case "pendingInOrganizationHead":
      return "مسیول واحد";
    case "rejectedByOrganizationHead":
      return "رد توسط مقام تشخیص";
    case "pendingInExpert":
      return "تایید کارشناس";
    case "pendingInFinance":
      return "تایید حسابداری";
    case "pendingInStore":
      return "مقام تشخیص";
    case "PreparationByStore":
      return "تامین درخواست";
    case "rejectedByStore":
      return "رد توسط فروشگاه";
    case "receivedByEmployee pendingForPay":
      return "دریافت کالا";
    case "sentByStore":
      return "ارسال کالا";
    case "receivedByEmployee":
      return "دریافت کالا";
    case "rejectedByEmployee":
      return "رد توسط کارمند";
    case "pendingForPay":
      return "مجوز پرداخت";
    case "rejectedForPay":
      return "پرداخت رد شده";
    case "Paid":
      return "مجوز پرداخت";
    default:
      return "واریز وجه";
  }
};
