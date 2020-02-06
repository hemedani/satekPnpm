import { useMutation } from "@apollo/react-hooks";
import {
  createCategory,
  createCategoryVariables,
  getCategoriesVariables,
  GQL_CREATE_CATEGORY,
  GQL_GET_CATEGORIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateCategoryMutate<V extends getCategoriesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createCategoryMutate, result] = useMutation<
    createCategory,
    createCategoryVariables
  >(GQL_CREATE_CATEGORY, {
    client,
    update: (store, { data: createCategoryMutate }) => {
      if (createCategoryMutate!.createCategory.organization!.id) {
        variables.organizationId = createCategoryMutate!.createCategory.organization!.id;
      }
      const { getCategories }: any = store.readQuery({
        query: GQL_GET_CATEGORIES,
        variables
      });
      store.writeQuery({
        query: GQL_GET_CATEGORIES,
        variables,
        data: {
          getCategories: [
            createCategoryMutate!.createCategory,
            ...getCategories
          ]
        }
      });
    }
  });
  return {
    createCategoryMutate,
    result
  };
}
