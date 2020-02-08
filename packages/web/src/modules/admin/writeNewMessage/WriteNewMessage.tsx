import * as React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { InputComponent } from "../../componentShare/inputComponent/InputComponent";

export const WriteNewMessage = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="نوشتن پیام جدید">
      <div className="WriteNewMessage-admin">
        <div className="container-WriteNewMessage-admin">
          <div className="box-notation-WriteNewMessage-admin">
            <span>!</span>
            <p className="notation-WriteNewMessage-admin">
              در قسمت ارسال پیام به با داشتن قسمتی از نام دریافت کننده پیام نام
              کامل آن نمایش داده می شود
            </p>
          </div>
          <div className="box-input-WriteNewMessage-admin">
            <div className="input-sendMessage-WriteNewMessage-admin">
              <InputComponent textInput="ارسال پیام به" />
            </div>
            <div className="input-codeRequest-WriteNewMessage-admin">
              <InputComponent textInput="کد درخواست مرتبط" />
            </div>
          </div>
          <div className="box-message-WriteNewMessage-admin">
            <p className="titleMessage-WriteNewMessage-admin">متن پیام</p>
            <textarea
              rows={6}
              className="textarea-textMessage-WriteNewMessage-admin"
            ></textarea>
          </div>
          <div className="box-button-WriteNewMessage-admin">
            <button className="button-WriteNewMessage-admin">جستجو</button>
          </div>
        </div>
      </div>
    </ContainerClient>
  );
};
