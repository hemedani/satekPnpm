import React from "react";
import cx from "classnames";
interface Props {}

export const WarperAnimation: React.FC<Props> = ({ children }) => {
  return <div className="warperanimation">{children}</div>;
};
