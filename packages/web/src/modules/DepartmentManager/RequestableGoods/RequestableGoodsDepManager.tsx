import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { SearchGoodsClient } from "../../componentShare/RequestableGoods/SearchGoodsClient";
export const RequestableGoodsDepManager: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="کالا های قابل درخواست">
      <div className="top-RequestableGoods">
        <div className="notification-RequestableGoods">
          <span>!</span>
          <p className="text-notification-RequestableGoods">
            کالاهای مجاز برای درخواست توسط مدیریت انتخاب شده است در صورتی که
            کالای مورد نظر در این لیست وجود ندارد لطفا فرم افزودن کالا را تکمیل
            نمایید.
          </p>
          <button className="buttonAddGoods-RequestableGoods">
            فرم افزودن کالا به لیست مجاز
          </button>
        </div>
        <div className="Search-RequestableGoods">
          <SearchGoodsClient vertical={false} />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <DetailGoodsClient isHighly={false} />
        <DetailGoodsClient isHighly={false} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={false} />
        <DetailGoodsClient isHighly={false} />
        <DetailGoodsClient isHighly={false} /> */}
      </div>
    </ContainerClient>
  );
};
