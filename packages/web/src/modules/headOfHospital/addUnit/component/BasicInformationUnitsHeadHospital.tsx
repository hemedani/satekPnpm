import React from "react";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";

export const BasicInformationUnitsHeadHospital = () => {
  return (
    <Container width="100%" title="اطلاعات اولیه واحد">
      <div className="field-BasicInformationUnits-admin">
        <p className="title-BasicInformationUnits-admin">نام واحد</p>
        <div className="inputBox-BasicInformationUnits-admin">
          <input type="text" className="input-BasicInformationUnits-admin" />
        </div>
      </div>
      <div className="field-BasicInformationUnits-admin">
        <p className="title-BasicInformationUnits-admin">آدرس</p>
        <div className="inputBox-BasicInformationUnits-admin">
          <Button
            height="2rem"
            margin="0 0 0 0.5rem"
            text="تغییر آدرس پیش فرض"
            type="main"
          />
          <Button height="2rem" text="تغییر لوکیشن پیش فرض" type="main" />
        </div>
      </div>
    </Container>
  );
};
