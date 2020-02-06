import { useMutation } from "@apollo/react-hooks";
import {
  updateUnit,
  updateUnitVariables,
  getUnitsVariables,
  GQL_UPDATE_UNIT,
  GQL_GET_UNITS
} from "@satek/resolvers";
import ApolloClient from "apollo-client/ApolloClient";

export function useUpdateUnitMutate<V extends getUnitsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateUnitMutate, result] = useMutation<
    updateUnit,
    updateUnitVariables
  >(GQL_UPDATE_UNIT, {
    client,
    update: (store, { data: updateUnitMutate }) => {
      const { getUnits }: any = store.readQuery({
        query: GQL_GET_UNITS,
        variables
      });
      let items;
      if (getUnits) {
        items = getUnits;
        items.splice(
          items.findIndex((v: any) => v.id === updateUnitMutate!.updateUnit.id),
          1
        );
        items.push(updateUnitMutate!.updateUnit);
        store.writeQuery({
          query: GQL_GET_UNITS,
          variables,
          data: {
            getUnits: items
          }
        });
      }
    }
  });
  return {
    updateUnitMutate,
    result
  };
}
