import { useQuery } from "@apollo/react-hooks";
import {
  getCheckOrder,
  getCheckOrderVariables,
  GQL_GET_CHECK_ORDER,
  getCheckOrder_getOrder
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getCheckOrder_getOrder;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCheckOrderQuery<
  C extends Components,
  V extends getCheckOrderVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getCheckOrder,
    getCheckOrderVariables
  >(GQL_GET_CHECK_ORDER, {
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
