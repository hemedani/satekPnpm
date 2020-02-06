import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_ORGANIZATION_USERS,
  getOrganization_getOrganization_userToSites,
  getOrganization_getOrganization,
  getOrganizationVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getOrganization_getOrganization_userToSites[] | null;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrganizationUsersQuery<
  C extends Components,
  V extends getOrganizationVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrganization_getOrganization,
    getOrganizationVariables
  >(GQL_GET_ORGANIZATION_USERS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.userToSites} />;
  }
  return { Response };
}
