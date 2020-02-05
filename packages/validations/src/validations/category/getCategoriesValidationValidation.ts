import * as yup from "yup";
import { uuidValidation } from "../sharedValidations/uuidValidation";
import {
  englishNameValidation,
  persianNameValidation
} from "../sharedValidations/sharedValidations";

export const getCategoriesInputValidation = yup.object().shape({
  name: persianNameValidation(),

  enName: englishNameValidation(),

  cityId: uuidValidation("آی دی وارد شده درست نیست "),

  stateId: uuidValidation("آی دی منطقه وارد شده درست نیست "),

  unitId: uuidValidation("آی دی واحد وارد شده درست نیست "),

  universityId: uuidValidation("آی دی دانشگاه وارد شده درست نیست "),

  organizationId: uuidValidation("آی دی سازمان وارد شده درست نیست ")
});
