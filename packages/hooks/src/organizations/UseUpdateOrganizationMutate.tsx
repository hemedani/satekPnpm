import { useMutation } from "@apollo/react-hooks";
import {
  updateOrganization,
  updateOrganizationVariables,
  getOrganizationsVariables,
  GQL_UPDATE_ORGANIZATION,
  GQL_GET_ORGANIZATIONS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateOrganizationMutate<
  V extends getOrganizationsVariables
>(variables: V, client: ApolloClient<object>) {
  const [updateOrganizationMutate, result] = useMutation<
    updateOrganization,
    updateOrganizationVariables
  >(GQL_UPDATE_ORGANIZATION, {
    client,
    update: (store, { data: updateOrganizationMutate }) => {
      const { getOrganizations }: any = store.readQuery({
        query: GQL_GET_ORGANIZATIONS,
        variables
      });
      let items;
      if (getOrganizations) {
        items = getOrganizations;
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateOrganizationMutate!.updateOrganization.id
          ),
          1
        );
        items.push(updateOrganizationMutate!.updateOrganization);
        store.writeQuery({
          query: GQL_GET_ORGANIZATIONS,
          variables,
          data: {
            getOrganizations: items
          }
        });
      }
    }
  });
  return {
    updateOrganizationMutate,
    result
  };
}
