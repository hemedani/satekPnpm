import { useQuery } from "@apollo/react-hooks";
import {
  getStuffEdit,
  getStuffEditVariables,
  GQL_GET_STUFF_EDIT,
  getStuffEdit_getStuff
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getStuffEdit_getStuff;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStuffEditQuery<
  C extends Components,
  V extends getStuffEditVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getStuffEdit,
    getStuffEditVariables
  >(GQL_GET_STUFF_EDIT, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getStuff} />;
  }
  return { Response, data };
}
