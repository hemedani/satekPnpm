import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  getStates,
  getStatesVariables,
  getStates_getStates,
  GQL_GET_STATES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ParsingProps {
  data: getStates_getStates[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useStatesQuery<
  C extends Components,
  V extends getStatesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getStates, getStatesVariables>(
    GQL_GET_STATES,
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
    Response = <Parsing data={data.getStates} />;
  }
  return { Response, data };
}
