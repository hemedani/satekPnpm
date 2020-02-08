import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";

export const SellerInformationPayment = () => {
  return (
    <Container title="اطلاعات فروشنده و پرداخت">
      <div className="sellerInformationPayment-headHospital">
        <div className="row-sellerInformationPayment-headHospital">
          <div className="part-sellerInformationPayment-headHospital">
            <ItemBox
              margin="0.8rem 0 0 0"
              title="فروشگاه"
              text="شرکت تجهیزات پزشکی طب پردازان غرب(سهامیپخاص)"
            />
          </div>
          <div className="part-sellerInformationPayment-headHospital">
            <ItemBox
              margin="0.8rem 0 0 0"
              title="صاحب حساب"
              text="دکتر سید علیرضا محسنی نژاد اصل"
            />
          </div>
        </div>
        <div className="row-sellerInformationPayment-headHospital">
          <ItemBox
            margin="1.9rem 0 0.5rem 0"
            title="تاریخ پرداخت"
            text="1398/5/2"
          />
          <ItemBox
            margin="1.9rem 0 0.5rem 0"
            title="تخفیف"
            text="3000000ریال"
          />
          <ItemBox
            margin="1.9rem 0 0.5rem 0"
            title="تخفیف برای پرداخت امروز"
            text="45572855ریال"
          />
          <ItemBox
            margin="1.9rem 0 0.5rem 0"
            title="قیمت نهایی کالا با ارزش افزوده"
            text="212313213ریال"
          />
        </div>
      </div>
    </Container>
  );
};
