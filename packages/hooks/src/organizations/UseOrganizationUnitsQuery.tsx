import { useQuery } from "@apollo/react-hooks";
import {
  getOrganizationUnits,
  getOrganizationUnitsVariables,
  getOrganizationUnits_getOrganization,
  GQL_GET_ORGANIZATION_UNITS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getOrganizationUnits_getOrganization;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrganizationUnitsQuery<
  C extends Components,
  V extends getOrganizationUnitsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrganizationUnits,
    getOrganizationUnitsVariables
  >(GQL_GET_ORGANIZATION_UNITS, {
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
  return { Response };
}
