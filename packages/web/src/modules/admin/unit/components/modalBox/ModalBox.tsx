import { UseUnitQuery } from "@satek/hooks";
import { getUnit_getUnit } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { UnitCreate } from "../../create/Create";
import { UnitUpdate } from "../../update/Update";
import { UnitUpdateWareGroups } from "../../updateWareGroups/UpdateWareGroup";

interface Props extends RouteComponentProps {}

export const UnitModalBox: React.FC<Props> = ({ history, match: { path } }) => {
  let { id } = useParams();
  const headerName = (id: string | undefined, path: string) => {
    if (id && path.includes("waregroup")) {
      return "زیر گروه کالایی مرتبط با واحد";
    } else if (id) {
      return "ویرایش واحد";
    } else {
      return "افزودن واحد";
    }
  };

  const ParseUnit: React.FC<{
    data: getUnit_getUnit;
  }> = ({ data }) => {
    if (id && !path.includes("waregroup")) {
      return (
        <UnitUpdate
          id={id}
          details={data}
          isEditable={true}
          history={history}
          path={path}
        />
      );
    } else if (id) {
      return (
        <>
          <UnitUpdateWareGroups id={id} />
        </>
      );
    } else return <></>;
  };

  
  const responseUnit = UseUnitQuery(
    { error: CustomError, loading: Loader, parsing: ParseUnit },
    { id: id ? id : "" },
    client
  );

  return (
    <ModalBox
      modalBoxSize="medium"
      display="flex"
      history={history}
      headerName={headerName(id, path)}
    >
      {responseUnit.Response!.props.data ? (
        responseUnit.Response
      ) : (
        <>
          <UnitCreate isEditable={false} history={history} path={path} />
        </>
      )}
    </ModalBox>
  );
};
