import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "../loader/Loader";

interface Props {
  onSubmit?(props: any): any;
  onClick?(props: any): any;
  type:
    | "main"
    | "addRequest"
    | "sendReq"
    | "disable"
    | "extra"
    | "okay"
    | "cancel"
    | "yellowBtn"
    | "redCancel"
    | "gray"
    | "accept";
  className?: string;
  text: string;
  width?: string;
  height?: string;
  padding?: string;
  animation?: boolean;
  margin?: string;
  fontSize?: string;
  icon?: string;
  to?: string;
  disabled?: boolean;
  mainType?: "button" | "submit" | "reset" | undefined;
  justifyContent?: string;
  name?: string;
  widthLoader?: string;
  isLoading?: boolean;
  widthLink?: string;
}

export const Button: React.FC<Props> = ({
  type,
  className,
  text,
  width,
  height,
  padding,
  margin,
  fontSize,
  icon,
  onSubmit,
  onClick,
  to,
  disabled,
  mainType,
  justifyContent,
  name,
  animation,
  widthLoader,
  isLoading,
  widthLink
}) => {
  return (
    <React.Fragment>
      {to && !disabled ? (
        isLoading ? (
          <div
            style={{
              width: width,
              height: height,
              padding: padding,
              margin: margin,
              fontSize: fontSize,
              justifyContent: justifyContent
            }}
            className={classNames("btn-" + type, className, {
              "animation-Button": animation
            })}
          >
            <Loader type="Circle" />
          </div>
        ) : (
          <Link to={to} style={{ width: widthLink }} className="btn-link">
            <button
              style={{
                width: width,
                height: height,
                padding: padding,
                margin: margin,
                fontSize: fontSize,
                justifyContent: justifyContent
              }}
              name={name}
              disabled={disabled}
              onSubmit={onSubmit}
              onClick={onClick}
              className={classNames("btn-" + type, className, {
                animation: "animation-Button"
              })}
            >
              {text}
              {icon ? (
                <span style={{ marginRight: ".5rem" }} className={icon}></span>
              ) : null}
            </button>
          </Link>
        )
      ) : isLoading ? (
        <div
          style={{
            width: width,
            height: height,
            padding: padding,
            margin: margin,
            fontSize: fontSize,
            justifyContent: justifyContent
          }}
          className={classNames("btn-" + "main", className)}
        >
          <Loader
            color="white"
            width={widthLoader}
            height="1rem"
            type="Circle"
          />
        </div>
      ) : (
        <button
          type={mainType}
          disabled={disabled}
          style={{
            width: width,
            height: height,
            padding: padding,
            margin: margin,
            fontSize: fontSize,
            justifyContent: justifyContent
          }}
          onSubmit={onSubmit}
          onClick={onClick}
          className={classNames("btn-" + type, className, {
            "animation-Button": animation
          })}
        >
          {text}
          {icon ? (
            <span style={{ marginRight: ".5rem" }} className={icon}></span>
          ) : null}
        </button>
      )}
    </React.Fragment>
  );
};
