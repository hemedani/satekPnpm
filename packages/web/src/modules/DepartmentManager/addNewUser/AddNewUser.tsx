import React, { useState } from "react";
import { AllowedGoodsForUserRequest } from "../../componentShare/addNewUser/AllowedGoodsForUserRequest";
import { SelectProfilePicture } from "../../componentShare/addNewUser/SelectProfilePicture";
import { UserIdentityInformation } from "../../componentShare/addNewUser/UserIdentityInformation";
import { Button } from "../../componentShare/button/Button";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const AddNewUser = () => {
  const [id, setId] = useState("");
  const [siteLabel, setSiteLabel] = useState("");
  return (
    <ContainerClient colorHeader="blue" textHeader="افزودن واحد/بخش جدید">
      <div className="addNewUser-admin">
        <div className="container-add-new-user-admin">
          <div className="top-addNewUser-admin">
            <div className="right-addNewUser-admin">
              <div className="userIdentityInformation-addNewUser-admin">
                <UserIdentityInformation
                  myCallback={setId}
                  hasUserRole={false}
                  siteLabel={siteLabel}
                />
              </div>
            </div>
            <div className="left-addNewUser-admin">
              <div className="selectUserPhoto-addNewUser-admin">
                <SelectProfilePicture />
              </div>
            </div>
          </div>
          <div className="bottom-addNewUser-admin">
            <div className="goodsAllowedRequest-addNewUser-admin">
              <AllowedGoodsForUserRequest id={id} />
            </div>
          </div>
        </div>
        <div className="boxButton-addNewUser-admin">
          <Button text="انصراف" type="cancel" padding="0.4rem 1.7rem" />
        </div>
      </div>
    </ContainerClient>
  );
};
