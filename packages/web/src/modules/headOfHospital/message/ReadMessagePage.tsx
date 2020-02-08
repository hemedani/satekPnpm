import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const ReadMessagesPage: React.FC = () => {
  return (
    <ContainerClient
      withoutHeader={true}
      underConstruction={true}
      colorHeader="blue"
      textHeader="تاریخچه پیام ها"
    >
      {/* <div>
        <div className="Search-RequestableGoods">
          <SearchReadMessages />
        </div>
        <LineSeparator />
      </div>

      <div className="detailGoodsClient-DeliveryGoods">
        <BoxMessage hasAnswer={true} color="yellow" />
        <BoxMessage answer={true} hasAnswer={true} color="violet" />
      </div> */}
    </ContainerClient>
  );
};
