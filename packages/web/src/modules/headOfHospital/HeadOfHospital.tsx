import { UseMeSidebarQuery } from "@satek/hooks";
import cx from "classnames";
import React, { useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { AddNewUser } from "../admin/addNewUser/AddNewUser";
import { UnitList } from "../admin/unit/list/List";
import { UserList } from "../admin/user/list/List";
import { ViewRequest } from "../admin/viewRequest/ViewRequest";
import { CustomError } from "../componentShare/customError/CustomError";
import { headHospitalHomeItem } from "../componentShare/home/dataItemsHome/DataItemHome";
import { Home } from "../componentShare/home/home";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { SystemUsageGuide } from "../componentShare/systemUsageGuide/SystemUsageGuide";
import { AnnouncementsHeadHospital } from "./announcements/AnnouncementsHeadHospital";
import { CheckRequestGood } from "./checkRequestGood/CheckRequestGood";
import { ConfirmPaymentRequest } from "./ConfirmPaymentRequest/ConfirmPaymentRequest";
import { HeadOfHospitalMenu } from "./HeadOfHospitalMenu";
import { ManagerGoods } from "./managerGoods/ManagerGoods";
import { ReadMessagesPage } from "./message/ReadMessagePage";
import { WriteMessage } from "./message/WirteMessage";
import { SubmitNewRequest } from "./submitNewRequest/SubmitNewRequest";
interface Props extends RouteComponentProps {}

export const HeadOfHospital: React.FC<Props> = ({
  match: { path },
  location: { pathname },
  history
}) => {
  const { Response, data } = UseMeSidebarQuery(
    { error: CustomError, loading: Loader },

    client
  );
  const [hamburgerBtn, setHamburgerBtn] = useState(false);
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
          level="مدیر بیمارستان"
          path={path}
          hamburgerBtn={hamburgerBtn}
          menuArray={HeadOfHospitalMenu}
          location={pathname}
        />
        <div
          className={cx("black-background-responsive-sidebar", {
            "black-show-background-responsive-sidebar": hamburgerBtn
          })}
        ></div>
        <div className="inside-Client">
          <div className="container-Client">
            <Switch>
              <Route
                path={`${path}/viewrequest/:idfilter?`}
                component={ViewRequest}
              />
              <Route exact path={`${path}/unit`} component={UnitList} />

              <Route
                exact
                path={`${path}/managergoods`}
                component={ManagerGoods}
              />
              <Route
                exact
                path={`${path}/announcements`}
                component={AnnouncementsHeadHospital}
              />
              <Route
                exact
                path={`${path}/submitnewrequest`}
                component={SubmitNewRequest}
              />
              <Route
                exact
                path={`${path}/`}
                component={() => (
                  <Home
                    nameUser={
                      data
                        ? data!.me!.userToSites![0].site!.name +
                          " " +
                          data!.me!.firstName +
                          " " +
                          data!.me!.lastName
                        : ""
                    }
                    path={path}
                    data={headHospitalHomeItem}
                  />
                )}
              />
              <Route
                exact
                path={`${path}/paymentconfirmation`}
                component={ViewRequest}
              />
              <Route path={`${path}/historyrequest`} component={ViewRequest} />
              <Route
                path={`${path}/checkrequestgood/:id?`}
                component={CheckRequestGood}
              />
              <Route
                path={`${path}/paymentconfirmationfinal/:id?`}
                component={CheckRequestGood}
              />
              <Route
                exact
                path={`${path}/confirmpaymentrequest`}
                component={ConfirmPaymentRequest}
              />
              <Route
                exact
                path={`${path}/readmessagespage`}
                component={ReadMessagesPage}
              />
              <Route
                exact
                path={`${path}/writemessage`}
                component={WriteMessage}
              />
              <Route
                exact
                path={`${path}/systemusageguide`}
                component={SystemUsageGuide}
              />
              {/* <Route
                exact
                path={`${path}/managergoodsrequest`}
                component={ManagerGoodsRequest}
              /> */}
              <Route path={`${path}/user`} component={UserList} />
              <Route path={`${path}/unit`} component={UnitList} />
              <Route path={`${path}/addnewuser`} component={AddNewUser} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
