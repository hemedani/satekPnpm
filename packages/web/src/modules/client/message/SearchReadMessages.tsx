import React, { useState } from "react";
import { Button } from "../../componentShare/button/Button";
import { InputComponent } from "../../componentShare/inputComponent/InputComponent";
import { SelectBoxRegister } from "../../register/ComponentShare/SelectBoxRegister";

export const SearchReadMessages = () => {
  const [selectMessage, setSelectMessage] = useState<number>(0);

  return (
    <div className="searchUnreadMessages-client">
      <div className="boxes-searchUnreadMessages-client">
        <div className="searchMessage-searchUnreadMessages-client">
          <InputComponent textInput="جستجو در پیام ها" />
        </div>
        <div className="postageDate-searchUnreadMessages-client">
          <InputComponent textInput="تاریخ ارسال" />
        </div>
        <div className="displayFilter-searchUnreadMessages-client">
          <p className="text-searchUnreadMessages-client">فیلتر نمایش</p>
          <div className="filter-searchUnreadMessages-client">
            <SelectBoxRegister
              change={setSelectMessage}
              select={selectMessage}
              nameFields={[
                "فقط پیام های ساتک",
                "فقط پیام های کاربران",
                "همه پیام ها"
              ]}
            />
          </div>
        </div>
      </div>
      <div className="box-button-searchUnreadMessages-client">
        <Button
          type="main"
          text="جستجو"
          padding="0.5rem 1.2rem"
          margin="0.5rem 0"
        />
      </div>
    </div>
  );
};
