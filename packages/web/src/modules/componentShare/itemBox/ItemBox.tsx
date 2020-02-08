import classNames from "classnames";
import React from "react";

interface Props {
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  title: string;
  text: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  titleColor?: string;
  textColor?: string;
  fontSizeText?: string;
}

export const ItemBox: React.FC<Props> = ({
  className,
  titleClassName,
  textClassName,
  title,
  text,
  width,
  height,
  padding,
  margin,
  titleColor,
  textColor,
  fontSizeText
}) => {
  return (
    <div
      className={classNames("item-box", className)}
      style={{
        width: width,
        height: height,
        padding: padding,
        margin: margin
      }}
    >
      <p
        style={{ color: titleColor }}
        className={classNames("title", titleClassName)}
      >
        {title}
      </p>
      <p
        style={{ color: textColor, fontSize: fontSizeText }}
        className={classNames("text", textClassName)}
      >
        {text}
      </p>
    </div>
  );
};
