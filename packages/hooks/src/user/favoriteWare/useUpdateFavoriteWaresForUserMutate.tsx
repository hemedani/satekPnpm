import { useMutation } from "@apollo/react-hooks";
import {
  UpdateFavoriteWareUserVariables,
  UpdateFavoriteWareUser,
  getFavoriteWaresDetailsUserVariables,
  GQL_UPDATE_FAVORITE_WARES_USER,
  GQL_GET_ALLOWED_WARES_DETAILS_USER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateFavoriteWaresForUserMutate<
  V extends getFavoriteWaresDetailsUserVariables
>(variables: V, client: ApolloClient<object>) {
  const [UpdateFavoriteWareUserMutate, result] = useMutation<
    UpdateFavoriteWareUser,
    UpdateFavoriteWareUserVariables
  >(GQL_UPDATE_FAVORITE_WARES_USER, {
    client,
    update: (store, { data: UpdateFavoriteWareUserMutate }) => {
      const { getUser }: any = store.readQuery({
        query: GQL_GET_ALLOWED_WARES_DETAILS_USER,
        variables
      });
      console.log(getUser, "getUser favorite");
      console.log(
        UpdateFavoriteWareUserMutate!.updateUser!,
        "getUser favorite"
      );
      if (getUser) {
        store.writeQuery({
          query: GQL_GET_ALLOWED_WARES_DETAILS_USER,
          variables,
          data: {
            getUser: {
              ...getUser,
              favoriteWares: UpdateFavoriteWareUserMutate!.updateUser!
                .favoriteWares,
              favoriteWaresIds: UpdateFavoriteWareUserMutate!.updateUser!
                .favoriteWaresIds
            }
          }
        });
      }
      console.log(getUser, "getUser favorite final");
    }
  });
  return {
    UpdateFavoriteWareUserMutate,
    result
  };
}
