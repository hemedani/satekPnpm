import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";

interface Props {
  name?: string;
  familyName?: string;
  nationalCode?: string;
  gender?: string;
  birthDay?: string;
  mobile?: string;
  Address?: string;
  postalCode?: string;
  birthPlace?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export const ContainerStoreBossInfo = (props: Props) => {
  return (
    <Container margin="0 3rem" title="اطلاعات مدیر فروشگاه" padding="2rem 0">
      <div className="cnt-item-box-quad">
        <ItemBox title="نام و نام خانوادگی" text="دکتر سید علیرضا چشم بلبلی" />
        <ItemBox title="کد ملی" text="۰۰۲۴۷۶۹۴۶۳" />
        <ItemBox title="جنسیت" text="مرد" />
        <ItemBox title="تاریخ تولید" text="۱۲/۵/۱۳۳۷" />
      </div>
      <div className="cnt-item-box-quad">
        <ItemBox title="تلفن همراه" text="۰۹۱۸۷۲۶۳۴۵۶" />
        <ItemBox title="محل تولد" text="همدان" />
        <ItemBox title="ایمیل" text="tebpardazangharb@satek.ir" />
        <ItemBox title="کد پستی" text="۸۷۳۲۴۷۵۸۴۹" />
      </div>
      <div className="cnt-item-box-twice">
        <ItemBox
          width="calc(100% - 30%)"
          title="آدرس"
          text="سیستان بلوچستان - نیکشهر - میدان اول - واحد ۴"
        />
        <ItemBox width="23%" title="تلفن ثابت" text="۰۲۱-۲۲۴۷۶۵۸۳" />
      </div>
    </Container>
  );
};
