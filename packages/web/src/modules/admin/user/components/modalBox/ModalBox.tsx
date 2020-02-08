import { UseUserQuery } from "@satek/hooks";
import { getUser_getUser } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { UserCreate } from "../../create/Create";
import { CreateToSite } from "../../create/toSite/CreateToSite";
import { UserUpdate } from "../../update/Update";

interface Props extends RouteComponentProps {}

export const UserModalBox: React.FC<Props> = ({ history, match: { path } }) => {
  let { id } = useParams();

  const headerName = (id: string | undefined, path: string) => {
    if (id && path.includes("ware")) {
      return "ویرایش کالاهای مجاز برای درخواست کاربر";
    } else if (id) {
      return "ویرایش کاربر";
    } else {
      return "افزودن کاربر";
    }
  };

  const ParseUser: React.FC<{
    data: getUser_getUser;
  }> = ({ data }) => {
    if (id && !path.includes("ware")) {
      return <UserUpdate />;
    } else if (id) {
      return (
        <>
          <CreateToSite
            type={
              path.includes("admin")
                ? "Admin"
                : path.includes("hospital")
                ? "OrganizationHead"
                : "UnitHead"
            }
            id={id}
            history={history}
          />
        </>
      );
    } else return <></>;
  };

  

  const responseUser = UseUserQuery(
    { error: CustomError, loading: Loader, parsing: ParseUser },
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
      {responseUser.Response!.props.data ? (
        responseUser.Response
      ) : (
        <UserCreate history={history} path={path} />
      )}
    </ModalBox>
  );
};
