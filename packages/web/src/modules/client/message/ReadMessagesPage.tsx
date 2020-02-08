import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const ReadMessagesPage: React.FC = () => {
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="تاریخچه پیام ها"
      withoutHeader={true}
      underConstruction={true}
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
        <BoxMessage hasAnswer={true} color="yellow" />
        <BoxMessage hasAnswer={true} color="yellow" />
        <BoxMessage answer={true} hasAnswer={true} color="violet" />
      </div> */}
    </ContainerClient>
  );
};
