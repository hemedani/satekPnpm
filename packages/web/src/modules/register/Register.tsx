import React from "react";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "react-router-dom";
import { RegisterCommitmentsSalesView } from "./CommitmentsSales/ui/RegisterCommitmentsSalesView";
import { ListLevelRegister } from "./ComponentShare/RegisterListLevel";
import { EditConnector } from "./Edit/RegisterEditConnector";
import { FinalApprovalConnector } from "./FinalApproval/RegisterFinalApprovalConnector";
import { RegisterInformationBankView } from "./InformationBank/ui/RegisterInformationBankView";
import { MembersStoreConnector } from "./MembersStore/RegisterMembersStoreConnector";
import { RegisterPhotoDocumentsManagerView } from "./PhotoDocumentsManager/ui/RegisterPhotoDocumentsManagerView";
import { RegisterPhotoDocumentsOwnerView } from "./PhotoDocumentsOwner/ui/RegisterPhotoDocumentsOwnerView";
import { RegisterRuleView } from "./Rule/ui/RegisterRuleView";
import { RegisterStoreOrganizationView } from "./StoreAndOrganizations/ui/RegisterStoreOrganizationView";

interface Props extends RouteComponentProps {}

export const Register: React.FC<Props> = ({ match: { path }, location }) => {
  function ListLevel(pathComponent: string) {
    switch (pathComponent) {
      case "StoreOrganization":
        return 1;
      case "membersstore":
        return 1;
      case "photodocumentsmanager":
        return 2;
      case "commitmentssales":
        return 4;
      case "photodocumentsowner":
        return 2;
      case "informationbank":
        return 3;
      case "finalapproval":
        return 6;
      case "rule":
        return 5;
      case "edit":
        return 1;
      default:
        return null;
    }
  }
  return (
    <div className="pageStore">
      <div className="registerStore">
        <div className="registerStoreLeft">
          <Switch>
            <Route
              path={`${path}/StoreOrganization`}
              exact
              component={RegisterStoreOrganizationView}
            />
            <Route
              path={`${path}/membersstore`}
              exact
              component={MembersStoreConnector}
            />
            <Route
              path={`${path}/photodocumentsmanager`}
              exact
              component={RegisterPhotoDocumentsManagerView}
            />
            <Route
              path={`${path}/commitmentssales`}
              exact
              component={RegisterCommitmentsSalesView}
            />
            <Route
              path={`${path}/photodocumentsowner`}
              exact
              component={RegisterPhotoDocumentsOwnerView}
            />
            <Route
              path={`${path}/informationbank`}
              exact
              component={RegisterInformationBankView}
            />
            <Route
              path={`${path}/finalapproval`}
              exact
              component={FinalApprovalConnector}
            />
            <Route path={`${path}/rule`} exact component={RegisterRuleView} />
            <Route path={`${path}/edit`} exact component={EditConnector} />
          </Switch>
        </div>
        <div className="registerStoreRight">
          <ListLevelRegister
            level={ListLevel(location.pathname.split("/")[2]) as number}
          />
        </div>
      </div>
    </div>
  );
};
