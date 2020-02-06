import { useMutation } from "@apollo/react-hooks";
import {
  updateStuffVariables,
  updateStuff,
  GQL_UPDATE_STUFF,
  getStuffsForStoreVariables,
  GQL_GET_STUFFS_FOR_STORE,
  StuffSort
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseUpdateStuffMutate<V extends getStuffsForStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateStuffMutate, result] = useMutation<
    updateStuff,
    updateStuffVariables
  >(GQL_UPDATE_STUFF, {
    client,
    update: (store, { data: updateStuffMutate }) => {
      if (!variables.wareDocument) {
        variables.wareDocument = "";
      }
      if (!variables.sort) {
        variables.sort = StuffSort.Price;
      }
      const { getStuffs }: any = store.readQuery({
        query: GQL_GET_STUFFS_FOR_STORE,
        variables
      });
      console.log(getStuffs, "getStuffs", updateStuffMutate);
      if (getStuffs) {
        const { items } = getStuffs;
        console.log(items, "items before");
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateStuffMutate!.updateStuff.id
          ),
          1,
          updateStuffMutate!.updateStuff
        );
        console.log(items, "items after");
        store.writeQuery({
          query: GQL_GET_STUFFS_FOR_STORE,
          variables,
          data: {
            getStuffs: {
              items: items,
              __typename: "PaginatedStuffResponse"
            }
          }
        });
      }
    }
  });
  return {
    updateStuffMutate,
    result
  };
}
