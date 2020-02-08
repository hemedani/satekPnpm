import classNames from "classnames";
import { FieldProps } from "formik";
import React, { CSSProperties } from "react";

export interface Props {
  onChange?(props: any): any;
  style?: CSSProperties;
  title: string;
  name?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  titleStyle?: CSSProperties;
  size: "medium" | "large";
  type?: string;
}

export const CustomInputFormik: React.FC<FieldProps & Props> = ({
  onChange,
  name,
  value,
  placeholder,
  className,
  title,
  style,
  size,
  titleStyle,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <div className={classNames("input-cnt", className, size)} style={style}>
      {title ? (
        <p style={titleStyle} className="title">
          {title}
        </p>
      ) : null}
      <input
        className="input"
        type="text"
        {...field}
        {...props}
        placeholder={placeholder ? placeholder : ""}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

// const CustomInputComponent = ({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   ...props
// }) => (
//   <div>
//     <input type="text" {...field} {...props} />
//     {touched[field.name] && errors[field.name] && (
//       <div className="error">{errors[field.name]}</div>
//     )}
//   </div>
// );

// <Field name="firstName" component={CustomInputComponent} />;

// const InputComponent: React.FC<FieldProps & Props> = ({
//   form,
//   field,
//   title,
//   name
// }) => (
//   <Input
//     {...field}
//     {...props}
//     size="medium"
//     title={title}
//     name={name}
//     onChange={e => form.setFieldValue(field.name, e.target.value)}
//   />
// );
