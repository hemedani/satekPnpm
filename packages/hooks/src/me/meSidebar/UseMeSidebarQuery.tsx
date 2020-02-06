import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GQL_GET_ME_SIDEBAR, meSidebar } from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
}

export function UseMeSidebarQuery<C extends Components>(
  components: C,
  client: ApolloClient<object>
) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;

  const { loading, error, data } = useQuery<meSidebar>(GQL_GET_ME_SIDEBAR, {
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  }
  return { Response, data };
}
