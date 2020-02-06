import { useQuery } from "@apollo/react-hooks";
import {
  getWareGroup,
  getWareGroupVariables,
  GQL_GET_WARE_GROUP,
  getWareGroup_getWareGroup
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getWareGroup_getWareGroup;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing?: React.FC<ParsingProps>;
}

export function useWareGroupQuery<
  C extends Components,
  V extends getWareGroupVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;
  if (variables.id !== "") {
    const { loading, error, data } = useQuery<
      getWareGroup,
      getWareGroupVariables
    >(GQL_GET_WARE_GROUP, {
      variables,
      client
    });
    console.log(data, "get  order...");
    console.log(error, "get  order... error");

    if (loading) {
      Response = <Loading type="DotsHide" />;
    } else if (error) {
      Response = <Error errMsg={error.message} />;
    } else if (data && Parsing) {
      Response = <Parsing data={data.getWareGroup} />;
    }
    return { Response, data };
  } else {
    Response = <></>;
    return { Response };
  }
}
