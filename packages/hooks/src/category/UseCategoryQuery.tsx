import { useQuery } from "@apollo/react-hooks";
import {
  getCategory,
  getCategoryVariables,
  getCategory_getCategory,
  GQL_GET_CATEGORY
} from "@satek/resolvers";
import ApolloClient from "apollo-client/ApolloClient";
import React from "react";

interface ParsingProps {
  data: getCategory_getCategory;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCategoryQuery<
  C extends Components,
  V extends getCategoryVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getCategory, getCategoryVariables>(
    GQL_GET_CATEGORY,
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
    Response = <Parsing data={data.getCategory} />;
  }
  return { Response, data };
}
