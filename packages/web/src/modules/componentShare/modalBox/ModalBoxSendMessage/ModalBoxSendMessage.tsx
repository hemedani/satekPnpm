import React from "react";
import { ModalBox } from "../ModalBox";

export const ModalBoxSendMessage = () => {
  return (
    <ModalBox headerName="ثبت موفق درخواست" display="flex">
      <div className="containerForm-ModalBoxSendMessage">
        <p className="text-containerForm-ModalBoxSendMessage">متن پیام</p>
        <form className="form-ModalBoxSendMessage">
          <textarea className="textarea-ModalBoxSendMessage" />
        </form>
      </div>
      <div className="boxButton-ModalBoxSendMessage">
        <div className="container-boxButton-ModalBoxSendMessage">
          <button className="button-ModalBoxSendMessage">ارسال پاسخ</button>
          <p className="textCancel-ModalBoxSendMessage">انصراف</p>
        </div>
      </div>
    </ModalBox>
  );
};
