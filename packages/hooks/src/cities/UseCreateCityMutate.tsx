import { useMutation } from "@apollo/react-hooks";
import {
  createCityVariables,
  createCity,
  GQL_CREATE_CITY,
  GQL_GET_CITIES,
  getCitiesVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export const useCreateCityMutate = (
  variables: getCitiesVariables,
  client: ApolloClient<object>
) => {
  const [createCityMutate, result] = useMutation<
    createCity,
    createCityVariables
  >(GQL_CREATE_CITY, {
    client,
    update: (store, { data: createCityMutate }) => {
      if (!variables.document) {
        variables.document = "";
      }
      const { getCities }: any = store.readQuery({
        query: GQL_GET_CITIES,
        variables
      });
      store.writeQuery({
        query: GQL_GET_CITIES,
        variables,
        data: { getCities: [createCityMutate!.createCity, ...getCities] }
      });
    }
  });
  return {
    createCityMutate,
    result
  };
};
