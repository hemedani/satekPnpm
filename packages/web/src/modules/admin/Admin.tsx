import { UseMeSidebarQuery } from "@satek/hooks";
import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { CustomError } from "../componentShare/customError/CustomError";
import { adminHomeItem } from "../componentShare/home/dataItemsHome/DataItemHome";
import { Home } from "../componentShare/home/home";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { AddNewUser } from "./addNewUser/AddNewUser";
import { AdminMenu } from "./AdminMenu";
import { Announcements } from "./announcements/Announcements";
import { BasicSettings } from "./basicSettings/BasicSettings";
import { CategoryList } from "./category/list/List";
import { EditingInformationVendor } from "./editingInformationVendor/EditingInformationVendor";
import { HospitalList } from "./hospital/list/List";
import { ManagerGoods } from "./managerGoods/ManagerGoods";
import { Ware } from "./managerWare/Ware";
import { RegistrationRequests } from "./registrationRequest/RegistrationRequests";
import RuleOrgan from "./ruleOragan/RuleOrgan";
import { Statistics } from "./statistics/Statistics";
import { StoreList } from "./store/list/List";
import { StoreUpdate } from "./store/update/Update";
import { Test } from "./Test";
import { UnitList } from "./unit/list/List";
import { UniversityList } from "./university/list/List";
import { UserList } from "./user/list/List";
import { ViewRequest } from "./viewRequest/ViewRequest";
import { WriteNewMessage } from "./writeNewMessage/WriteNewMessage";

interface Props extends RouteComponentProps {}

export const Admin: React.FC<Props> = ({
  match: { path },
  location: { pathname },
  history
}) => {
  const { Response, data } = UseMeSidebarQuery(
    { error: CustomError, loading: Loader },

    client
  );
  return (
    <div className="Client">
      <div className="navigation-Client">
        <NavbarClient history={history} />
      </div>
      <div className="body-Client">
        <SideBar
          imageURL={PersonalImage}
          fullName={data ? data!.me!.firstName + " " + data!.me!.lastName : ""}
          level="ادمین وبسایت"
          path={path}
          menuArray={AdminMenu}
          location={pathname}
        />

        <div className="inside-Client">
          <div className="container-Client">
            <Switch>
              <Route
                path={`${path}/viewrequesthistory`}
                component={ViewRequest}
              />
              <Route
                exact
                path={`${path}/writenewmessage`}
                component={WriteNewMessage}
              />
              <Route
                exact
                path={`${path}/announcements`}
                component={Announcements}
              />
              <Route path={`${path}/hospital`} component={HospitalList} />
              <Route path={`${path}/university`} component={UniversityList} />
              <Route path={`${path}/category`} component={CategoryList} />
              <Route path={`${path}/unit`} component={UnitList} />
              <Route path={`${path}/basicsettings`} component={BasicSettings} />
              <Route
                exact
                path={`${path}/registrationrequests`}
                component={RegistrationRequests}
              />
              <Route exact path={`${path}/store`} component={StoreList} />
              <Route
                exact
                path={`/${path.split("/")[1]}/store/updatestore/:id?`}
                component={StoreUpdate}
              />
              <Route path={`${path}/addnewuser`} component={AddNewUser} />
              <Route exact path={`${path}/user`} component={UserList} />
              <Route exact path={`${path}/ruleorgan`} component={RuleOrgan} />

              <Route path={`${path}/modelware`} component={Ware} />
              <Route path={`${path}/groupware`} component={Ware} />
              <Route path={`${path}/ware`} component={Ware} />
              <Route path={`${path}/classware`} component={Ware} />
              <Route path={`${path}/typeware`} component={Ware} />
              <Route
                exact
                path={`${path}/managergoods`}
                component={ManagerGoods}
              />
              <Route
                exact
                path={`${path}/editinginformationvendor`}
                component={EditingInformationVendor}
              />
              <Route path={`${path}/statistics`} component={Statistics} />
              <Route
                exact
                path={`${path}/`}
                component={() => <Home data={adminHomeItem} />}
              />
              <Route path={`${path}/test`} component={() => <Test />} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
