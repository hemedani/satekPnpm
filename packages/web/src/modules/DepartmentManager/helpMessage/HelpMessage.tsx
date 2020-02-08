import classNames from "classnames";
import React from "react";
import { Button } from "../../componentShare/button/Button";

interface Props {
  size: "medium" | "small" | "large";
  showBtn?: boolean;
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  flex?: string;
}

export const HelpMessage: React.FC<Props> = ({
  size,
  showBtn,
  icon,
  title,
  description,
  buttonText,
  width,
  height,
  padding,
  margin,
  flex
}) => {
  return (
    <div
      className={classNames("help-message-cnt", size)}
      style={{
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        flex: flex
      }}
    >
      <div className={icon ? icon : "ic_info_circle"}></div>
      <div className="title">
        {title ? title : "نیاز به نتایج بیشتری دارید؟"}
      </div>
      <div className="description">
        {description
          ? description
          : " درصورتی که نیاز به دیدن قیمت و فروشندگان از سایر شهر‌ها و استان‌ها را دارید، این گزینه را انتخاب کنید."}
      </div>
      {showBtn === false ? null : (
        <Button
          className="btn"
          type="extra"
          text={buttonText ? buttonText : "گسترش دایره مکانی جست و جو"}
        />
      )}
    </div>
  );
};
