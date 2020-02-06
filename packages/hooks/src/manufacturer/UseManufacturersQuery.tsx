import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_MANUFACTURERS,
  getManufacturersVariables,
  getManufacturers_getManufacturers,
  getManufacturers
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getManufacturers_getManufacturers[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useManufacturersQuery<
  C extends Components,
  V extends getManufacturersVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getManufacturers,
    getManufacturersVariables
  >(GQL_GET_MANUFACTURERS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getManufacturers} />;
  }
  return { Response };
}
