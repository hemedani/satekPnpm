import { useQuery } from "@apollo/react-hooks";
import {
  getUnitVariables,
  getUnit_getUnit,
  getUnit,
  GQL_GET_UNIT
} from "@satek/resolvers";
import ApolloClient from "apollo-client/ApolloClient";
import React from "react";

interface ParsingProps {
  data: getUnit_getUnit;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseUnitQuery<C extends Components, V extends getUnitVariables>(
  components: C,
  variables: V,
  client: ApolloClient<object>
) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getUnit, getUnitVariables>(
    GQL_GET_UNIT,
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
    Response = <Parsing data={data.getUnit} />;
  }
  return { Response, data };
}
