import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_ORGANIZATIONS,
  getOrganizationsVariables,
  getOrganizations_getOrganizations,
  getOrganizations
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getOrganizations_getOrganizations[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrganizationsQuery<
  C extends Components,
  V extends getOrganizationsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrganizations,
    getOrganizationsVariables
  >(GQL_GET_ORGANIZATIONS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getOrganizations} />;
  }
  return { Response, data };
}
