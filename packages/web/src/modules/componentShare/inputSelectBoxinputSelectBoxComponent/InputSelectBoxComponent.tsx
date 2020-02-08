import React from "react";
interface Props {
  textInput: string;
  widthSelect?: string;
  justifyContent?: string;
}

export const InputSelectBoxComponent: React.FC<Props> = props => {
  return (
    <React.Fragment>
      <p className="text-InputSelectBoxComponent">{props.textInput}</p>
      <select
        style={{
          width: props.widthSelect
        }}
        name="ed"
        className="input-InputSelectBoxComponent"
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </React.Fragment>
  );
};
