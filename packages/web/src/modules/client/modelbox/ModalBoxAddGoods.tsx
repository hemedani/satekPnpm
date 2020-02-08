import React from "react";
import { ModalBox } from "../../componentShare/modalBox/ModalBox";

export const ModalBoxAddGoods = () => {
  return (
    <ModalBox
      headerName="فرم افزودن کالا به لیست مجاز درخواست(جهت اقدام مدیر)"
      display="flex"
    >
      <div className="containerForm-ModalBoxAddGoods">
        <form className="form-ModalBoxAddGoods">
          <div className="itemInput-ModalBoxAddGoods">
            <p className="textInput-ModalBoxAddGoods">نام کالا</p>
            <input type="text" className="inputGood-ModalBoxAddGoods"></input>
          </div>
          <div className="itemInput-ModalBoxAddGoods">
            <p className="textInput-ModalBoxAddGoods">کد IRC</p>
            <input type="text" className="inputGood-ModalBoxAddGoods"></input>
          </div>
          <div className="itemInputTextarea-ModalBoxAddGoods">
            <p className="textInput-ModalBoxAddGoods">توضیحات</p>
            <textarea className="textareaGood-ModalBoxAddGoods"></textarea>
          </div>
        </form>
      </div>
      <div className="boxButton-ModalBoxAddGoods">
        <div className="container-boxButton-ModalBoxAddGoods">
          <button className="button-ModalBoxAddGoods">ارسال به مدیر</button>
          <p className="textCancel-ModalBoxAddGoods">انصراف</p>
        </div>
      </div>
    </ModalBox>
  );
};
