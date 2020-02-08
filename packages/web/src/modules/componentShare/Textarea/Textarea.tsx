import classNames from "classnames";
import React, { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  title?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameTitle?: string;
  register?: any;
  isBordered: "true" | "false";
  defaultValue?: string;
}

export const Textarea: React.FC<Props> = ({
  name,
  value,
  placeholder,
  className,
  classNameTitle,
  title,
  style,
  titleStyle,
  isBordered,
  register,
  defaultValue
}) => {
  return (
    <div className={classNames("textarea-cnt", className)} style={style}>
      {title ? (
        <p style={titleStyle} className={classNames(classNameTitle, "title")}>
          {title}
        </p>
      ) : null}
      <textarea
        ref={register}
        className={classNames("textarea", isBordered)}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
};
