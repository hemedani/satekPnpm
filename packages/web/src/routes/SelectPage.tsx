import { useMeQuery } from "@satek/hooks";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { client } from "../Apollo";
import { CustomError } from "../modules/componentShare/customError/CustomError";
import { Loader } from "../modules/componentShare/loader/Loader";
import { LogoCode } from "../modules/register/ComponentShare/CodeLogo";

export const SelectPage: React.FC<RouteComponentProps> = ({
  history,
  match: { path }
}) => {
  const { Response, data } = useMeQuery(
    { error: CustomError, loading: Loader },
    client
  );
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token && data && data.me && data.me.userToSites) {
      const role = data.me!.userToSites![0].role;
      if (role === "Master") history.push("/admin/");
      if (role == "UnitEmployee") history.push("/client/SubmitNewRequest");
      if (role == "UnitHead") history.push("/departmentmanager/viewrequest");
      if (role == "OrganizationHead") history.push("/headofhospital/");
      if (role == "StoreHead") history.push("/seller/");
      if (
        role == "FinanceEmployee" ||
        role === "FinanceHead" ||
        role === "Supplier" ||
        role === "Stockclerk" ||
        role === "Expert"
      )
        history.push("/expert/");
    }
    if (!token) {
      history.push("/login/login");
    }
  });
  return (
    <div className="pagelogo">
      <div className="loginStore">
        <div className="loginStoreLeft">
          <div className="boxRegisterStorePhoneCode">
            <div className="logoPhoneCode">
              <LogoCode />
            </div>
            <div className="fieldFormStorePhoneCode">{Response}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
