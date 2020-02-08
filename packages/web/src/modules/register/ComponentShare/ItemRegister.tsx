import * as React from "react";

interface Props {
  children: React.ReactNode;
  nameField: string;
}
export const ItemRegister: React.FC<Props> = props => (
  <div className="itemRegister">{props.children}</div>
);
