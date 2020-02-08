import { UseMeSidebarQuery } from "@satek/hooks";
import cx from "classnames";
import React, { useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { AddNewUser } from "../admin/addNewUser/AddNewUser";
import { UserList } from "../admin/user/list/List";
import { ViewRequest } from "../admin/viewRequest/ViewRequest";
import { CustomError } from "../componentShare/customError/CustomError";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { SystemUsageGuide } from "../componentShare/systemUsageGuide/SystemUsageGuide";
import { ManagerGoods } from "../headOfHospital/managerGoods/ManagerGoods";
import { ReadMessagesPage } from "../headOfHospital/message/ReadMessagePage";
import { WriteMessage } from "../headOfHospital/message/WirteMessage";
import { SubmitNewRequest } from "../headOfHospital/submitNewRequest/SubmitNewRequest";
import { AnnouncementsDepManger } from "./announcements/AnnouncementsDepManger";
import { CheckRequestGoods } from "./checkRequestGoods/CheckRequestGoods";
import { DeptManageMenu } from "./DeptMangrMenu";
interface Props extends RouteComponentProps {}

export const DepartmentManager: React.FC<Props> = ({
  match: { path },
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
          level="رییس واحد"
          path={path}
          hamburgerBtn={hamburgerBtn}
          menuArray={DeptManageMenu}
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
              <Route path={`${path}/addnewuser`} component={AddNewUser} />

              <Route
                path={`${path}/submitnewrequest/:id?`}
                component={SubmitNewRequest}
              />
              <Route path={`${path}/viewrequest`} component={ViewRequest} />

              <Route
                exact
                path={`${path}/usermanagement`}
                component={UserList}
              />

              <Route
                exact
                path="/departmentmanager/announcementsdepmanger"
                component={AnnouncementsDepManger}
              />
              <Route
                path={`${path}/highlyusedgoods`}
                exact
                component={ManagerGoods}
              />
              <Route
                path={`${path}/historyrequestdepmanager`}
                component={ViewRequest}
              />
              <Route
                exact
                path={`${path}/systemusageguide`}
                component={SystemUsageGuide}
              />
              <Route
                exact
                path={`${path}/writemessage`}
                component={WriteMessage}
              />
              <Route
                exact
                path={`${path}/readmessagespage`}
                component={ReadMessagesPage}
              />
              <Route
                path={`/departmentmanager/checkrequestgoods/:id/:modal?/:alterwareid?`}
                component={CheckRequestGoods}
              />
              {/* <Route
                exact
                path="/departmentmanager/requestablegoodsdepmanager"
                component={RequestableGoodsDepManager}
              /> */}
              <Route
                exact
                path={`${path}/managergoods`}
                component={ManagerGoods}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
