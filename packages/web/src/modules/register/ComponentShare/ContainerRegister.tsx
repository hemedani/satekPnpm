import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  btnName: string;
  textLink?: string;
  btn: boolean;
}
export const ContainerRegister: React.FC<Props> = props => (
  <div className="containerRegisterStore">
    <div className="headerBoxRegisterStoreContainer">
      <h3 className="headerNameContainer">{props.title}</h3>
    </div>
    <div className="bodyBoxRegisterStoreContainer">{props.children}</div>
  </div>
);
