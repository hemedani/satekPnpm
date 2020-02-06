import { useQuery } from "@apollo/react-hooks";
import {
  GetCategoriesHeadOfHospital,
  GetCategoriesHeadOfHospitalVariables,
  GetCategoriesHeadOfHospital_getCategories,
  GQL_GET_CATEGORIES_HEAD_OF_HOSPITAL
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: GetCategoriesHeadOfHospital_getCategories[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCategoriesHeadOfHospitalQuery<
  C extends Components,
  V extends GetCategoriesHeadOfHospitalVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    GetCategoriesHeadOfHospital,
    GetCategoriesHeadOfHospitalVariables
  >(GQL_GET_CATEGORIES_HEAD_OF_HOSPITAL, {
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
  return { Response };
}
