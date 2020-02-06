import { useMutation } from "@apollo/react-hooks";
import {
  getCategoriesVariables,
  GQL_GET_CATEGORIES,
  GQL_UPDATE_UNIT,
  updateCategory,
  updateCategoryVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client/ApolloClient";

export function useUpdateCategoryMutate<V extends getCategoriesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateCategoryMutate, result] = useMutation<
    updateCategory,
    updateCategoryVariables
  >(GQL_UPDATE_UNIT, {
    client,
    update: (store, { data: updateCategoryMutate }) => {
      const { getCategories }: any = store.readQuery({
        query: GQL_GET_CATEGORIES,
        variables
      });
      let items;
      if (getCategories) {
        items = getCategories;
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateCategoryMutate!.updateCategory.id
          ),
          1
        );
        items.push(updateCategoryMutate!.updateCategory);
        store.writeQuery({
          query: GQL_GET_CATEGORIES,
          variables,
          data: {
            getCategories: items
          }
        });
      }
    }
  });
  return {
    updateCategoryMutate,
    result
  };
}
