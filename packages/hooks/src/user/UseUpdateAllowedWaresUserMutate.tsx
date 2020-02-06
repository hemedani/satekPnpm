import { useMutation } from "@apollo/react-hooks";
import {
  updateAllowedWaresForUserVariables,
  updateAllowedWaresForUser,
  getAllowedWaresUserVariables,
  GQL_UPDATE_ALLOWED_WARES_FOR_USER,
  GQL_GET_ALLOWED_WARES_USER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateAllowedWaresForUserMutate<
  V extends getAllowedWaresUserVariables
>(variables: V, client: ApolloClient<object>) {
  const [updateAllowedWaresForUserMutate, result] = useMutation<
    updateAllowedWaresForUser,
    updateAllowedWaresForUserVariables
  >(GQL_UPDATE_ALLOWED_WARES_FOR_USER, {
    client,
    update: (store, { data: updateAllowedWaresForUserMutate }) => {
      const { getAllowedWaresForUser }: any = store.readQuery({
        query: GQL_GET_ALLOWED_WARES_USER,
        variables
      });
      if (getAllowedWaresForUser) {
        store.writeQuery({
          query: GQL_GET_ALLOWED_WARES_USER,
          variables,
          data: {
            getAllowedWaresForUser: [
              updateAllowedWaresForUserMutate!.updateAllowedWaresForUser,
              ...getAllowedWaresForUser
            ]
          }
        });
      }
    }
  });
  return {
    updateAllowedWaresForUserMutate,
    result
  };
}
