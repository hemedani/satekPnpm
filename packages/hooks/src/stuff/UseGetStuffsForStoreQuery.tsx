import { useQuery } from "@apollo/react-hooks";
import {
  getStuffsForStore,
  getStuffsForStoreVariables,
  GQL_GET_STUFFS_FOR_STORE,
  getStuffsForStore_getStuffs_items
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStuffsForStore_getStuffs_items[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStuffsForStoreQuery<
  C extends Components,
  V extends getStuffsForStoreVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStuffsForStore,
    getStuffsForStoreVariables
  >(GQL_GET_STUFFS_FOR_STORE, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStuffs.items} />;
    console.log(data, "data");
  }
  return { Response, data };
}
