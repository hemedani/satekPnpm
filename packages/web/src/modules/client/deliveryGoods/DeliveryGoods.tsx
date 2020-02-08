import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { ProductRequestHistory } from "../../componentShare/searchProductRequestHistory/SearchProductRequestHistory";

interface Props {
  children: React.ReactNode;
}
export const DeliveryGoods: React.FC<Props> = props => {
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="درخواست های در حال آماده سازی یا ارسال"
    >
      <div className="top-DeliveryGoods">
        <div className="Search-DeliveryGoods">
          <ProductRequestHistory type="client" searchWithCode={false} />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <SituationGoodsClient
          lastSituation="sended"
          typeButton="Deliver"
          colorButton="green"
          buttonName="تحویل گرفتن کالا"
        />
        <SituationGoodsClient
          colorButton="green"
          lastSituation="sended"
          typeButton="Deliver"
          buttonName="تحویل گرفتن کالا"
        />
        <SituationGoodsClient
          lastSituation="sended"
          colorButton="green"
          typeButton="Deliver"
          buttonName="تحویل گرفتن کالا"
        />
        <SituationGoodsClient
          lastSituation="sended"
          colorButton="green"
          typeButton="Deliver"
          buttonName="تحویل گرفتن کالا"
        /> */}
      </div>
    </ContainerClient>
  );
};
