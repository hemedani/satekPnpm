import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { SearchInformationVendor } from "./component/SearchInformationVendor";

export const EditingInformationVendor: React.FC = () => {
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="ویرایش اطلاعات و مشاهده مدارک فروشندگان"
    >
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          <SearchInformationVendor />
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
