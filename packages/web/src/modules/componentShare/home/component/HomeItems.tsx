import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SubHomeItem } from "./SubHomeItem";
import { dataHome, dataHomeSubRequest } from "../home";
import { GetCategoryUnitsForHospital_getCategory_units } from "@satek/resolvers";
import { useCategoryUnitsForHospitalQuery } from "@satek/hooks";
import { CustomError } from "../../customError/CustomError";
import { Loader } from "../../loader/Loader";
import { client } from "../../../../Apollo";

interface Props {
  data: dataHome[];
  path?: string;
  nameUser?: string;
  storeSubdue?: number;
}
export const HomeItems: React.FC<Props> = ({
  nameUser,
  path,
  data,
  storeSubdue
}) => {
  const [active, setActive] = useState<number>(-1);
  const [normal, setNormal] = useState<boolean>(true);
  const [numberId, setNumberId] = useState<string>("");

  const ParseDataUnitHospital: React.FC<{
    data: GetCategoryUnitsForHospital_getCategory_units[];
  }> = ({ data }) => {
    let subRequest: dataHomeSubRequest[] = [];
    if (path) {
      if (path.includes("hospital")) {
        console.log(data, "datasasd");
        data.map(unit => {
          subRequest.push({
            name: unit.name,
            numRequest: unit.orderStatistic
              ? unit.orderStatistic.pendingInOrgHeadNumber!
              : 0,
            path: path + "/viewrequest/" + unit.id,

            subName: "درخواست"
          });
        });
      }
    }

    return (
      <>
        <SubHomeItem data={subRequest} />
      </>
    );
  };

  const hospitalUnit = useCategoryUnitsForHospitalQuery(
    { error: CustomError, loading: Loader, parsing: ParseDataUnitHospital },
    {
      id: numberId ? numberId : ""
    },
    client
  );

  return (
    <div className="homeItems-home">
      {/* <div className="detail-items-homeItems-home"> */}
      {nameUser && (
        <div className="header-items-homeItems">
          <p className="name-manger-header-homeItems">مدیر محترم {nameUser}</p>
          <h3 className="text-header-homeItems">
            به سامانه الکترونیک تهیه کالا (ساتک) خوش آمدید
          </h3>
        </div>
      )}
      <div className="body-items-homeItems">
        <div className="top-body-items-homeItems">
          {data.map((item, index) => {
            if (item.isImportant || item.isRequest) {
              return item.path ? (
                <Link
                  to={item.path}
                  key={index}
                  onBlur={() => {
                    if (!item.isImportant) {
                      setActive(-1);
                      setNormal(true);
                      setNumberId("");
                    }
                  }}
                  tabIndex={1}
                  onClick={() => {
                    if (!item.isImportant) {
                      setNormal(false);
                      setActive(index);
                      setNumberId(item.id ? item.id : "");
                    }
                  }}
                  className={classNames(
                    "item-box-homeItems",
                    {
                      "item-color-blue-box-homeItems":
                        item.isRequest && !item.isImportant
                    },
                    { "item-color-red-box-homeItems": item.isImportant },
                    { "i-blur": !normal && active !== index }
                  )}
                >
                  <div className="top-item-box-homeItems">
                    <span
                      className={`${item.icon} icon-header-item-box-homeItem`}
                    ></span>
                    <p className="name-item-box-homeItems">{item.name}</p>
                  </div>

                  {item.numRequest && item.numRequest !== 0 ? (
                    <p className="number-request-item-box-homeItems">
                      {item.numRequest} {item.subName}
                    </p>
                  ) : (
                    <p className="number-request-item-box-homeItems">
                      درخواستی ندارید
                    </p>
                  )}
                </Link>
              ) : (
                <div
                  onBlur={() => {
                    if (!item.isImportant) {
                      setTimeout(() => {
                        setActive(-1);
                        setNormal(true);
                        setNumberId("");
                      }, 200);
                    }
                  }}
                  key={index}
                >
                  <div
                    tabIndex={1}
                    onClick={() => {
                      if (!item.isImportant) {
                        setNormal(false);
                        setActive(index);
                        setNumberId(item.id ? item.id : "");
                      }
                    }}
                    className={classNames(
                      "item-box-homeItems",
                      {
                        "item-color-blue-box-homeItems":
                          item.isRequest && !item.isImportant
                      },
                      { "item-color-red-box-homeItems": item.isImportant },
                      { "i-blur": !normal && active !== index }
                    )}
                  >
                    <div className="top-item-box-homeItems">
                      <p className="name-item-box-homeItems">{item.name}</p>
                    </div>

                    {item.numRequest !== 0 ? (
                      <p className="number-request-item-box-homeItems">
                        {item.numRequest} {item.subName}
                      </p>
                    ) : (
                      <p className="number-request-item-box-homeItems">
                        درخواستی ندارید
                      </p>
                    )}
                  </div>
                  <>
                    {item.isRequest &&
                      !item.isImportant &&
                      active === index &&
                      item.id &&
                      (path && path.includes("hospital") ? (
                        hospitalUnit.Response
                      ) : (
                        <SubHomeItem data={item.subRequest!} />
                      ))}
                  </>
                </div>
              );
            }
          })}
        </div>
        {}
        <div className="bottom-body-items-homeItems">
          {data.map((item, index) => {
            if (!item.isRequest) {
              return (
                <Link
                  to={item.path!}
                  key={index}
                  className={classNames(
                    "item-box-homeItems",
                    "item-color-green-box-homeItems",
                    {
                      "i-blur": !normal && active !== index,
                      "item-margin-green-box-homeItems":
                        !normal && active !== index
                    }
                  )}
                >
                  <div className="top-item-box-homeItems">
                    <span
                      className={`${item.icon} icon-header-item-box-homeItem`}
                    ></span>
                    <p className="name-item-box-homeItems name-bottom-item-box-homeItems">
                      {item.name}
                    </p>
                  </div>
                  {item.numRequest !== 0 ? (
                    <p className="number-green-request-item-box-homeItems">
                      {item.numRequest} {item.subName}
                    </p>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            }
          })}
        </div>
      </div>
      {/* </div> */}
      {storeSubdue && (
        <div className="box-number-store-subdue-seller">
          <p className="number-store-subdue-seller">
            تعداد فروشندگان مشمول تلیق ناشی از عدم انجام تعدات در کشور
          </p>
          <p className="number-store-subdue-seller">{storeSubdue}</p>
        </div>
      )}
    </div>
  );
};
