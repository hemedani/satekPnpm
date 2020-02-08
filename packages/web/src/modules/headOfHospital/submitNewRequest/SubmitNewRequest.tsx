import React from "react";
import { RouteComponentProps } from "react-router";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { SubmitNewRequestHeadOfHospital } from "./SubmitNewRequestHeadOfHospital";

interface Props extends RouteComponentProps {
  children: React.ReactNode;
}
export const SubmitNewRequest: React.FC<Props> = ({
  match: { path },
  history
}) => {
  return (
    <div className="container-SubmitNewRequest-client">
      <div className="Part-SubmitNewRequest-client">
        <ContainerClient colorHeader="blue" textHeader="ثبت درخواست جدید">
          <SubmitNewRequestHeadOfHospital path={path} history={history} />
        </ContainerClient>
      </div>
      {/*   <div className="Part-SubmitNewRequest-client">
       <ContainerClient
          colorHeader="yellow"
          textHeader="لیست درخواست های منتظر تایید شما"
        >
          <ListWaitingConfirmation />
        </ContainerClient> 
      </div>*/}
    </div>
  );
};
