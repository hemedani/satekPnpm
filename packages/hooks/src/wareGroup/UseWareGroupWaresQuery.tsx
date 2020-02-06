import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_WARE_GROUP_WARES,
  getWareGroupWares,
  getWareGroupWaresVariables,
  getWareGroupWares_getWareGroup
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getWareGroupWares_getWareGroup;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareGroupWaresQuery<
  C extends Components,
  V extends getWareGroupWaresVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareGroupWares,
    getWareGroupWaresVariables
  >(GQL_GET_WARE_GROUP_WARES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWareGroup} />;
  }
  return { Response };
}
