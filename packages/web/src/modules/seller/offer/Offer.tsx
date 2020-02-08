import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { SearchOffer } from "./component/SearchOffer";

export const Offer: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تخفیف">
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          <SearchOffer
            button={{ text: "تعریف کالا", to: "/seller/addoffer" }}
          />
        </div>
      </div>
      <div className="detailGoodsClient-DeliveryGoods"></div>
    </ContainerClient>
  );
};
