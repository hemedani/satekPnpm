import { FieldProps } from "formik";
import React from "react";
import { Props, Selector, SelectorOptions } from "./Selector";

export const CustomSelectorComponent: React.FC<FieldProps & Props> = ({
  form,
  field,
  options,
  placeholder,
  label
}) => (
  <Selector
    placeholder={placeholder}
    style={{ display: "flex", alignItems: "center" }}
    width="12rem"
    name="stateId"
    label={label}
    options={options}
    onChange={(option: SelectorOptions) =>
      form.setFieldValue(field.name, option.value)
    }
  />
);
