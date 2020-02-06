import { useQuery } from "@apollo/react-hooks";
import {
  getStuffsStore,
  getStuffsStoreVariables,
  GQL_GET_STUFFS_STORE,
  getStuffsStore_getStore_stuffs
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStuffsStore_getStore_stuffs[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStuffStoreQuery<
  C extends Components,
  V extends getStuffsStoreVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStuffsStore,
    getStuffsStoreVariables
  >(GQL_GET_STUFFS_STORE, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStore.stuffs!} />;
  }
  return { Response };
}
