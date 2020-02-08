import cx from "classnames";
import React from "react";
import { Close } from "../shape/Cloes";
import { Tick } from "../shape/Tick";

interface Props {
  level: number;
  reject: boolean;
  Items: FiledLevelRequest[];
}
export interface FiledLevelRequest {
  accept: string;
  reject?: string;
}
export const LevelRequest: React.FC<Props> = ({ level = 0, Items, reject }) => {
  return (
    <div className="levelRequest">
      {Items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="boxItem-levelRequest">
              <div className="up-boxItem-levelRequest">
                <div
                  className={cx(
                    "circle-levelRequest",
                    {
                      "color-blue-levelRequest": level + 1 > index
                    },
                    {
                      "color-gray-levelRequest":
                        reject && level != index && level + 1 <= index
                    },
                    {
                      "color-gray-levelRequest":
                        !reject && level != index && level + 1 <= index
                    },
                    {
                      "color-red-levelRequest": reject && level == index
                    }
                  )}
                >
                  {level + 1 > index &&
                    (reject && level == index ? (
                      // <span className="ic_delete tickIcon"></span>
                      <Close color="red"/>
                    ) : (
                      <Tick />
                    ))}
                </div>
                {index !== 0 && (
                  <div
                    className={cx(
                      "line-right-levelRequest",
                      {
                        "color-blue-levelRequest": level + 1 > index
                      },
                      {
                        "color-gray-levelRequest": level + 1 <= index
                      }
                    )}
                  ></div>
                )}
                {index !== Items.length - 1 && (
                  <div
                    className={cx(
                      "line-left-levelRequest",
                      {
                        "color-blue-levelRequest": level > index
                      },
                      {
                        "color-gray-levelRequest": level <= index
                      }
                    )}
                  ></div>
                )}
              </div>
              <div className="down-boxItem-levelRequest">
                <p
                  className={cx(
                    "title-boxItem-levelRequest",
                    {
                      "text-blue-levelRequest":
                        reject && level != index && level + 1 > index
                    },
                    {
                      "text-red-levelRequest":
                        reject && level == index && level + 1 > index
                    },
                    {
                      "text-gray-levelRequest": level + 1 <= index
                    }
                  )}
                >
                  {reject
                    ? index === level
                      ? item.reject
                      : item.accept
                    : item.accept}
                </p>
              </div>
            </div>
            {index !== Items.length - 1 && (
              <div className="lineBox-levelRequest">
                <div className="up-boxItem-levelRequest">
                  <div
                    className={cx(
                      "line-levelRequest",
                      {
                        "color-blue-levelRequest": level + 1 > index
                      },
                      {
                        "color-gray-levelRequest": level <= index
                      }
                    )}
                  ></div>
                </div>
                <div className="down-boxItem-levelRequest">
                  <p className="title-boxItem-levelRequest"></p>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
