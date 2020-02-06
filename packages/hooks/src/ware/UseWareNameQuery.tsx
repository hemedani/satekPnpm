import { useQuery } from "@apollo/react-hooks";
import {
  getWareName,
  getWareNameVariables,
  getWareName_getWare,
  GQL_GET_WARE_NAME
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWareName_getWare;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareNameQuery<
  C extends Components,
  V extends getWareNameVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getWareName, getWareNameVariables>(
    GQL_GET_WARE_NAME,
    {
      variables,
      client
    }
  );
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
