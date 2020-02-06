import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GQL_GET_STORE_SPATIAL_COMMITMENTS,
  getStoreSpatialCommitments,
  getStoreSpatialCommitments_getStore,
  getStoreSpatialCommitmentsVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

interface ErrorProps {
  errMsg: string;
}
interface ParsingProps {
  data: getStoreSpatialCommitments_getStore;
}
interface Components {
  error: React.FC<ErrorProps>;
  loading: React.FC<{ type: "DotsHide" | "DotsShake" | "Circle" }>;
  parsing: React.FC<ParsingProps>;
}

export function useGetStoreSpatialCommitmentsQuery<
  C extends Components,
  V extends getStoreSpatialCommitmentsVariables
>(components: C, variables: V, client: ApolloClient<object>) {
  let Response: React.ReactElement | null = null;
  const Error = components.error;
  const Loading = components.loading;
  const Parsing = components.parsing;

  const { loading, error, data } = useQuery<getStoreSpatialCommitments>(
    GQL_GET_STORE_SPATIAL_COMMITMENTS,
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
    console.log("egbashdgasd", variables.id);
    Response = <Parsing data={data.getStore} />;
  }

  return { Response };
}
