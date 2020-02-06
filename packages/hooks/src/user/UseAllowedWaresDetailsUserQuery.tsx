import { useQuery } from "@apollo/react-hooks";
import {
  getAllowedWaresDetailsUser,
  getAllowedWaresDetailsUserVariables,
  getAllowedWaresDetailsUser_getUser,
  GQL_GET_ALLOWED_WARES_DETAILS_USER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getAllowedWaresDetailsUser_getUser;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useAllowedWaresDetailsUserQuery<
  C extends Components,
  V extends getAllowedWaresDetailsUserVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getAllowedWaresDetailsUser,
    getAllowedWaresDetailsUserVariables
  >(GQL_GET_ALLOWED_WARES_DETAILS_USER, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUser} />;
  }
  return { Response, data };
}
