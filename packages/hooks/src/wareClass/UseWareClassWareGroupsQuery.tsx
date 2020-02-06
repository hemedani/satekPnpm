import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_WARE_CLASS_WARE_GROUPS,
  getWareClassWareGroups,
  getWareClassWareGroupsVariables,
  getWareClassWareGroups_getWareClass
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getWareClassWareGroups_getWareClass;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareClassWareGroupsQuery<
  C extends Components,
  V extends getWareClassWareGroupsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareClassWareGroups,
    getWareClassWareGroupsVariables
  >(GQL_GET_WARE_CLASS_WARE_GROUPS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWareClass} />;
  }
  return { Response };
}
