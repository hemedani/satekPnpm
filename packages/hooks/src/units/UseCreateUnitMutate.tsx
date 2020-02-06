import { useMutation } from "@apollo/react-hooks";
import {
  createUnit,
  createUnitVariables,
  getUnitsVariables,
  GQL_CREATE_UNIT,
  GQL_GET_UNITS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateUnitMutate<V extends getUnitsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createUnitMutate, result] = useMutation<
    createUnit,
    createUnitVariables
  >(GQL_CREATE_UNIT, {
    client,
    update: (store, { data: createUnitMutate }) => {
      if (createUnitMutate!.createUnit.organization!.id) {
        variables.organizationId = createUnitMutate!.createUnit.organization!.id;
      }
      const { getUnits }: any = store.readQuery({
        query: GQL_GET_UNITS,
        variables
      });
      store.writeQuery({
        query: GQL_GET_UNITS,
        variables,
        data: { getUnits: [createUnitMutate!.createUnit, ...getUnits] }
      });
    }
  });
  return {
    createUnitMutate,
    result
  };
}
