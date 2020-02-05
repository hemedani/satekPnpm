import * as yup from "yup";
import { enumValidation } from "../sharedValidations/sharedValidations";
import { StoreStatus } from "../../utils/enums/siteEnums";

export const updateStoreStatusValidation = yup.object().shape({
  status: enumValidation(StoreStatus, "لطفا وضعیت جدید فروشگاه را مشخص کنید "),

  updateStatusDescription: yup
    .string()
    .min(10, "توضیحات شما بسیار کوتاه است")
    .required("لطفا فیلد توضیحات را پر کنید."),

  isActive: yup.boolean().required("لطفا وضعیت فعال بودن فروشگاه را مشخص کنید")
});
