import {
  getOrders_getOrders_items_requestorUser,
  getOrders_getOrders_items_ware
} from "@satek/resolvers";
import cx from "classnames";
import React from "react";
import { Container } from "../container/Container";

interface Props {
  historyCost?: boolean;
  wareDetails?: getOrders_getOrders_items_ware;
  requestor?: getOrders_getOrders_items_requestorUser;
  historySubmit?: string | null;
  price?: number;
  nameWare?: string;
  nameRequestor?: string;
  priceFinal?: number;
  storeName?: string | null;
  confirmPayment?: boolean;
}
export const DetailGoodsAndApplicant: React.FC<Props> = ({
  historyCost,
  wareDetails,
  requestor,
  price,
  nameWare,
  historySubmit,
  nameRequestor,
  priceFinal,
  confirmPayment,
  storeName
}) => {
  return (
    <Container>
      <div className="detailGoodsAndApplicant-depManger">
        <div
          className={
            historyCost
              ? "rowFirst-detailGoodsAndApplicant-depManger"
              : "row-detailGoodsAndApplicant-depManger"
          }
        >
          <div className="field-part-detailGoodsAndApplicant-depManger">
            <p className={cx("title-admin", "title-detailGoodsAndApplicant")}>
              نام کالا
            </p>
            <div>
              <p className={cx("name-admin", "name-detailGoodsAndApplicant")}>
                {wareDetails ? wareDetails.name : nameWare && nameWare}
              </p>
              <div className="iconBox-detailGoodsAndApplicant-depManger">
                {/* <span className="ic_external"></span>
                <p className="title-IMED-detailGoodsAndApplicant-depManger">
                  مشاهده توضیحات فنی کالا در وبسایت IMED
                </p> */}
              </div>
            </div>
          </div>
          <div className="field-part-detailGoodsAndApplicant-depManger left-detailGoodsAndApplicant-depManger">
            <p className={cx("title-admin", "title-detailGoodsAndApplicant")}>
              درخواست کننده
            </p>
            <p className={cx("name-admin", "name-detailGoodsAndApplicant")}>
              {requestor
                ? requestor.name + " " + requestor.lastName
                : nameRequestor && nameRequestor}
            </p>
          </div>
        </div>
        {historyCost && (
          <div className="rowSecond-detailGoodsAndApplicant-depManger">
            <div className="field-part-detailGoodsAndApplicant-depManger">
              <p className={cx("title-admin", "title-detailGoodsAndApplicant")}>
                {confirmPayment ? "فروشگاه" : "تاریخ ثبت درخواست"}
              </p>
              <div>
                <p className={cx("name-admin", "name-detailGoodsAndApplicant")}>
                  {confirmPayment
                    ? storeName && storeName
                    : historySubmit && historySubmit}
                </p>
              </div>
            </div>
            <div
              className={cx({
                "field-down-part-detailGoodsAndApplicant-depManger": confirmPayment,
                "field-down-second-part-detailGoodsAndApplicant-depManger": !confirmPayment
              })}
            >
              <div className="field-part-detailGoodsAndApplicant-depManger">
                <p
                  className={cx("title-admin", "title-detailGoodsAndApplicant")}
                >
                  قیمت فی کالا با ارزش افزوده
                </p>
                <div>
                  <p
                    className={cx("name-admin", "name-detailGoodsAndApplicant")}
                  >
                    {price &&
                      price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    ریال
                  </p>
                </div>
              </div>
              <div
                className={cx("field-part-detailGoodsAndApplicant-depManger")}
              >
                <p
                  className={cx("title-admin", "title-detailGoodsAndApplicant")}
                >
                  قیمت نهایی کالا با ارزش افزوده:
                </p>
                <p className={cx("name-admin", "name-detailGoodsAndApplicant")}>
                  {priceFinal &&
                    priceFinal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  ریال
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
