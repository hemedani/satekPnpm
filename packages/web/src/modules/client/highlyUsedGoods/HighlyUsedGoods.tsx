import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
export const HighlyUsedGoods: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="کالاهای پر استفاده من">
      <div className="notification-HighlyUsedGoods">
        <span>!</span>
        <p className="text-notification-HighlyUsedGoods">
          کالا های این لیست 5 کالایی هستند که بیشترین درخواست را برای آنها داده
          اید
        </p>
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} />
        <DetailGoodsClient isHighly={true} /> */}
      </div>
    </ContainerClient>
  );
};
