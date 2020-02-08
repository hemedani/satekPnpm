import React from "react";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "react-router-dom";
import LoginView from "./login/ui/LoginView";
import LoginCodeView from "./loginCode/ui/LoginCodeView";

export const Login: React.FC<RouteComponentProps> = ({
  history,
  match: { path }
}) => {
  return (
    <div className="pagelogo">
      <div className="loginStore">
        <div className="loginStoreLeft">
          <Switch>
            <Route path={`${path}/login`} exact component={LoginView} />
            <Route path={`${path}/code`} exact component={LoginCodeView} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
