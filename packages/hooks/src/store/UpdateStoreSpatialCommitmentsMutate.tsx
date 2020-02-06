import { useMutation } from "@apollo/react-hooks";
import {
  updateStoreSpatialCommitments,
  updateStoreSpatialCommitmentsVariables,
  GQL_UPDATE_SPATIAL_COMMITMENTS,
  GQL_GET_STORE_SPATIAL_COMMITMENTS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateStoreSpatialCommitmentsMutate<
  V extends updateStoreSpatialCommitmentsVariables
>(variables: V, client: ApolloClient<object>) {
  const [updateSpatialCommitmentsMutate, result] = useMutation<
    updateStoreSpatialCommitments,
    updateStoreSpatialCommitmentsVariables
  >(GQL_UPDATE_SPATIAL_COMMITMENTS, {
    client,
    update: (store, { data: updateSpatialCommitmentsMutate }) => {
      console.log(
        variables,
        "vataseas",
        updateSpatialCommitmentsMutate!.updateStore
      );
      console.log(
        { getStore: updateSpatialCommitmentsMutate!.updateStore },
        "sadssssssxcjvhjxch"
      );
      const { getStore }: any = store.readQuery({
        query: GQL_GET_STORE_SPATIAL_COMMITMENTS,
        variables
      });
      console.log(
        { getStore: { ...updateSpatialCommitmentsMutate!.updateStore } },
        "qwertyuioasdfghjklzxcvbnm,"
      );
      console.log(getStore, "qwertyuioasdfghjklzxcvbnm,");

      if (getStore) {
        store.writeQuery({
          query: GQL_GET_STORE_SPATIAL_COMMITMENTS,
          variables,
          data: {
            getStore: {
              getStore,
              ...updateSpatialCommitmentsMutate!.updateStore
            }
          }
        });
      }
    }
  });

  return {
    updateSpatialCommitmentsMutate,
    result
  };
}
