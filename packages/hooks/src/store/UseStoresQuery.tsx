import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  getStores,
  getStoresVariables,
  getStores_getStores,
  GQL_GET_STORES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getStores_getStores[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useStoresQuery<
  C extends Components,
  V extends getStoresVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getStores, getStoresVariables>(
    GQL_GET_STORES,
    {
      variables,
      client
    }
  );
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStores} />;
  }
  return { Response };
}
