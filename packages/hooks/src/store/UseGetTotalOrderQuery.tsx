import { useQuery } from "@apollo/react-hooks";
import {
  getTotalOrder,
  getTotalOrderVariables,
  GQL_GET_STORE_TOTAL_ORDER,
  getTotalOrder_getStore
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getTotalOrder_getStore;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseGetTotalOrderQuery<
  C extends Components,
  V extends getTotalOrderVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getTotalOrder,
    getTotalOrderVariables
  >(GQL_GET_STORE_TOTAL_ORDER, {
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
  return { Response, data };
}
