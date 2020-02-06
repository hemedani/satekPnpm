import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_INFO_SELLER,
  getInfoSeller,
  getInfoSeller_getStore,
  getInfoSellerVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getInfoSeller_getStore;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetInfoSellerQuery<
  C extends Components,
  V extends getInfoSellerVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getInfoSeller>(
    GQL_GET_INFO_SELLER,
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
    Response = <Parsing data={data.getStore} />;
  }

  return { Response };
}
