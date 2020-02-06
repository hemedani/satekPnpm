import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_ALLOWED_WARES_USER,
  getAllowedWaresUser,
  getAllowedWaresUserVariables,
  getAllowedWaresUser_getUser
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getAllowedWaresUser_getUser;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useAllowedWaresUserQuery<
  C extends Components,
  V extends getAllowedWaresUserVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getAllowedWaresUser,
    getAllowedWaresUserVariables
  >(GQL_GET_ALLOWED_WARES_USER, {
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
  return { Response };
}
