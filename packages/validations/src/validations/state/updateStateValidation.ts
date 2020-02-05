import * as yup from "yup";
import {
  englishNameValidation,
  persianNameValidation
} from "../sharedValidations/sharedValidations";

export const updateStateValidation = yup.object().shape({
  name: persianNameValidation(),
  enName: englishNameValidation()
});
