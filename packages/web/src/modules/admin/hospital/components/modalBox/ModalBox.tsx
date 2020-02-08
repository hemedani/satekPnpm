import { useOrganizationQuery } from "@satek/hooks";
import { getOrganizationSimple_getOrganization } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { HospitalCreate } from "../../create/Create";
import { HospitalUpdate } from "../../update/Update";

interface Props extends RouteComponentProps {}

export const HospitalModalBox: React.FC<Props> = ({ history }) => {
  // * get id from URL
  let { id } = useParams();

  const ParseOrganization: React.FC<{
    data: getOrganizationSimple_getOrganization;
  }> = ({ data }) => {
    if (id) {
      return (
        <HospitalUpdate
          id={id}
          details={data}
          isEditable={true}
          history={history}
        />
      );
    } else return <></>;
  };

  
  const responseOrganization = useOrganizationQuery(
    { error: CustomError, loading: Loader, parsing: ParseOrganization },
    { id: id ? id : "" },
    client
  );

  return (
    <ModalBox
      history={history}
      modalBoxSize="medium"
      display="flex"
      headerName={
        responseOrganization.Response!.props.data
          ? "ویرایش بیمارستان"
          : "افزودن بیمارستان"
      }
    >
      {responseOrganization.Response!.props.data ? (
        responseOrganization.Response
      ) : (
        <>
          <HospitalCreate isEditable={false} history={history} />
        </>
      )}
    </ModalBox>
  );
};
