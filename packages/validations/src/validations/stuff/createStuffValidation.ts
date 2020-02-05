import * as yup from "yup";

import { enumValidation } from "../sharedValidations/sharedValidations";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import { LongPayment } from "../../utils/enums/siteEnums";

export const createStuffValidation = yup.object().shape({
  availableLongPayment: enumValidation(LongPayment),

  expiration: yup.date().required("تاریخ انقضای محصول را باید وارد کنید "),

  inventoryNo: yup.number().required("شماره ی انبار را باید وارد کنید "),

  hasAbsolutePrice: yup.boolean().required("فیلد قیمت قطعی باید پر شود."),

  pricePercentage: yup.number(),

  price: yup.number(),

  wareId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  storeId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  twoMonthPricePercent: yup.number(),

  threeMonthPricePercent: yup.number(),

  fourMonthPricePercent: yup.number(),

  fiveMonthPricePercent: yup.number(),

  sixMonthPricePercent: yup.number(),

  sevenMonthPricePercent: yup.number(),

  eightMonthPricePercent: yup.number(),

  nineMonthPricePercent: yup.number(),

  tenMonthPricePercent: yup.number(),

  elevenMonthPricePercent: yup.number(),

  twelveMonthPricePercent: yup.number(),

  eighteenMonthPricePercent: yup.number(),

  twentyFourMonthPricePercent: yup.number(),

  barcode: yup.number(),

  qrc: yup.string(),

  isBarcodeSet: yup.boolean().required("آیا بارکد ست شده است؟"), //needs proper message

  isExpiring: yup.boolean()
});
