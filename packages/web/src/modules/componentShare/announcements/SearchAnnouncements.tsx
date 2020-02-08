import React from "react";
import { Button } from "../button/Button";
import { InputComponent } from "../inputComponent/InputComponent";
export const SearchAnnouncements: React.FC = () => {
  return (
    <div className="SearchAnnouncements-admin">
      <div className="SearchAnnouncements-admin">
        <div className="containerInput-SearchAnnouncements-admin">
          <div className="inputOne-SearchAnnouncements-admin">
            <InputComponent textInput="جستجو" />
          </div>
          <div className="inputTwo-SearchAnnouncements-admin">
            <InputComponent textInput="تاریخ ارسال" />
          </div>
          <div className="inputButtonSearch-SearchAnnouncements-admin">
            <Button padding="0.3rem 1rem" type="main" text="جستجو" />
          </div>
        </div>
        <div className="boxButton-SearchAnnouncements-admin">
          <Button
            padding="0.55rem 0.5rem"
            type="main"
            text="ایجاد اطلاعیه جدید"
          />
        </div>
      </div>
    </div>
  );
};
