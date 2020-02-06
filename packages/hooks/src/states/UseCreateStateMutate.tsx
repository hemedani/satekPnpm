import { useMutation } from "@apollo/react-hooks";
import {
  createStateVariables,
  createState,
  getStatesVariables,
  GQL_CREATE_STATE,
  GQL_GET_STATES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateStateMutate<V extends getStatesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createStateMutate, result] = useMutation<
    createState,
    createStateVariables
  >(GQL_CREATE_STATE, {
    client,
    update: (store, { data: createStateMutate }) => {
      if (!variables.document) {
        variables.document = "";
      }
      const { getStates }: any = store.readQuery({
        query: GQL_GET_STATES,
        variables
      });
      store.writeQuery({
        query: GQL_GET_STATES,
        variables,
        data: { getStates: [createStateMutate!.createState, ...getStates] }
      });
    }
  });
  return {
    createStateMutate,
    result
  };
}
