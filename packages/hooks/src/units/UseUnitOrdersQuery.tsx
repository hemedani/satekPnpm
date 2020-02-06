import { useQuery } from "@apollo/react-hooks";
import {
  getUnitOrders,
  getUnitOrdersVariables,
  getUnitOrders_getUnit_orders,
  GQL_GET_UNIT_ORDERS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getUnitOrders_getUnit_orders[] | null;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useUnitOrdersQuery<
  C extends Components,
  V extends getUnitOrdersVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getUnitOrders,
    getUnitOrdersVariables
  >(GQL_GET_UNIT_ORDERS, {
    variables,
    client
  });
  // console.log(data, "get organization orders");
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUnit.orders} />;
  }
  return { Response };
}
