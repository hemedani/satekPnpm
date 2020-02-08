import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { SubmitNewRequestHeadOfHospital } from "../../headOfHospital/submitNewRequest/SubmitNewRequestHeadOfHospital";

interface Props extends RouteComponentProps {
  children: React.ReactNode;
}
export const SubmitNewRequest: React.FC<Props> = ({
  match: { path },
  history
}) => {
  const { id } = useParams();
  console.log(id, path, "hala har khari");
  return (
    <div className="container-SubmitNewRequest-client">
      <div className="Part-SubmitNewRequest-client">
        <ContainerClient
          overflowY="unset"
          colorHeader="blue"
          textHeader="ثبت درخواست جدید"
        >
          <SubmitNewRequestHeadOfHospital
            path={path}
            history={history}
            id={id && id}
          />
        </ContainerClient>
      </div>
      {/* <div className="Part-SubmitNewRequest-client">
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
