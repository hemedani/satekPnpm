export const ConvertPayment = (val: string) => {
  switch (val) {
    case "twoMonth":
      return "پرداخت تا 2 ماه آینده";
    case "threeMonth":
      return "پرداخت تا 3 ماه آینده";
    case "fourMonth":
      return "پرداخت تا 4 ماه آینده";
    case "fiveMonth":
      return "پرداخت تا 5 ماه آینده";
    case "sixMonth":
      return "پرداخت تا 6 ماه آینده";
    case "sevenMonth":
      return "پرداخت تا 7 ماه آینده";
    case "eightMonth":
      return "پرداخت تا 8 ماه آینده";
    case "nineMonth":
      return "پرداخت تا 9 ماه آینده";
    case "tenMonth":
      return "پرداخت تا 10 ماه آینده";
    case "elevenMonth":
      return "پرداخت تا 11 ماه آینده";
    case "twelveMonth":
      return "پرداخت تا 12 ماه آینده";
    case "eighteenMonth":
      return "پرداخت تا 18 ماه آینده";
    case "twentyFourMonth":
      return "پرداخت تا 24 ماه آینده";
    default:
      return "";
  }
};
export const optionpayLong = [
  {
    label: "نقدی(پرداخت تا یک ماه)",
    value: "OneMonth"
  },
  {
    label: "پرداخت تا 2 ماه آینده",
    value: "twoMonth"
  },
  {
    label: "پرداخت تا 3 ماه آینده",
    value: "threeMonth"
  },
  {
    label: "پرداخت تا 4 ماه آینده",
    value: "fourMonth"
  },
  {
    label: "پرداخت تا 5 ماه آینده",
    value: "fiveMonth"
  },
  {
    label: "پرداخت تا 6 ماه آینده",
    value: "sixMonth"
  },
  {
    label: "پرداخت تا 7 ماه آینده",
    value: "sevenMonth"
  },
  {
    label: "پرداخت تا 8 ماه آینده",
    value: "eightMonth"
  },
  {
    label: "پرداخت تا 9 ماه آینده",
    value: "nineMonth"
  },
  {
    label: "پرداخت تا 10 ماه آینده",
    value: "tenMonth"
  },
  {
    label: "پرداخت تا 11 ماه آینده",
    value: "elevenMonth"
  },
  {
    label: "پرداخت تا 12 ماه آینده",
    value: "twelveMonth"
  },
  {
    label: "پرداخت تا 18 ماه آینده",
    value: "eighteenMonth"
  },
  {
    label: "پرداخت تا 24 ماه آینده",
    value: "twentyFourMonth"
  }
];
