import { useMutation } from "@apollo/react-hooks";
import {
  createOrganization,
  createOrganizationVariables,
  getOrganizationsVariables,
  GQL_CREATE_ORGANIZATION,
  GQL_GET_ORGANIZATIONS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateOrganizationMutate<
  V extends getOrganizationsVariables
>(variables: V, client: ApolloClient<object>) {
  const [createOrganizationMutate, result] = useMutation<
    createOrganization,
    createOrganizationVariables
  >(GQL_CREATE_ORGANIZATION, {
    client,
    update: (store, { data: createOrganizationMutate }) => {
      const { getOrganizations }: any = store.readQuery({
        query: GQL_GET_ORGANIZATIONS,
        variables
      });
      store.writeQuery({
        query: GQL_GET_ORGANIZATIONS,
        variables,
        data: {
          getOrganizations: [
            createOrganizationMutate!.createOrganization,
            ...getOrganizations
          ]
        }
      });
    }
  });
  return {
    createOrganizationMutate,
    result
  };
}
