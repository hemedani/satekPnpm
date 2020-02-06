import { useQuery } from "@apollo/react-hooks";
import {
  getWareTypes,
  getWareTypesVariables,
  getWareTypes_getWareTypes,
  GQL_GET_WARE_TYPES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWareTypes_getWareTypes[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareTypesQuery<
  C extends Components,
  V extends getWareTypesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareTypes,
    getWareTypesVariables
  >(GQL_GET_WARE_TYPES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWareTypes} />;
  }
  return { Response };
}
