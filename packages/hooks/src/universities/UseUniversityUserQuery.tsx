import { useQuery } from "@apollo/react-hooks";
import {
  getUniversityUserVariables,
  getUniversityUser_getUniversity,
  getUniversityUser_getUniversity_userToSites,
  GQL_GET_UNIVERSITY_USERS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import React from "react";

interface ParsingProps {
  data: getUniversityUser_getUniversity_userToSites[] | null;
}

interface ErrorProps {
  errMsg: string;
}

interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function UseUniversityUsersQuery<
  C extends Components,
  V extends getUniversityUserVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<
    getUniversityUser_getUniversity,
    getUniversityUserVariables
  >(GQL_GET_UNIVERSITY_USERS, {
    variables,
    client
  });
  if (loading) {
    Response = <Loading type="DotsHide" />;
  } else if (error) {
    Response = <Error errMsg={error.message} />;
  } else if (data) {
    Response = <Parsing data={data.userToSites} />;
  }
  return { Response, data };
}
