import { useMutation } from "@apollo/react-hooks";
import {
  updateUniversity,
  updateUniversityVariables,
  getUniversitiesVariables,
  GQL_UPDATE_UNIVERSITY,
  GQL_GET_UNIVERSITIES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseUpdateUniversityMutate<V extends getUniversitiesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateUniversityMutate, result] = useMutation<
    updateUniversity,
    updateUniversityVariables
  >(GQL_UPDATE_UNIVERSITY, {
    client,
    update: (store, { data: updateUniversityMutate }) => {
      const { getUniversities }: any = store.readQuery({
        query: GQL_GET_UNIVERSITIES,
        variables
      });

      let items;
      if (getUniversities) {
        items = getUniversities;
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateUniversityMutate!.updateUniversity.id
          ),
          1
        );
        items.push(updateUniversityMutate!.updateUniversity);
        store.writeQuery({
          query: GQL_GET_UNIVERSITIES,
          variables,
          data: {
            getUniversities: items
          }
        });
      }
    }
  });
  return {
    updateUniversityMutate,
    result
  };
}
