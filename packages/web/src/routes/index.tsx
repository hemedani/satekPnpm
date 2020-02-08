import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from "../modules/admin/Admin";
import { Client } from "../modules/client/Client";
import { DepartmentManager } from "../modules/DepartmentManager/DepartmentManager";
import { Expert } from "../modules/Expert/Expert";
import { HeadOfHospital } from "../modules/headOfHospital/HeadOfHospital";
import { Login } from "../modules/Login/login";
import { Register } from "../modules/register/Register";
import { Seller } from "../modules/seller/Seller";
import { SelectPage } from "./SelectPage";

export const Routes = () => (
  <div className="main-container">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SelectPage} />
        {/* <CustomRoute
          path="/client"
          Role={[UserRole.UnitEmployee]}
          component={Client}
        />
        <CustomRoute path="/admin" Role={[UserRole.Master]} component={Admin} />
        <CustomRoute
          path="/departmentmanager"
          Role={[UserRole.UnitHead]}
          component={DepartmentManager}
        />
        <CustomRoute
          path="/headofhospital"
          Role={[UserRole.OrganizationHead]}
          component={HeadOfHospital}
        />
        <CustomRoute
          path="/seller"
          Role={[UserRole.StoreHead]}
          component={Seller}
        />
        <CustomRoute
          path="/expert"
          Role={[UserRole.Expert, UserRole.FinanceHead]}
          component={Expert}
        /> */}
        <Route path="/register" component={Register} />
        <Route path="/client" component={Client} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/departmentmanager" component={DepartmentManager} />
        <Route path="/headofhospital" component={HeadOfHospital} />
        <Route path="/seller" component={Seller} />
        <Route path="/expert" component={Expert} />
      </Switch>
    </BrowserRouter>
  </div>
);
