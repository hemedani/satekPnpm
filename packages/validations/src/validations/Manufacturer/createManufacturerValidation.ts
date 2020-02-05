import * as yup from "yup";
import {
  persianNameValidation,
  englishNameValidation,
  countryNameValidation
} from "../sharedValidations/sharedValidations";

export const createManufacturerValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام فارسی معتبر وارد کنید"),

  enName: englishNameValidation("لطفا یک نام انگلیسی معتبر وارد کنید"),

  country: countryNameValidation("لطفا نام کشور را وارد کنید ")
});
