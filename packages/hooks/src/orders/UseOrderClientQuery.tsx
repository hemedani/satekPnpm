import { useQuery } from "@apollo/react-hooks";
import {
  getOrderForClient,
  getOrderVariables,
  GQL_GET_ORDER_CLIENT,
  getOrderForClient_getOrder
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getOrderForClient_getOrder;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrderClientQuery<
  C extends Components,
  V extends getOrderVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getOrderForClient,
    getOrderVariables
  >(GQL_GET_ORDER_CLIENT, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getOrder} />;
  }
  return { Response, data };
}
