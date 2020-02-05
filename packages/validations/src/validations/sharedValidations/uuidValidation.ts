//uuid v4 validation
import * as yup from "yup";
export const uuidValidationObject = yup.object().shape({
  id: yup
    .string()
    .matches(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      {
        message: "آیدی وارد شده درست نیست ",
        excludeEmptyString: true
      }
    )
    .required("لطفا یک آیدی معتبر وارد کنید ") //cool uuid regex here
});

export const uuidValidation = (
  matchMessage: string,
  requiredMessage?: string
) => {
  if (requiredMessage) {
    return yup
      .string()
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        {
          message: matchMessage,
          excludeEmptyString: true
        }
      )
      .required(requiredMessage);
  } else {
    return yup
      .string()
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        {
          message: matchMessage,
          excludeEmptyString: true
        }
      );
  }
};
