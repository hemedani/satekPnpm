import { useMutation } from "@apollo/react-hooks";
import {
  createUserToSite,
  createUserToSiteVariables,
  getUserToSitesVariables,
  GQL_CREATE_USER_TO_SITE,
  GQL_GET_USER_TO_SITES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateUserToSiteMutate<V extends getUserToSitesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createUserToSiteMutate, result] = useMutation<
    createUserToSite,
    createUserToSiteVariables
  >(GQL_CREATE_USER_TO_SITE, {
    client,
    update: (store, { data: createUserToSiteMutate }) => {
      const { getUserToSites }: any = store.readQuery({
        query: GQL_GET_USER_TO_SITES,
        variables
      });
      if (getUserToSites) {
        store.writeQuery({
          query: GQL_GET_USER_TO_SITES,
          variables,
          data: {
            getUserToSites: [
              createUserToSiteMutate!.createUserToSite,
              ...getUserToSites
            ]
          }
        });
      }
    }
  });
  return {
    createUserToSiteMutate,
    result
  };
}
