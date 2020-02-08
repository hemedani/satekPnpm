import React, { CSSProperties } from "react";

interface Props {
  select: number;
  change: (values: number) => void;
  nameFields: string[];
  label?: string;
  labelStyle?: CSSProperties;
  style?: CSSProperties;
  textFiledStyle?: CSSProperties;
  styleBox?: CSSProperties;
}
export const SelectBoxRegister: React.FC<Props> = props => (
  <div style={props.style}>
    {props.label && (
      <p className="lable-selectBoxRegister default" style={props.labelStyle}>
        {props.label}
      </p>
    )}
    <div style={props.styleBox} className="selectTypeAct">
      {props.nameFields.map((textName: string, index: number) => {
        return (
          <div
            key={index}
            onClick={() => props.change(index)}
            className={
              props.select === index
                ? "selectOn"
                : props.select < index
                ? "frontSelectOff"
                : "backSelectOff"
            }
          >
            <p style={props.textFiledStyle} className="textSelectBoxRegister">
              {textName}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);
