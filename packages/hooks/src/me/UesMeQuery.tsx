import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GQL_GET_ME, me_me, me } from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: me_me;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing?: React.FC<ParsingProps>;
}

export function useMeQuery<C extends Components>(
  components: C,
  client: ApolloClient<object>
) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<me>(GQL_GET_ME, {
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data && Parsing) {
    Response = <Parsing data={data.me!} />;
  }
  return { Response, data };
}
