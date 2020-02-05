import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";

// import { struct } from "superstruct";
//
// export const CityValidation = struct({
//   name: "string",
//   enName: "string",
//   stateId: "string?",
//   location: "string?"
// });

export const createCityValidation = yup.object().shape({
  name: persianNameValidation("لطفا یک نام فارسی معتبر وارد کنید"),

  enName: englishNameValidation("لطفا یک نام انگلیسی معتبر وارد کنید"),

  stateId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  location: yup.string()
});
