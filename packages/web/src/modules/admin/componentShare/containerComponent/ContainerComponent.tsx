import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}
export const ContainerComponent: React.FC<Props> = props => {
  return (
    <div className="containerComponent-admin">
      {props.title !== undefined && (
        <p className="headTitle-containerComponent-admin">{props.title}</p>
      )}
      <div className="container-containerComponent-admin">{props.children}</div>
    </div>
  );
};
