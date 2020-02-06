import { useQuery } from "@apollo/react-hooks";
import {
  getCategoryUnits,
  getCategoryUnitsVariables,
  getCategoryUnits_getCategory,
  GQL_GET_CATEGORY_UNITS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getCategoryUnits_getCategory;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCategoryCategoriesQuery<
  C extends Components,
  V extends getCategoryUnitsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getCategoryUnits,
    getCategoryUnitsVariables
  >(GQL_GET_CATEGORY_UNITS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getCategory} />;
  }
  return { Response };
}
