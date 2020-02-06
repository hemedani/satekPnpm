import { useQuery } from "@apollo/react-hooks";
import {
  getUniversityVariables,
  getUniversity_getUniversity,
  getUniversity,
  GQL_GET_UNIVERSITY
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getUniversity_getUniversity;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseUniversityQuery<
  C extends Components,
  V extends getUniversityVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getUniversity,
    getUniversityVariables
  >(GQL_GET_UNIVERSITY, {
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
  return { Response, data };
}
