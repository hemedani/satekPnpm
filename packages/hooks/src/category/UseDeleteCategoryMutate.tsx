import { useMutation } from "@apollo/react-hooks";
import {
  deleteCategory,
  deleteCategoryVariables,
  GQL_DELETE_CATEGORY,
  GQL_GET_CATEGORIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useDeleteCatagoryMutate<V extends deleteCategoryVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  let id = "";
  const setId = (_id: string) => {
    id = _id;
  };
  const [deleteCategoryMutate, result] = useMutation<
    deleteCategory,
    deleteCategoryVariables
  >(GQL_DELETE_CATEGORY, {
    client,
    update: (store, { data: deleteCategoryMutate }) => {
      const { getStates }: any = store.readQuery({
        query: GQL_GET_CATEGORIES,
        variables
      });
      let _categories = getStates.filter((category: any) => category.id !== id);
      store.writeQuery({
        query: GQL_GET_CATEGORIES,
        variables,
        data: {
          getStates: [..._categories]
        }
      });
    }
  });
  return {
    deleteCategoryMutate,
    result,
    setId
  };
}
