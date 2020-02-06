import { useQuery } from "@apollo/react-hooks";
import {
  getUser,
  getUserVariables,
  getUser_getUser,
  GQL_GET_USER
} from "@satek/resolvers";
import ApolloClient from "apollo-client/ApolloClient";
import React from "react";

interface ParsingProps {
  data: getUser_getUser;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseUserQuery<C extends Components, V extends getUserVariables>(
  components: C,
  variables: V,
  client: ApolloClient<object>
) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getUser, getUserVariables>(
    GQL_GET_USER,
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
    Response = <Parsing data={data.getUser} />;
  }
  return { Response, data };
}
