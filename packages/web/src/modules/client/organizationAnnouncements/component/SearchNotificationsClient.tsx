import * as React from "react";
import { Button } from "../../../componentShare/button/Button";
import { InputComponent } from "../../../componentShare/inputComponent/InputComponent";

export const SearchNotificationsClient = () => {
  return (
    <div className="SearchNotifications-client">
      <div className="box-search-SearchNotifications-client">
        <div className="notification-search-SearchNotifications-client">
          <InputComponent textInput="جستجو در اطلاعیه ها" />
        </div>
        <div className="history-search-SearchNotifications-client">
          <InputComponent textInput="تاریخ ارسال" />
        </div>
      </div>
      <div className="box-button-SearchNotifications-client">
        <Button
          margin="0 2rem"
          type="main"
          text="جستجو"
          padding="0.5rem 1.2rem"
        />
      </div>
    </div>
  );
};
