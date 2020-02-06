import { useMutation } from "@apollo/react-hooks";
import {
  updateInfoSeller,
  updateInfoSellerVariables,
  GQL_UPDATE_INFO_SELLER,
  GQL_GET_INFO_SELLER
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateInfoSellerMutate<V extends updateInfoSellerVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateInfoSellerMutate, result] = useMutation<
    updateInfoSeller,
    updateInfoSellerVariables
  >(GQL_UPDATE_INFO_SELLER, {
    client,
    update: (store, { data: updateInfoSellerMutate }) => {
      const { getStore }: any = store.readQuery({
        query: GQL_GET_INFO_SELLER,
        variables
      });
      console.log(getStore, "vataseas", updateInfoSellerMutate!.updateStore);
      // console.log(
      //   { getStore: updateInfoSellerMutate!.updateStore },
      //   "sadssssssxcjvhjxch"
      // );
      // console.log(
      //   { getStore: { ...getStore, ...updateInfoSellerMutate!.updateStore } },
      //   "qwertyuioasdfghjklzxcvbnm,"
      // );
      console.log(
        {
          storeDetails: Object.assign(
            getStore.storeDetails,
            updateInfoSellerMutate!.updateStore!.storeDetails
          ),
          ...getStore
        },
        "ertyuikb"
      );
      // console.log(getStore, "oj");

      if (getStore) {
        store.writeQuery({
          query: GQL_GET_INFO_SELLER,
          variables,
          data: {
            getStore: {
              storeDetails: Object.assign(
                getStore.storeDetails,
                updateInfoSellerMutate!.updateStore!.storeDetails
              ),
              ...getStore
            }
          }
        });
      }
    }
  });

  return {
    updateInfoSellerMutate,
    result
  };
}
