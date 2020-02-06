import { useQuery } from "@apollo/react-hooks";
import {
  getUniversityOrganizations,
  getUniversityOrganizationsVariables,
  getUniversityOrganizations_getUniversity,
  GQL_GET_UNIVERSITY_ORGANIZATIONS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getUniversityOrganizations_getUniversity;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useUniversityOrganizationsQuery<
  C extends Components,
  V extends getUniversityOrganizationsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getUniversityOrganizations,
    getUniversityOrganizationsVariables
  >(GQL_GET_UNIVERSITY_ORGANIZATIONS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUniversity} />;
  }
  return { Response };
}
