import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_UNITS,
  getUnitsVariables,
  getUnits_getUnits,
  getUnits
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getUnits_getUnits[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useUnitsQuery<
  C extends Components,
  V extends getUnitsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getUnits, getUnitsVariables>(
    GQL_GET_UNITS,
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
    Response = <Parsing data={data.getUnits} />;
  }
  return { Response, data };
}
