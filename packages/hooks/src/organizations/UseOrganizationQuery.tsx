import { useQuery } from "@apollo/react-hooks";
import {
  getOrganizationSimple,
  getOrganizationSimple_getOrganization,
  getOrganizationVariables,
  GQL_GET_ORGANIZATION
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getOrganizationSimple_getOrganization;
}

interface ErrorProps {
  errMsg: string;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrganizationQuery<
  C extends Components,
  V extends getOrganizationVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrganizationSimple,
    getOrganizationVariables
  >(GQL_GET_ORGANIZATION, {
    variables,
    client
  });

  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getOrganization} />;
  }
  return { Response, data };
}
