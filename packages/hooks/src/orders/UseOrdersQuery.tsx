import { useQuery } from "@apollo/react-hooks";
import {
  getOrders,
  getOrdersVariables,
  getOrders_getOrders_items,
  GQL_GET_ORDERS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getOrders_getOrders_items[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useOrdersQuery<
  C extends Components,
  V extends getOrdersVariables
>(components: C, variables: V, client: ApolloClient<object>, isMore?: boolean) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data, fetchMore } = useQuery<
    getOrders,
    getOrdersVariables
  >(GQL_GET_ORDERS, {
    variables,
    client
  });
  if (isMore) {
  }
  if (loading) {
    Response = (
      <>
        {/* <Parsing data={(data && data.getOrders.items) || []} /> */}
        <Loading type="DotsHide" />
      </>
    );
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  }
  // else if (networkStatus === 3) {
  //   Response = (
  //     <>
  //       <Parsing data={(data && data.getOrders.items) || []} />
  //       <Loading type="DotsHide" />
  //     </>
  //   );
  // }
  else if (data) {
    Response = <Parsing data={data.getOrders.items} />;
  }
  return { Response, data, fetchMore };
}
