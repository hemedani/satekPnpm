import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_STATES,
  getStates,
  getStatesVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
}

export function useStateForStoreQuery<
  C extends Components,
  V extends getStatesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;

  const { loading, error, data } = useQuery<getStates>(GQL_GET_STATES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  }
  return { Response, data };
}
