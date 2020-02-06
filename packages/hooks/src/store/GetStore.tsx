import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GQL_GET_STORE, getStore, getStoreVariables } from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
}

export function useStoreQuery<
  C extends Components,
  V extends getStoreVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;

  const { loading, error, data } = useQuery<getStore>(GQL_GET_STORE, {
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
