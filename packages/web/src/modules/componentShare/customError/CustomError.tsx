import classNames from "classnames";
import React, { CSSProperties } from "react";
import { Button } from "../button/Button";

interface Props {
  icon?: string;
  btnEnable?: boolean;
  btnText?: string;
  style?: CSSProperties;
  errMsg: string;
}

export const CustomError: React.FC<Props> = ({
  errMsg,
  icon,
  btnEnable,
  btnText,
  style
}) => {
  return (
    <div className="error-cnt" style={style}>
      <div className="row">
        <div className={icon ? classNames(icon, "icon") : "icon ic_warning"} />
        <div className="text">{errMsg ? errMsg : "مشکل در دریافت اطلاعات"}</div>
      </div>
      {btnEnable ? (
        <Button type="yellowBtn" text={btnText ? btnText : "تلاش مجدد"} />
      ) : null}
    </div>
  );
};
