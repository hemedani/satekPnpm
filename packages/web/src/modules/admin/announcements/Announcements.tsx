import React from "react";
import { BoxMessage } from "../../client/componentShare/boxMessage/BoxMessage";
import { SearchAnnouncements } from "../../componentShare/announcements/SearchAnnouncements";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
export const Announcements: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="اطلاعیه ها سامانه">
      <div className="top-Announcements">
        <div className="Search-Announcements">
          <SearchAnnouncements />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        <BoxMessage sendBy="علی فرهادی" color="blue" hasAnswer={false} />
        <BoxMessage sendBy="علی فرهادی" color="blue" hasAnswer={false} />
        <BoxMessage color="gray" hasImag="" hasAnswer={false} />
        <BoxMessage color="gray" hasAnswer={false} />
      </div>
    </ContainerClient>
  );
};
