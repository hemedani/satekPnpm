import React, { useState } from "react";
import { InputComponent } from "../../componentShare/inputComponent/InputComponent";
import { SelectBoxRegister } from "../../register/ComponentShare/SelectBoxRegister";

export const SubmitNewRequestDepManager = () => {
  const [selectTime, setSelectTime] = useState<number>(0);

  return (
    <div className="SubmitNewRequest-client">
      <div className="notification-SubmitNewRequest-client">
        <span>!</span>
        <p className="text-notification-SubmitNewRequest-client">
          کالای درخواستی را در لیست زیر جستجو کنید
        </p>
      </div>
      <div className="boxInput-SubmitNewRequest-client">
        <InputComponent textInput="نام کالا درخواستی" />
        {/* <p className="title-SubmitNewRequest-client">نام کالا</p>
        <input type="text" className="input-SubmitNewRequest-client" /> */}
      </div>
      <div className="boxInput-SubmitNewRequest-client">
        <div className="historyNeedGoods-SubmitNewRequest-client">
          <InputComponent textInput="حداکثر زمان تحویل" />
        </div>
        <div className="number-SubmitNewRequest-client">
          <InputComponent textInput="تعداد/مقدار" />
        </div>
        <div className="unit-SubmitNewRequest-client">
          <InputComponent textInput="موجودی فعلی" />
        </div>
      </div>
      <div className="boxButtonTime-SubmitNewRequest-client">
        <div className="timeDelivery-SubmitNewRequest-client">
          <div className="checkBoxDelivery-SubmitNewRequest-client">
            <input type="checkbox" />
            <p className="textCheckBox-SubmitNewRequest-client">
              به این کالا نیاز فوری دارم!
            </p>
          </div>
          <div className="SelectBox-SubmitNewRequest-client">
            <p className="titleSelectBox-SubmitNewRequest-client">
              تحویل تا چند ساعت آینده انجام شود؟
            </p>
            <SelectBoxRegister
              nameFields={["1", "2", "3", "4", "5"]}
              change={setSelectTime}
              select={selectTime}
            />
          </div>
        </div>
        <button className="button-SubmitNewRequest-client">
          افزودن به لیست درخواست ها
        </button>
      </div>
    </div>
  );
};
