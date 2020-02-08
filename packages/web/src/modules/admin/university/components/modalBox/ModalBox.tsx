import { UseUniversityQuery } from "@satek/hooks";
import { getUniversity_getUniversity } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { UniversityCreate } from "../../create/Create";
import { UniversityUpdate } from "../../update/Update";

interface Props extends RouteComponentProps {}

export const UniversityModalBox: React.FC<Props> = ({ history }) => {
  let { id } = useParams();

  const ParseUniversity: React.FC<{
    data: getUniversity_getUniversity;
  }> = ({ data }) => {
    if (id) {
      return (
        <UniversityUpdate
          id={id}
          details={data}
          isEditable={true}
          history={history}
        />
      );
    } else return <></>;
  };
  

  const responseUniversity = UseUniversityQuery(
    { error: CustomError, loading: Loader, parsing: ParseUniversity },
    { id: id ? id : "" },
    client
  );

  return (
    <ModalBox
      modalBoxSize="medium"
      display="flex"
      history={history}
      headerName={
        responseUniversity.Response!.props.data
          ? "ویرایش دانشگاه"
          : "افزودن دانشگاه"
      }
    >
      {responseUniversity.Response!.props.data ? (
        responseUniversity.Response
      ) : (
        <>
          <UniversityCreate isEditable={false} history={history} />
        </>
      )}
    </ModalBox>
  );
};
