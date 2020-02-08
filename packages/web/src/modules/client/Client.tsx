import { UseMeSidebarQuery } from "@satek/hooks";
import cx from "classnames";
import React, { useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { ViewRequest } from "../admin/viewRequest/ViewRequest";
import { CustomError } from "../componentShare/customError/CustomError";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { SystemUsageGuide } from "../componentShare/systemUsageGuide/SystemUsageGuide";
import { ManagerGoods } from "../headOfHospital/managerGoods/ManagerGoods";
import { ClientMenu } from "./ClientMenu";
import { NewMessagePage } from "./message/NewMessagePage";
import { ReadMessagesPage } from "./message/ReadMessagesPage";
import { WriteNewMessageClient } from "./message/WriteNewMessage";
import { OrganizationAnnouncements } from "./organizationAnnouncements/OrganizationAnnouncements";
import { SubmitNewRequest } from "./submitNewRequest/SubmitNewRequest";

interface Props extends RouteComponentProps {}

export const Client: React.FC<Props> = ({
  match: { path },
  location: { pathname },
  history
}) => {
  const { Response, data } = UseMeSidebarQuery(
    { error: CustomError, loading: Loader },

    client
  );
  const [hamburgerBtn, setHamburgerBtn] = useState(false);
  const closeSideBar = () => {
    setHamburgerBtn(false);
  };
  return (
    <div className="Client">
      <div className="navigation-Client">
        <NavbarClient
          hamburgerBtn={hamburgerBtn}
          setHamburgerBtn={setHamburgerBtn}
          history={history}
        />
      </div>
      <div className="body-Client">
        <SideBar
          imageURL={PersonalImage}
          fullName={data ? data!.me!.firstName + " " + data!.me!.lastName : ""}
          level="کارمند واحد"
          path={path}
          hamburgerBtn={hamburgerBtn}
          menuArray={ClientMenu}
          location={pathname}
        />
        <div
          onClick={closeSideBar}
          className={cx("black-background-responsive-sidebar", {
            "black-show-background-responsive-sidebar": hamburgerBtn
          })}
        ></div>
        <div className="inside-Client">
          <div className="container-Client">
            <Switch>
              <Route
                exact
                path={`${path}/managergoods`}
                component={ManagerGoods}
              />
              <Route path={`${path}/historyrequest`} component={ViewRequest} />
              <Route path={`${path}/deliverygoods`} component={ViewRequest} />
              <Route
                path={`${path}/submitnewrequest`}
                component={SubmitNewRequest}
              />
              <Route
                path={`${path}/OrganizationAnnouncements`}
                exact
                component={OrganizationAnnouncements}
              />
              <Route
                exact
                path={`${path}/systemusageguide`}
                component={SystemUsageGuide}
              />
              <Route
                path={`${path}/highlyusedgoods`}
                exact
                component={ManagerGoods}
              />
              <Route
                path={`${path}/readmessagespage`}
                exact
                component={ReadMessagesPage}
              />
              <Route
                path={`${path}/NewMessagePage`}
                exact
                component={NewMessagePage}
              />
              <Route
                path={`${path}/writenewmessageclient`}
                exact
                component={WriteNewMessageClient}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
