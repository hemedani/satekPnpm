import { useMutation } from "@apollo/react-hooks";
import {
  deleteCityVariables,
  deleteCity,
  GQL_DELETE_CITY,
  GQL_GET_CITIES,
  getStatesVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useDeleteCityMutate<V extends getStatesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  let id = "";
  const setId = (_id: string) => {
    id = _id;
  };
  const [deleteCityMutate, result] = useMutation<
    deleteCity,
    deleteCityVariables
  >(GQL_DELETE_CITY, {
    client,
    update: (store, { data: deleteCityMutate }) => {
      if (!variables.document) {
        variables.document = "";
      }
      const { getCities }: any = store.readQuery({
        query: GQL_GET_CITIES,
        variables
      });
      let _cities = getCities.filter((city: any) => city.id !== id);
      store.writeQuery({
        query: GQL_GET_CITIES,
        variables,
        data: { getCities: [..._cities] }
      });
    }
  });
  return {
    deleteCityMutate,
    result,
    setId
  };
}
