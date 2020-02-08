import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { ListWaitingConfirmation } from "../../componentShare/submitNewRequest/ListWaitingConfirmation";
import { SubmitNewRequestDepManager } from "./SubmitNewRequestDepManager";

interface Props {
  children: React.ReactNode;
}
export const SubmitNewRequest: React.FC<Props> = props => {
  return (
    <div className="container-SubmitNewRequest-client">
      <div className="Part-SubmitNewRequest-client">
        <ContainerClient colorHeader="blue" textHeader="ثبت درخواست جدید">
          <SubmitNewRequestDepManager />
        </ContainerClient>
      </div>
      <div className="Part-SubmitNewRequest-client">
        <ContainerClient
          colorHeader="yellow"
          textHeader="لیست درخواست های منتظر تایید شما"
        >
          <ListWaitingConfirmation />
        </ContainerClient>
      </div>
    </div>
  );
};
