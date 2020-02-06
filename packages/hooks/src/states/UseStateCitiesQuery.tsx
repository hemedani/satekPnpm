import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_STATE_CITIES,
  getStateCities,
  getStateCitiesVariables,
  getStateCities_getState
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getStateCities_getState;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useStateCitiesQuery<
  C extends Components,
  V extends getStateCitiesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStateCities,
    getStateCitiesVariables
  >(GQL_GET_STATE_CITIES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getState} />;
  }
  return { Response };
}
