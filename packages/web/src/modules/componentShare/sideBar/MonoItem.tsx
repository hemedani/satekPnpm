import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  icon?: string;
  title: string;
  path: string;
  location?: string;
}

const MonoItem: React.FC<Props> = ({ title, path, icon, location }) => {
  return (
    <Link to={path} className={classNames("accordion__section")}>
      <button
        className={classNames(
          "accordion",
          location === path ? "hover-mono-item" : ""
        )}
      >
        <div className={icon} />
        <p className="accordion__title">{title}</p>
      </button>
    </Link>
  );
};

export default MonoItem;
