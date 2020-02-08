import classNames from "classnames";
import * as React from "react";

interface IProps {
  text?: string;
  color?: "gray" | "black";
  foundItem?: string;
}

export const LineSeparator = ({
  text = " نتیجه جستجو در سامانه پیدا شد",
  color = "black",
  foundItem = ""
}: IProps) => (
  <div className="lineSeparator-client">
    <p className="text-lineSeparator-client">{foundItem + " " + text}</p>
    <div className={classNames("line-lineSeparator-client", `${color}`)}></div>
  </div>
);
