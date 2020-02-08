import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";
import { Button } from "../../../componentShare/button/Button";

interface Props {
  companyName: string;
  headName: string;
  city: string;
  date: string;
}

export const RegistrationRequest: React.FC<Props> = ({
  companyName,
  headName,
  city,
  date
}) => {
  return (
    <Container>
      <div className="registration-request-cnt">
        <div className="cnt-box-one">
          <ItemBox
            className="item-box"
            text={companyName}
            title="نام فروشنده"
          />
          <ItemBox
            className="item-box"
            text={headName}
            title="مدیر / مدیر عامل"
          />
        </div>
        <div className="cnt-box-two">
          <ItemBox className="item-box" text={city} title="شهر" />
          <ItemBox className="item-box" text={date} title="تاریخ ثبت" />
        </div>
        <div className="box-btns">
          <Button type="main" text="مشاهده اطلاعات" className="btn" />
        </div>
      </div>
    </Container>
  );
};
