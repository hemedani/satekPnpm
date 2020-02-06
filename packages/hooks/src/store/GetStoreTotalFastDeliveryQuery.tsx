import { useQuery } from "@apollo/react-hooks";
import {
  getStoreTotalFastDelivery,
  getStoreTotalFastDeliveryVariables,
  GQL_GET_STORE_TOTAL_FAST_DELIVERY,
  getStoreTotalFastDelivery_getStore
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStoreTotalFastDelivery_getStore;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStoreTotalFastDeliveryQuery<
  C extends Components,
  V extends getStoreTotalFastDeliveryVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStoreTotalFastDelivery,
    getStoreTotalFastDeliveryVariables
  >(GQL_GET_STORE_TOTAL_FAST_DELIVERY, {
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
