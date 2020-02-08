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

const Roles = (role: string) => {
  switch (role) {
    case "Master":
      return "مدیر";
    case "Admin":
      return "ادمین";
    case "DiagnosisPosition":
      return "عیب یاب";
    case "OrganizationHead":
      return "مدیر سازمان";
    case "FinanceHead":
      return "مدیر مالی";
    case "FinanceEmployee":
      return "کارمند مالی";
    case "Expert":
      return "کارشناس";
    case "UnitHead":
      return "سرپست واحد";
    case "UnitEmployee":
      return "کارمند واحد";
    case "UniversityHead":
      return "رییس دانشگاه";
    case "StoreHead":
      return "مدیر فروشگاه";
    case "Normal":
      return "کارمند";
    default:
      return "";
  }
};
export default Roles;
