import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_WARE_GROUPS,
  getWareGroupsVariables,
  getWareGroups_getWareGroups,
  getWareGroups
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getWareGroups_getWareGroups[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareGroupsQuery<
  C extends Components,
  V extends getWareGroupsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareGroups,
    getWareGroupsVariables
  >(GQL_GET_WARE_GROUPS, {
    variables,
    client
  });
  console.log(data && data);
  console.log(variables);
  console.log(error && error);
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWareGroups} />;
  }
  return { Response, data };
}
