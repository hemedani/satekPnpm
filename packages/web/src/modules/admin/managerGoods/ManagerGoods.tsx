import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { ProductRequestHistory } from "../../componentShare/searchProductRequestHistory/SearchProductRequestHistory";

export const ManagerGoods: React.FC = () => {
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="مدیریت کاربران>تاریخچه درخواست کاربر"
    >
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          <ProductRequestHistory type="admin" searchWithCode={false} />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <SituationGoodsClient
          typeButton="Tracking"
          lastSituation="preparing"
          buttonName="جزییات"
          colorButton="blue"
        />
        <SituationGoodsClient
          typeButton="Tracking"
          lastSituation="preparing"
          buttonName="جزییات"
          colorButton="blue"
        />
        <SituationGoodsClient
          typeButton="Tracking"
          lastSituation="preparing"
          buttonName="جزییات"
          colorButton="blue"
        />
        <SituationGoodsClient
          typeButton="Tracking"
          lastSituation="preparing"
          buttonName="جزییات"
          colorButton="blue"
        />
        <SituationGoodsClient
          typeButton="Tracking"
          lastSituation="preparing"
          buttonName="جزییات"
          colorButton="blue"
        /> */}
      </div>
    </ContainerClient>
  );
};
