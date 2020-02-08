import classNames from "classnames";
import React, { CSSProperties } from "react";

interface Iprops {
  items?: Array<React.ReactNode>;
  className?: CSSProperties;
}

export const Footer: React.FC<Iprops> = ({ items, className }) => {
  return (
    <div className={classNames("footer-container", className)}>{items}</div>
  );
};
