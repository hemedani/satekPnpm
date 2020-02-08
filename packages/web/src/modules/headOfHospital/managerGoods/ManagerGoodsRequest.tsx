import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { SearchGoodsClient } from "../../componentShare/RequestableGoods/SearchGoodsClient";

export const ManagerGoodsRequest: React.FC = () => {
  return (
    <React.Fragment>
      <div className="top-managerGoodsRequest-headHospital">
        <ContainerClient
          colorHeader="blue"
          textHeader="جستجو در بین تمامی کالا ها"
        >
          <SearchGoodsClient vertical={true} />
        </ContainerClient>
      </div>
      <div className="down-managerGoodsRequest">
        <ContainerClient
          colorHeader="blue"
          textHeader="درخواست های افزودن کالا به لیست مجاز کاربران"
        >
          <div className="detailGoodsClient-DeliveryGoods"></div>
        </ContainerClient>
      </div>
    </React.Fragment>
  );
};
