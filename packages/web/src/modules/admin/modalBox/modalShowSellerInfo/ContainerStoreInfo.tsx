import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";

interface Props {
  store?: string;
  Address?: string;
  postalCode?: string;
  email?: string;
  address?: string;
  phone?: string;
  economicCode?: string;
  province?: string;
  city?: string;
}

export const ContainerStoreInfo = (props: Props) => {
  return (
    <Container margin="0 3rem" title="اطلاعات فروشگاه" padding="1rem 0">
      <div className="cnt-item-box-triple">
        <ItemBox title="نام فروشگاه" text="شرکت تجهیزات پزشکی طب پردازان غرب" />
        <ItemBox title="کد اقتصادی" text="۹۶۳۵۴۸۹۲۸۳۵۹۷۶۵۰" />
        <ItemBox title="استان / شهرستان" text="سیستان و بلوچستان - نیک شهر" />
      </div>
      <div className="cnt-item-box-triple">
        <ItemBox title="ایمیل" text="tebpardazangharb@satek.ir" />
        <ItemBox title="تلفن ثابت" text="۰۲۱-۲۲۴۷۶۵۸۳" />
        <ItemBox title="کد پستی" text="۸۷۳۲۴۷۵۸۴۹" />
      </div>
      <div className="cnt-item-box-odd">
        <ItemBox
          title="آدرس"
          text="سیستان بلوچستان - نیکشهر - میدان اول - واحد ۴"
        />
      </div>
    </Container>
  );
};
