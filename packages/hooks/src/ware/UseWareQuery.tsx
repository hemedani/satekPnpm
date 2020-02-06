import { useQuery } from "@apollo/react-hooks";
import {
  getWare,
  getWareVariables,
  GQL_GET_WARE,
  getWare_getWare
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getWare_getWare;
}
interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing?: React.FC<ParsingProps>;
}

export function useWareQuery<C extends Components, V extends getWareVariables>(
  components: C,
  variables: V,
  client: ApolloClient<object>
) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  if (variables.id !== "") {
    const { loading, error, data } = useQuery<getWare, getWareVariables>(
      GQL_GET_WARE,
      {
        variables,
        client
      }
    );
    console.log(data, "get  order...");
    console.log(error, "get  order... error");

    if (loading) {
      Response = <Loading type="DotsHide" />;
    } else if (error) {
      Response = <Error errMsg={error.message} />;
    } else if (data && Parsing) {
      Response = <Parsing data={data.getWare} />;
    }
    return { Response, data };
  } else {
    Response = <></>;
    return { Response };
  }
}
