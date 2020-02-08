import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { AllowedGoodsForUserRequest } from "../../componentShare/addNewUser/AllowedGoodsForUserRequest";
import { UserIdentityInformation } from "../../componentShare/addNewUser/UserIdentityInformation";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { ModalBoxSelectLocationServiceUser } from "../../componentShare/modalBox/modalBoxSelectLocationServiceUser/modalBoxSelectLocationServiceUser";


interface Props extends RouteComponentProps {}
export const AddNewUser: React.FC<Props> = props => {
  const [id, setId] = useState("");
  const [siteLabel, setSiteLabel] = useState("");
  return (
    <ContainerClient colorHeader="blue" textHeader="افزودن کاربر جدید">
      <div className="add-new-user-cnt">
        <div className="top">
          <UserIdentityInformation
            hasUserRole={false}
            myCallback={setId}
            siteLabel={siteLabel}
            path={props.match.path.split("/")[1]}
          />
        </div>
        <AllowedGoodsForUserRequest className="bottom" id={id} />
      </div>
      <Route
        exact
        path={`/${props.match.path.split("/")[1]}/addnewuser/serviceuser`}
        component={() => (
          <ModalBoxSelectLocationServiceUser
            history={props.history}
            type={
              props.match.path.includes("admin")
                ? "Admin"
                : props.match.path.includes("hospital")
                ? "OrganizationHead"
                : "UnitHead"
            }
            id={id}
            siteIdCallBack={setSiteLabel}
          />
        )}
      />
    </ContainerClient>
  );
};
