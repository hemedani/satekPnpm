import { useQuery } from "@apollo/react-hooks";
import {
  getUniversities,
  getUniversitiesVariables,
  getUniversities_getUniversities,
  GQL_GET_UNIVERSITIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getUniversities_getUniversities[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useUniversitiesQuery<
  C extends Components,
  V extends getUniversitiesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getUniversities,
    getUniversitiesVariables
  >(GQL_GET_UNIVERSITIES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUniversities} />;
  }
  return { Response, data };
}
