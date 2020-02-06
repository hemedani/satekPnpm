import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_WARE_CLASSES,
  getWareClassesVariables,
  getWareClasses_getWareClasses,
  getWareClasses
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getWareClasses_getWareClasses[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareClassesQuery<
  C extends Components,
  V extends getWareClassesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getWareClasses,
    getWareClassesVariables
  >(GQL_GET_WARE_CLASSES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getWareClasses} />;
  }
  return { Response, data };
}
