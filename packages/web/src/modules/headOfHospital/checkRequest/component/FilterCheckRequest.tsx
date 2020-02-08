import React, { useState } from "react";
import { InputSelectBoxComponent } from "../../../componentShare/inputSelectBoxinputSelectBoxComponent/InputSelectBoxComponent";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

export const FilterUnitCheckRequest = () => {
  const [selectFilter, setSelectFilter] = useState<number>(0);
  return (
    <div className="filterUnitCheckRequest-headHospital">
      <div className="filterNameUnit-filterUnitCheckRequest-headHospital">
        <InputSelectBoxComponent textInput="فیلتر بر اساس نام واحد" />
      </div>
      <div className="sortBy-filterUnitCheckRequest-headHospital">
        <p className="name-admin title-filterUnitCheckRequest-headHospital">
          مرتب سازی بر اساس
        </p>
        <SelectBoxRegister
          select={selectFilter}
          change={setSelectFilter}
          nameFields={["مبلغ", "تاریخ ثبت درخواست", "تاریخ نیاز"]}
        />
      </div>
    </div>
  );
};
