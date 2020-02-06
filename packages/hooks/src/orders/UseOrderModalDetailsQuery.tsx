import { useQuery } from "@apollo/react-hooks";
import {
  getOrderModalDetails,
  getOrderVariables,
  GQL_GET_ORDER_MODAL_DETAILS,
  getOrderModalDetails_getOrder
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getOrderModalDetails_getOrder;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrderModalDetailsQuery<
  C extends Components,
  V extends getOrderVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  if (variables.id) {
    const { loading, error, data } = useQuery<
      getOrderModalDetails,
      getOrderVariables
    >(GQL_GET_ORDER_MODAL_DETAILS, {
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
  } else {
    Response = <Loading type="DotsHide" />;
  }
  return { Response };
}
