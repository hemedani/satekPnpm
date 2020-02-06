import { useQuery } from "@apollo/react-hooks";
import {
  GetCategoryUnitsForHospital,
  GetCategoryUnitsForHospitalVariables,
  GetCategoryUnitsForHospital_getCategory_units,
  GQL_GET_CATEGORY_UNITS_FOR_HOSPITAL
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: GetCategoryUnitsForHospital_getCategory_units[];
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCategoryUnitsForHospitalQuery<
  C extends Components,
  V extends GetCategoryUnitsForHospitalVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    GetCategoryUnitsForHospital,
    GetCategoryUnitsForHospitalVariables
  >(GQL_GET_CATEGORY_UNITS_FOR_HOSPITAL, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getCategory.units!} />;
  }
  return { Response };
}
