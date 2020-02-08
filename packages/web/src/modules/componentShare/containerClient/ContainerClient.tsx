import { default as classNames, default as cx } from "classnames";
import { History } from "history";
import React from "react";
import Working from "../../../image/main/inWorking.svg";
interface Props {
  children: React.ReactNode;
  textHeader: string;
  violetBorder?: boolean;
  colorHeader: string;
  className?: string;
  withoutHeader?: boolean;
  footer?: React.ReactNode;
  backGround?: boolean;
  history?: History;
  centerLabel?: boolean;
  width?: string;
  underConstruction?: boolean;
  overflowY?: "unset" | "auto";
}
export const ContainerClient: React.FC<Props> = ({
  children,
  textHeader,
  colorHeader,
  className,
  history,
  withoutHeader,
  backGround,
  footer,
  violetBorder,
  centerLabel,
  width,
  underConstruction,
  overflowY
}) => {
  const goBack = () => (history ? history.goBack() : null);

  return (
    <div
      className={classNames(className, "ContainerClient", {
        "violetBorder-ContainerClient": violetBorder
      })}
      style={{ width: width }}
    >
      {!withoutHeader && (
        <div
          className={cx(
            [
              `header-Container-client-${colorHeader}`,
              { "header-center-Container-client": centerLabel }
            ],
            "header-Container-client"
          )}
        >
          <h3 className="text-header-Container-client">{textHeader}</h3>
          {history && (
            <div onClick={goBack} className="comeback-container-client">
              <p className="comeback-text-container-client">بازگشت</p>
              <span className="ic_back_arrow icon-size-container-client"></span>
            </div>
          )}
        </div>
      )}
      <div
        className={classNames("body-Container-client", {
          "body-Container-backGround": backGround
        })}
        style={{ overflowY: overflowY }}
      >
        {underConstruction && (
          <div className="underConstruction-Container-client">
            <img
              src={Working}
              className="img-underConstruction-Container-client"
              alt="NotFound"
            />
            <p className="text-underConstruction-Container-client">
              این صفحه در حال توسعه است و امکان استفاده ار آن در حال حاضر وجود
              ندارد
            </p>
          </div>
        )}
        {children}
      </div>
      {footer && footer}
    </div>
  );
};
