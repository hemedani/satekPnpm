import { useQuery } from "@apollo/react-hooks";
import {
  getOrganizationParents,
  getOrganizationVariables,
  GQL_GET_ORGANIZATION_PARENTS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}
interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
}

export function useOrganizationParentsQuery<
  C extends Components,
  V extends getOrganizationVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  // const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrganizationParents,
    getOrganizationVariables
  >(GQL_GET_ORGANIZATION_PARENTS, {
    variables,
    client
  });
  // console.log(data, "get organization orders");
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  }
  return { Response, data };
}
