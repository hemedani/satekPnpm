import React, { useState } from "react";
import PersonalImage from "../../../image/Client/Personal.jpg";
import { BoxMessage } from "../componentShare/boxMessage/BoxMessage";
import { SideClient } from "../sideClient/SideClient";
import { TabsClient } from "./TabsClient";

export const NewMessagePage: React.FC = () => {
  const [selectTab, setSelectTabs] = useState<number>(0);
  return (
    <div className="NewMessagePage">
      <div className="body-NewMessagePage">
        <div className="sidebar-NewMessagePage">
          <SideClient imageURL={PersonalImage} />
        </div>

        <div className="inside-NewMessagePage">
          <div className="container-NewMessagePage">
            <TabsClient
              change={setSelectTabs}
              textTabs={[
                "پیام های جدید",
                "پیام های خوانده شده",
                "نوشتن یک پیام جدید"
              ]}
              selectTabs={selectTab}
            />
            <div className="container-messages-NewMessagePage">
              <BoxMessage hasAnswer={true} hasImag="asdsa" color="yellow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
