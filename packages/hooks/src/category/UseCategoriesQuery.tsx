import { useQuery } from "@apollo/react-hooks";
import {
  getCategories,
  getCategoriesVariables,
  getCategories_getCategories,
  GQL_GET_CATEGORIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getCategories_getCategories[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCategoriesQuery<
  C extends Components,
  V extends getCategoriesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getCategories,
    getCategoriesVariables
  >(GQL_GET_CATEGORIES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getCategories} />;
  }
  return { Response, data };
}
