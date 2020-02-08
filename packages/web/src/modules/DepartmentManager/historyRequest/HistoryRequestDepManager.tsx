import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { ProductRequestHistory } from "../../componentShare/searchProductRequestHistory/SearchProductRequestHistory";
export const HistoryRequestDepManager: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تاریخچه درخواست ها">
      <div className="top-HistoryRequest">
        <div className="Search-HistoryRequest">
          <ProductRequestHistory type="admin" searchWithCode={false} />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <SituationGoodsClient
          lastSituation="checking detector"
          typeButton="Tracking"
          colorButton="blue"
          buttonName="جزییات درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          typeButton="Tracking"
          colorButton="blue"
          buttonName="جزییات درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          typeButton="Tracking"
          colorButton="blue"
          buttonName="جزییات درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          typeButton="Tracking"
          colorButton="blue"
          buttonName="جزییات درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        /> */}
      </div>
    </ContainerClient>
  );
};
