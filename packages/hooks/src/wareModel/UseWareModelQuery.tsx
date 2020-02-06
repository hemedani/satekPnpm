import { useQuery } from "@apollo/react-hooks";
import {
  getWareModel,
  getWareModelVariables,
  getWareModel_getWareModel,
  GQL_GET_WARE_MODEL
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWareModel_getWareModel;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useWareModelQuery<
  C extends Components,
  V extends getWareModelVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  if (variables.id !== "") {
    const { loading, error, data } = useQuery<
      getWareModel,
      getWareModelVariables
    >(GQL_GET_WARE_MODEL, {
      variables,
      client
    });
    if (loading) {
      Response = <Loading type="DotsHide" />;
    } else if (error) {
      Response = <Error errMsg={error.message} />;
    } else if (data) {
      Response = <Parsing data={data.getWareModel} />;
    }
    return { Response };
  } else {
    Response = <></>;
    return { Response };
  }
}
