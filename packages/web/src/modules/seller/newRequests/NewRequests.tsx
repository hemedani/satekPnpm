import { getStoreOrders_getStore } from "@satek/resolvers";
import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";

export const NewRequests = () => {
  const ParseOrders: React.FC<{
    data: getStoreOrders_getStore;
  }> = ({ data }) => {
    // console.log(data, "<====this is data here");
    if (data.orders) {
      return (
        <React.Fragment>
          {data.orders.map(order => (
            <>
              {/* <SituationGoodsClient
               lastSituation="checking detector"
               colorButton="blue"
               typeButton="Tracking"
               buttonName="جزییات درخواست"
               data={order}
               key={order.id}
               detail={[
                 "طب پردازان غرب(09183152645)",
                 "امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"
               ]}
             /> */}
            </>
          ))}
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <ContainerClient colorHeader="blue" textHeader="درخواست‌های جدید">
      <div className="search-myProductList-seller">
        {/* <SearchNewRequest /> */}
      </div>
      <LineSeparator />
      <div className="detailGoodsClient-DeliveryGoods">
        {ParseOrders}
        {/* <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        /> */}
      </div>
    </ContainerClient>
  );
};
