import { useMeQuery } from "@satek/hooks";
import { me_me, UserRole } from "@satek/resolvers";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { client } from "../Apollo";
import { CustomError } from "../modules/componentShare/customError/CustomError";
import { Loader } from "../modules/componentShare/loader/Loader";

interface Props {
  component: any;
  Role: UserRole[];
  path: string;
}
export const CustomRoute: React.FC<Props> = ({ path, Role, component }) => {
  const Parse: React.FC<{ data: me_me }> = ({ data }) => {
    return (
      <>
        {data &&
        data.userToSites &&
        data.userToSites.find(user => Role.includes(user.role)) ? (
          <Route path={path} component={component} />
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  };

  const { Response } = useMeQuery(
    { error: CustomError, loading: Loader, parsing: Parse },

    client
  );
  return <>{Response}</>;
};
