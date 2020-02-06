import { useQuery } from "@apollo/react-hooks";
import {
  getCityUniversities,
  getCityUniversitiesVariables,
  getCityUniversities_getCity,
  GQL_GET_CITY_UNIVERSITIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getCityUniversities_getCity;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useCityUniversitiesQuery<
  C extends Components,
  V extends getCityUniversitiesVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getCityUniversities,
    getCityUniversitiesVariables
  >(GQL_GET_CITY_UNIVERSITIES, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getCity} />;
  }
  return { Response };
}
