import React, { useState } from "react";
import { InputComponent } from "../../../componentShare/inputComponent/InputComponent";
import { InputSelectBoxComponent } from "../../../componentShare/inputSelectBoxinputSelectBoxComponent/InputSelectBoxComponent";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

export const ProductRequestHistoryHeadHospital = () => {
  const [selectPaymentStatus, setSelectPaymentStatus] = useState<number>(0);

  return (
    <div className="ProductRequestHistory-client">
      <div className="row-ProductRequestHistory-client">
        <div className="searchNameCodeGoods-ProductRequestHistory-client">
          <InputComponent widthInput="73%" textInput="جستجو نام کالا" />
        </div>
        <div className="applicationFilingDate-ProductRequestHistory-client">
          <InputComponent textInput="کد پیگیری ساتک" />
        </div>
        <div className="Condition-ProductRequestHistory-client">
          <InputComponent textInput="وضعیت" />
        </div>
      </div>
      <div className="row-ProductRequestHistory-client">
        <div className="searchNameCodeGoods-ProductRequestHistory-HeadHospital">
          <InputSelectBoxComponent widthSelect="73%" textInput="نام واحد" />
        </div>
        <div className="TrackingCode-ProductRequestHistory-client">
          <p className="title-productRequestHistory-HeadHospital">
            وضعیت پرداخت
          </p>
          <SelectBoxRegister
            style={{ height: "90%" }}
            change={setSelectPaymentStatus}
            select={selectPaymentStatus}
            nameFields={["نمایش همه", "تایید شده ها", "تایید نشده ها"]}
          />
        </div>
        <div className="buttonBox-ProductRequestHistory-HeadHospital">
          <button className="Button-ProductRequestHistory-client">جستجو</button>
        </div>
      </div>
    </div>
  );
};
