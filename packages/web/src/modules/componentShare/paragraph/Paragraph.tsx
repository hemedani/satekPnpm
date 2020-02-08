import classNames from "classnames";
import React, { CSSProperties } from "react";

interface Props {
  className?: string;
  text: string | null;
  width?: string;
  color?: string;
  height?: string;
  dire?: "ltr" | "rtl";
  padding?: string;
  margin?: string;
  children?: React.ReactNode;
  fontSize?: string;
  fontFamily?: string;
  childStyle?: CSSProperties;
  style?: CSSProperties;
  icon?: string;
  marginIcon?: string;
}

export const Paragraph: React.FC<Props> = ({
  className,
  dire,
  text,
  style,
  children,
  width,
  height,
  padding,
  color,
  margin,
  marginIcon,
  fontSize,
  fontFamily,
  icon
}) => {
  return (
    <p
      className={classNames(className)}
      style={{
        ...style,
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        fontSize: fontSize,
        fontFamily: fontFamily || "IRANSANS_MEDIUM",
        direction: dire,
        color: color
      }}
    >
      {icon ? (
        <span style={{ margin: marginIcon }} className={icon}></span>
      ) : null}
      {text} {children}
    </p>
  );
};
