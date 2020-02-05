import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";

// import { struct } from "superstruct";
//
// export const CityValidation = struct({
//   name: "string",
//   enName: "string",
//   stateId: "string?",
//   location: "string?"
// });

export const createClassGroupValidation = yup.object().shape({
  wareClassId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  ),

  wareGroupId: uuidValidation(
    "آیدی وارد شده درست نیست ",
    "لطفا یک آیدی معتبر وارد کنید "
  )
});
