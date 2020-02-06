import { useQuery } from "@apollo/react-hooks";
import {
  getStuffs,
  getStuffsVariables,
  GQL_GET_STUFFS,
  getStuffs_getStuffs_items
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStuffs_getStuffs_items[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStuffsQuery<
  C extends Components,
  V extends getStuffsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  const { loading, error, data } = useQuery<getStuffs, getStuffsVariables>(
    GQL_GET_STUFFS,
    {
      variables,
      client
    }
  );
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStuffs.items} />;
  }
  return { Response, data };
}
