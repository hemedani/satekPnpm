import { useQuery } from "@apollo/react-hooks";
import ApolloClient from "apollo-client/ApolloClient";
import React from "react";
import {
  getAllowedWareGroupsForUnit_getUnit_allowedWareGroups,
  getAllowedWareGroupsForUnitVariables,
  GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT,
  getAllowedWareGroupsForUnit
} from "@satek/resolvers";

interface ErrorProps {
  errMsg: string;
}

interface ParsingProps {
  data: getAllowedWareGroupsForUnit_getUnit_allowedWareGroups[] | null;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useUnitAllowedWareGroupsQuery<
  C extends Components,
  V extends getAllowedWareGroupsForUnitVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  const { loading, error, data } = useQuery<
    getAllowedWareGroupsForUnit,
    getAllowedWareGroupsForUnitVariables
  >(GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUnit.allowedWareGroups} />;
  }
  return { Response, data };
}
