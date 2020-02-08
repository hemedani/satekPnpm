import { FieldProps } from "formik";
import React from "react";

interface Props {
  children?: React.ReactNode | ((props: FieldProps) => React.ReactNode);
  nameField: string;
}

export const ItemRegisterLeft: React.FC<Props> = props => {
  return (
    <div className="partLeftRegisterStoreOrgan">
      <p className="textRegisterLeft">{props.nameField}</p>

      <div className="inputBoxRegisterStoreOrgan">{props.children}</div>
    </div>
  );
};
