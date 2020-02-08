import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  title: string;
  path: string;
  icon?: string;
  location?: string;
}

const SideBarMenuItem: React.FC<Props> = ({ title, path, icon, location }) => {
  return (
    <Link
      to={path}
      className={classNames(
        "side-bar-menu-item",
        location === path ? "hover-accordion-item" : ""
      )}
    >
      <span
        className={icon ? classNames(icon, "icon") : "icon ic_circle"}
      ></span>
      <span className="title">{title}</span>
    </Link>
  );
};

export default SideBarMenuItem;
