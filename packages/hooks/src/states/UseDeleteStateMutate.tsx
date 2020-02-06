import { useMutation } from "@apollo/react-hooks";
import {
  deleteState,
  deleteStateVariables,
  GQL_DELETE_STATE,
  GQL_GET_STATES,
  getStatesVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useDeleteStateMutate<V extends getStatesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  let id = "";
  const setId = (_id: string) => {
    id = _id;
  };
  const [deleteStateMutate, result] = useMutation<
    deleteState,
    deleteStateVariables
  >(GQL_DELETE_STATE, {
    client,
    update: (store, { data: deleteStateMutate }) => {
      if (!variables.document) {
        variables.document = "";
      }
      const { getStates }: any = store.readQuery({
        query: GQL_GET_STATES,
        variables
      });
      let _states = getStates.filter((state: any) => state.id !== id);
      store.writeQuery({
        query: GQL_GET_STATES,
        variables,
        data: {
          getStates: [..._states]
        }
      });
    }
  });
  return {
    deleteStateMutate,
    result,
    setId
  };
}
