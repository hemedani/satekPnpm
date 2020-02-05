import * as yup from "yup";
import {
  persianNameValidation,
  englishNameValidation
} from "../sharedValidations/sharedValidations";

export const createStateValidation = yup.object().shape({
  name: persianNameValidation(),
  enName: englishNameValidation()
});
