import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
export const AnnouncementsHeadHospital: React.FC = () => {
  return (
    <ContainerClient
      withoutHeader={true}
      underConstruction={true}
      colorHeader="blue"
      textHeader="اطلاعیه ها سامانه"
    >
      {/* <div className="top-Announcements">
        <div className="Search-Announcements">
          <SearchAnnouncements />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        <BoxMessage sendBy="علی فرهادی" color="blue" hasAnswer={false} />
        <BoxMessage color="gray" hasImag={Kit} hasAnswer={false} />
        <BoxMessage sendBy="علی فرهادی" color="blue" hasAnswer={false} />
        <BoxMessage color="gray" hasImag={Kit} hasAnswer={false} />
      </div> */}
    </ContainerClient>
  );
};
