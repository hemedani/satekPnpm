import { useQuery } from "@apollo/react-hooks";
import {
  getWareStuffs,
  getWareStuffsVariables,
  getWareStuffs_getWare,
  GQL_GET_WARE_STUFF
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWareStuffs_getWare;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareStuffsQuery<
  C extends Components,
  V extends getWareStuffsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareStuffs,
    getWareStuffsVariables
  >(GQL_GET_WARE_STUFF, {
    variables,
    client
  });
  // console.log(data, "hi..im from stuff hook");
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWare} />;
  }
  return { Response };
}
