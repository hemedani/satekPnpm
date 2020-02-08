import { UseMeSidebarQuery } from "@satek/hooks";
import cx from "classnames";
import React, { useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { ViewRequest } from "../admin/viewRequest/ViewRequest";
import { CustomError } from "../componentShare/customError/CustomError";
import { sellerHomeItem } from "../componentShare/home/dataItemsHome/DataItemHome";
import { Home } from "../componentShare/home/home";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { SystemUsageGuide } from "../componentShare/systemUsageGuide/SystemUsageGuide";
import { AnnouncementsHeadHospital } from "../headOfHospital/announcements/AnnouncementsHeadHospital";
import { ReadMessagesPage } from "../headOfHospital/message/ReadMessagePage";
import { AccountingReports } from "./accountingReports/AccountingReports";
import { Discount } from "./discount/Dicount";
import { MyProductList } from "./myProductList/MyProductList";
import { AddOffer } from "./offer/AddOffer";
import { Offer } from "./offer/Offer";
import { SellerMenu } from "./SellerMenu";
import { SettingStore } from "./settingStore/SettingStore";
import { UploadDouments } from "./uploadDocuments/UploadDocuments";
import { AddStuff } from "./myProductList/AddStuff";
interface Props extends RouteComponentProps {}

export const Seller: React.FC<Props> = ({
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
          fullName="طب‌ پردازان غرب"
          level={data ? data!.me!.firstName + " " + data!.me!.lastName : ""}
          path={path}
          hamburgerBtn={hamburgerBtn}
          menuArray={SellerMenu}
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
              <Route path={`${path}/newrequests`} component={ViewRequest} />
              <Route
                path={`${path}/unfinishedrequest`}
                component={ViewRequest}
              />
              <Route
                exact
                path={`${path}/accountingreports`}
                component={AccountingReports}
              />
              <Route path={`${path}/settingstore`} component={SettingStore} />
              <Route path={`${path}/historyrequest`} component={ViewRequest} />
              <Route path={`${path}/myproductlist`} component={MyProductList} />
              <Route
                exact
                path={`${path}/uploaddocuments`}
                component={UploadDouments}
              />
              <Route exact path={`${path}/offer`} component={Offer} />
              <Route exact path={`${path}/addoffer`} component={AddOffer} />
              <Route exact path={`${path}/discount`} component={Discount} />
              <Route
                exact
                path={`${path}/readmessagespage`}
                component={ReadMessagesPage}
              />
              <Route
                exact
                path={`${path}/announcements`}
                component={AnnouncementsHeadHospital}
              />
              <Route path={`${path}/stuff`} component={AddStuff} />
              <Route
                exact
                path={`${path}/systemusageguide`}
                component={SystemUsageGuide}
              />
              <Route
                exact
                path={`${path}/`}
                component={() => (
                  <Home storeSubdue={73} path={path} data={sellerHomeItem} />
                )}
              />

              <Route exact path={`${path}/discount`} component={Discount} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
