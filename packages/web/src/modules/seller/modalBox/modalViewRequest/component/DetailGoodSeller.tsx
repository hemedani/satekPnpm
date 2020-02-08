import { getOrderForSeller_getOrder } from "@satek/resolvers";
import React from "react";
import { ConvertDateToShamsi } from "../../../../function/ConvertDate";

interface Props {
  data?: getOrderForSeller_getOrder;
}

export const DetailGoodSeller: React.FC<Props> = ({ data }) => {
  return (
    <div className="detailGoodSeller">
      <div className="part-detailGoodSeller part-without-border-detailGoodSeller ">
        <p className="title-detailGoodSeller">تعداد</p>
        <p className="text-detailGoodSeller">{data && data.num}</p>
      </div>
      <div className="part-detailGoodSeller">
        <p className="title-detailGoodSeller">تاریخ انقضا</p>
        <p className="text-detailGoodSeller">
          {data &&
            data.stuff &&
            data.stuff.expiration &&
            ConvertDateToShamsi(data.stuff.expiration.split("T")[0])}
        </p>
      </div>
      <div className="part-detailGoodSeller">
        <p className="title-detailGoodSeller">مهلت تحویل</p>
        <p className="text-detailGoodSeller">
          {data &&
            data.deliveryTime &&
            ConvertDateToShamsi(data.deliveryTime.split("T")[0])}
        </p>
      </div>
      <div className="part-detailGoodSeller">
        <p className="title-detailGoodSeller">مبلغ کل و شرایط پرداخت</p>
        <p className="text-detailGoodSeller small-font-detailGoodSeller">
          تا شش ماه آینده
        </p>
        <p className="text-detailGoodSeller">
          {data && data.stuff && data.stuff.price} تومان
        </p>
      </div>
    </div>
  );
};
