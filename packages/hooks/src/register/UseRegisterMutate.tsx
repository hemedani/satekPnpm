import { useMutation } from "@apollo/react-hooks";
import {
  getUsersVariables,
  GQL_GET_USERS,
  GQL_REGISTER,
  registerStaff,
  registerStaffVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useRegisterMutate<V extends getUsersVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [registerMutate, result] = useMutation<
    registerStaff,
    registerStaffVariables
  >(GQL_REGISTER, {
    client,
    update: (store, { data: registerMutate }) => {
      const { getUsers }: any = store.readQuery({
        query: GQL_GET_USERS,
        variables
      });
      store.writeQuery({
        query: GQL_GET_USERS,
        variables,
        data: { getUsers: [registerMutate!.registerStaff, ...getUsers] }
      });
    }
  });
  return {
    registerMutate,
    result
  };
}
