import React, { CSSProperties } from "react";
interface Props {
  textInput: string;
  widthInput?: string;
  border?: string;
  boxShadow?: string;
  inputReturn?(props: any): void;
  type?: string;
  innerRef?: any;
  name?: string;
  height?: string;
  labelStyle?: CSSProperties;
  fontSize?: string;
}

export const InputComponent: React.FC<Props> = ({
  boxShadow,
  border,
  textInput,
  widthInput,
  inputReturn,
  type,
  innerRef,
  name,
  height,
  fontSize,
  labelStyle
}) => {
  return (
    <React.Fragment>
      <p style={labelStyle} className="text-InputComponent">
        {textInput}
      </p>
      <div>
        <input
          type={type}
          style={{
            width: widthInput,
            border: border,
            boxShadow: boxShadow,
            height: height,
            fontSize: fontSize
          }}
          className="input-InputComponent"
          onChange={value => inputReturn!(value.target.value)}
          name={name}
          ref={innerRef}
        />
      </div>
    </React.Fragment>
  );
};
