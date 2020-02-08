import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
export const OrganizationAnnouncements: React.FC = () => {
  return (
    <ContainerClient
      withoutHeader={true}
      underConstruction={true}
      colorHeader="blue"
      textHeader="اطلاعیه ها سامانه"
    >
      {/* <div>
        <div className="Search-OrganizationAnnouncements">
          <SearchNotificationsClient />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        <BoxMessage hasAnswer={false} color="blue" />
        <BoxMessage hasImag={kit} hasAnswer={false} color="gray" />
        <BoxMessage hasAnswer={false} color="blue" />
        <BoxMessage hasImag={blood} hasAnswer={false} color="gray" />
      </div> */}
    </ContainerClient>
  );
};
