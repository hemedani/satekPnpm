
export const allRoles = [
  "Master",
  "Admin",
  "DiagnosisPosition",
  "OrganizationHead",
  "FinanceHead",
  "FinanceEmployee",
  "Expert",
  "UnitHead",
  "UnitEmployee",
  "UniversityHead",
  "StoreHead",
  "Normal"
];

export const headRoles = [
  "Admin",
  "DiagnosisPosition",
  "FinanceHead",
  "FinanceEmployee",
  "Expert",
  "UnitHead",
  "UnitEmployee",
  "Normal"
];

export const unitHeadRoles = ["UnitEmployee", "Normal"];

export const hospitalRoles = [""];

export const unitRoles = ["UnitHead", "UnitEmployee"];

export const whichRole = (role: string) => {
  switch (role) {
    case "Admin":
      return allRoles;
    case "OrganizationHead":
      return headRoles;
    case "UnitHead":
      return unitHeadRoles;
    default:
      return unitHeadRoles;
  }
};
