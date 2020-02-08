import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { ProductRequestHistory } from "../../componentShare/searchProductRequestHistory/SearchProductRequestHistory";
export const HistoryRequest: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تاریخچه درخواست های شما">
      <div className="top-HistoryRequest">
        <div className="Search-HistoryRequest">
          <ProductRequestHistory type="admin" searchWithCode={true} />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <SituationGoodsClient
          colorButton="blue"
          lastSituation="sended"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        />
        <SituationGoodsClient
          lastSituation="preparing"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        />
        <SituationGoodsClient
          lastSituation="preparing"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        />
        <SituationGoodsClient
          lastSituation="preparing"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        />
        <SituationGoodsClient
          lastSituation="preparing"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="پیگیری درخواست"
        /> */}
      </div>
    </ContainerClient>
  );
};
