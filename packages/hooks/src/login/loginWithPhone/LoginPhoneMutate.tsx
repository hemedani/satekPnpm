import { useMutation } from "@apollo/react-hooks";
import {
  loginRequestVariables,
  loginRequest,
  GQL_LOGIN_REQUEST
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useLoginRequest<V extends loginRequestVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  client.resetStore();
  const [LoginRequestMutate, result] = useMutation<
    loginRequest,
    loginRequestVariables
  >(GQL_LOGIN_REQUEST, {
    client,
    variables
  });
  return {
    LoginRequestMutate,
    result
  };
}
