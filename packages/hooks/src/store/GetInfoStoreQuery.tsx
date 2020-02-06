import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_INFO_STORE,
  getInfoStore,
  getInfoStore_getStore,
  getInfoStoreVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getInfoStore_getStore;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetInfoStoreQuery<
  C extends Components,
  V extends getInfoStoreVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getInfoStore>(GQL_GET_INFO_STORE, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStore} />;
  }

  return { Response };
}
