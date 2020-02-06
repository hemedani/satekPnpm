import { useQuery } from "@apollo/react-hooks";
import { getWares, getWaresVariables, GQL_GET_WARES } from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
}

export function useSearchWaresQuery<
  C extends Components,
  V extends getWaresVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;

  const { loading, error, data } = useQuery<getWares, getWaresVariables>(
    GQL_GET_WARES,
    {
      variables,
      client
    }
  );
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  }
  return { Response, data };
}
