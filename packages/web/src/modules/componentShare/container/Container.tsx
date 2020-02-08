import classNames from "classnames";
import React, { CSSProperties } from "react";

interface Props {
  className?: string;
  classNameChild?: string;
  title?: string;
  titleColor?: string;
  width?: string;
  height?: string;
  dire?: "ltr" | "rtl";
  padding?: string;
  margin?: string;
  fontSize?: string;
  children: React.ReactNode;
  flex?: string;
  childStyle?: CSSProperties;
  isBordered?: "true" | "false";
}

export const Container: React.FC<Props> = ({
  className,
  title,
  dire,
  titleColor,
  width,
  height,
  padding,
  margin,
  fontSize,
  children,
  flex,
  childStyle,
  isBordered,
  classNameChild
}) => {
  return (
    <div
      className={classNames("container-cnt", className)}
      style={{
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        flex: flex,
        direction: dire
      }}
    >
      {title ? (
        <p
          className="container-title"
          style={{
            fontSize: fontSize,
            color: titleColor
          }}
        >
          {title}
        </p>
      ) : null}
      <div
        className={classNames("container-children", isBordered, classNameChild)}
        style={childStyle}
      >
        {children}
      </div>
    </div>
  );
};
