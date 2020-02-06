import { useMutation } from "@apollo/react-hooks";
import {
  createUniversity,
  createUniversityVariables,
  getUniversitiesVariables,
  GQL_CREATE_UNIVERSITY,
  GQL_GET_UNIVERSITIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateUniversityMutate<V extends getUniversitiesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createUniversityMutate, result] = useMutation<
    createUniversity,
    createUniversityVariables
  >(GQL_CREATE_UNIVERSITY, {
    client,
    update: (store, { data: createUniversityMutate }) => {
      const { getUniversities }: any = store.readQuery({
        query: GQL_GET_UNIVERSITIES,
        variables
      });
      store.writeQuery({
        query: GQL_GET_UNIVERSITIES,
        variables,
        data: {
          getUniversities: [
            createUniversityMutate!.createUniversity,
            ...getUniversities
          ]
        }
      });
    }
  });
  return {
    createUniversityMutate,
    result
  };
}
