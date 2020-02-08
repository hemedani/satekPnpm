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

const StatusToColor = (status: string) => {
  const result = [];
  switch (status) {
    case "pendingInUnitHead":
      return "orange";
    case "rejectedByUnitHead":
      return "red";
    case "pendingInOrganizationHead":
      return "orange";
    case "rejectedByOrganizationHead":
      return "red";
    case "pendingInExpert":
      return "orange";
    case "pendingInFinance":
      return "orange";
    case "pendingInStore":
      return "orange";
    case "PreparationByStore":
      return "orange";
    case "rejectedByStore":
      return "red";
    case "sentByStore":
      return "orange";
    case "receivedByEmployee":
      return "green";
    case "rejectedByEmployee":
      return "red";
    case "pendingForPay":
      return "orange";
    case "rejectedForPay":
      return "red";
    case "Paid":
      return "green";
    default:
      return "";
  }
};
export default StatusToColor;
