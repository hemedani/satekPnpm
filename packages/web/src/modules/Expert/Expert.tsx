import { UseMeSidebarQuery } from "@satek/hooks";
import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { client } from "../../Apollo";
import PersonalImage from "../../image/Client/Personal.jpg";
import { ViewRequest } from "../admin/viewRequest/ViewRequest";
import { CustomError } from "../componentShare/customError/CustomError";
import { Loader } from "../componentShare/loader/Loader";
import { NavbarClient } from "../componentShare/navbarClient/NavbarClient";
import { SideBar } from "../componentShare/sideBar/SideBar";
import { SystemUsageGuide } from "../componentShare/systemUsageGuide/SystemUsageGuide";
import { CheckRequestGood } from "../headOfHospital/checkRequestGood/CheckRequestGood";
import { ExpertMenu } from "./ExpertMenu";

interface Props extends RouteComponentProps {}

export const Expert: React.FC<Props> = ({ match: { path }, history }) => {
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
          level="کارشناس مالی"
          path={path}
          menuArray={ExpertMenu}
        />

        <div className="inside-Client">
          <div className="container-Client">
            <Switch>
              <Route exact path={`${path}`} component={ViewRequest} />
              <Route path={`${path}/historyrequest`} component={ViewRequest} />
              <Route
                exact
                path={`${path}/systemusageguide`}
                component={SystemUsageGuide}
              />
              <Route
                exact
                path={`${path}/checkrequestgood/:id?`}
                component={CheckRequestGood}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
