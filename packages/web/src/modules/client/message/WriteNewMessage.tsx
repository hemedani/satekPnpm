import * as React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const WriteNewMessageClient = () => {
  return (
    <ContainerClient
      withoutHeader={true}
      underConstruction={true}
      colorHeader="blue"
      textHeader="نوشتن پیام جدید"
    >
      {/* <div className="container-writeNewMessage-client">
        <div className="box-notation-writeNewMessage-client">
          <span>!</span>
          <p>
            در قسمت ارسال پیام به با داشتن قسمتی از نام دریافت کننده پیام نام
            کامل آن نمایش داده می شود
          </p>
        </div>
        <div className="box-input-writeNewMessage-client">
          <div className="input-sendMessage-writeNewMessage-client">
            <InputComponent textInput="ارسال پیام به" />
          </div>
          <div className="input-codeRequest-writeNewMessage-client">
            <InputComponent textInput="کد درخواست مرتبط" />
          </div>
        </div>
        <div className="box-message-writeNewMessage-client">
          <p>متن پیام</p>
          <textarea
            rows={6}
            className="textarea-textMessage-writeNewMessage-client"
          ></textarea>
        </div>
        <div className="box-button-writeNewMessage-client">
          <Button text="ارسال پیام" type="main" padding="0.5rem 1.2rem" />
        </div>
      </div> */}
    </ContainerClient>
  );
};
