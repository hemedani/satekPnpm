import classNames from "classnames";
import React, { CSSProperties, useState } from "react";
export interface Props {
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onKeyPress?:
    | ((event: React.KeyboardEvent<HTMLInputElement>) => void)
    | undefined;
  onBlur?(props: any): any;
  style?: CSSProperties;
  title: string;
  name?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameTitle?: string;
  titleStyle?: CSSProperties;
  register?: any;
  selectType?: string;
  height?: string;
  size: "medium" | "large";
  postFix?: string;
  defaultValue?: string;
  padding?: string;
  clear?: boolean;
  callBackFunc?: (variable: string) => void;
}

export const Input: React.FC<Props> = ({
  onChange,
  onKeyPress,
  name,
  value,
  placeholder,
  className,
  classNameTitle,
  title,
  style,
  titleStyle,
  size,
  register,
  height,
  selectType,
  postFix,
  defaultValue,
  clear,
  padding,
  onBlur,
  callBackFunc
}) => {
  const [myValue, setMyValue] = useState(defaultValue);
  const [mysValue, setMysValue] = useState(value);
  function clearMethod() {
    setMysValue(undefined);
    setMyValue("");
    callBackFunc && callBackFunc("");
  }
  return (
    <div className={classNames("input-cnt", className, size)} style={style}>
      {title ? (
        <p style={titleStyle} className={classNames("title", classNameTitle)}>
          {title}
        </p>
      ) : null}
      <div className={classNames("cnt", { "search-wrapper": clear })}>
        <input
          onKeyPress={onKeyPress}
          ref={register}
          defaultValue={myValue}
          type={selectType ? selectType : "text"}
          onChange={onChange}
          value={mysValue}
          name={name}
          onBlur={onBlur}
          style={{ height: height, padding: padding }}
          className={classNames("input", { "clear-input": clear })}
          placeholder={placeholder ? placeholder : ""}
        />
        {clear && (
          <button
            onClick={clearMethod}
            className="close-icon-input"
            type="reset"
          >
            <span className="ic_reject size-icon-input"></span>
          </button>
        )}
      </div>
      {postFix && (
        <p style={titleStyle} className="title">
          {postFix}
        </p>
      )}
    </div>
  );
};
