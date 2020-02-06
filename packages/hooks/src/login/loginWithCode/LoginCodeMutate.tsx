import { useMutation } from "@apollo/react-hooks";
import { loginVariables, login, GQL_LOGIN } from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useLoginCodeMutate<V extends loginVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  client.resetStore();
  const [loginCodeMutate, result] = useMutation<login, loginVariables>(
    GQL_LOGIN,
    {
      client,
      variables
    }
  );
  return {
    loginCodeMutate,
    result
  };
}
