import { useMutation } from "@apollo/react-hooks";
import {
  getOrdersVariables,
  GQL_GET_ORDERS,
  GQL_UPDATE_ORDER_STUFF_STATUS,
  updateOrderStuffStatus,
  updateOrderStuffStatusVariables,
  updateOrderStuffStatus_updateOrderStuff
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import { variableOrder } from "./variableOrder";

export function useUpdateOrderStuffStatusMutate<V extends getOrdersVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateOrderStuffStatusMutate, result] = useMutation<
    updateOrderStuffStatus,
    updateOrderStuffStatusVariables
  >(GQL_UPDATE_ORDER_STUFF_STATUS, {
    client,
    update: (store, { data: updateOrderStuffStatusMutate }) => {
      Object.keys(variableOrder).map((value, index) => {
        if (!variables[value]) {
          if (Object.values(variableOrder)[index] === null) {
            variables[value] = null;
          } else {
            variables[value] = "";
          }
        }
      });

      console.log(variables, "variables before");
      const { getOrders }: any = store.readQuery({
        query: GQL_GET_ORDERS,
        variables
      });
      console.log(getOrders.items, "<====orders flkgfkjgfkf");

      if (getOrders) {
        const { items } = getOrders;
        const index = items.findIndex(
          (v: updateOrderStuffStatus_updateOrderStuff) => {
            return (
              v.id === updateOrderStuffStatusMutate!.updateOrderStuff.id &&
              variables.statuses &&
              !variables.statuses.includes(v.status)
            );
          }
        );

        if (index !== -1) {
          items.splice(index, 1);
        }
        console.log(items, "items...");
        store.writeQuery({
          query: GQL_GET_ORDERS,
          variables,
          data: {
            getOrders: {
              items,
              __typename: "OrdersResponse"
            }
          }
        });
        console.log(getOrders, "<???????? result");
      }
      // if(getOrganizationHistory){
      //   store.writeQuery({
      //     query: GQL_GET_ORGANIZATION_HISTORY,
      //     variables,
      //     data: {
      //       getOrganizationHistory: {
      //         ...getOrganizationHistory,
      //         orders: [
      //           ...getOrganizationHistory.orders,
      //           updateOrderStatusMutate!.updateOrderStatus
      //         ]
      //       }
      //     }
      //   });
      // }
    }
  });
  return {
    updateOrderStuffStatusMutate,
    result
  };
}
