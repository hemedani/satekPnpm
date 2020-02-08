import { useQuery } from "@apollo/react-hooks";
import {
  getStoreOrders,
  getStoreOrdersVariables,
  getStoreOrders_getStore_orders,
  GQL_GET_STORE_ORDER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStoreOrders_getStore_orders[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseOrdersStoreQuery<
  C extends Components,
  V extends getStoreOrdersVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStoreOrders,
    getStoreOrdersVariables
  >(GQL_GET_STORE_ORDER, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStore.orders!} />;
  }
  return { Response };
}