import { useQuery } from "@apollo/react-hooks";
import {
  getWareType,
  getWareTypeVariables,
  getWareType_getWareType,
  GQL_GET_WARE_TYPE
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWareType_getWareType;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareTypeQuery<
  C extends Components,
  V extends getWareTypeVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  console.log(variables, "variable");
  if (variables.id !== "") {
    const { loading, error, data } = useQuery<
      getWareType,
      getWareTypeVariables
    >(GQL_GET_WARE_TYPE, {
      variables,
      client
    });
    if (loading) {
      Response = <Loading type="DotsHide" />;
    } else if (error) {
      Response = <Error errMsg={error.message} />;
    } else if (data) {
      Response = <Parsing data={data.getWareType} />;
    }
    return { Response };
  } else {
    Response = <Loading type="DotsHide" />;
    return { Response };
  }
}
