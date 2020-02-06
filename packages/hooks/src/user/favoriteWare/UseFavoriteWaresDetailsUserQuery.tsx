import { useQuery } from "@apollo/react-hooks";
import {
  getFavoriteWaresDetailsUser,
  getFavoriteWaresDetailsUserVariables,
  getFavoriteWaresDetailsUser_getUser,
  GQL_GET_FAVORITE_WARES_DETAILS_USER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getFavoriteWaresDetailsUser_getUser;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useFavoriteWaresDetailsUserQuery<
  C extends Components,
  V extends getFavoriteWaresDetailsUserVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getFavoriteWaresDetailsUser,
    getFavoriteWaresDetailsUserVariables
  >(GQL_GET_FAVORITE_WARES_DETAILS_USER, {
    variables,
    client
  });
  console.log(data, "this is data....");
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.getUser} />;
  }
  return { Response };
}
