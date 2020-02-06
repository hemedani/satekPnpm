import { useMutation } from "@apollo/react-hooks";
import {
  getOrdersVariables,
  GQL_UPDATE_ORDER,
  updateOrder,
  updateOrderVariables,
  GQL_GET_ORDERS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import { variableOrder } from "./variableOrder";

export function useUpdateOrderMutate<V extends getOrdersVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateOrderMutate, result] = useMutation<
    updateOrder,
    updateOrderVariables
  >(GQL_UPDATE_ORDER, {
    client,
    update: (store, { data: updateOrderStuffStatusMutate }) => {
      Object.keys(variableOrder).map((value, index) => {
        if (!variables[value]) {
          // @ts-ignore
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

      if (getOrders) {
        const { items } = getOrders;
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateOrderStuffStatusMutate!.updateOrder.id
          ),
          1
        );
        store.writeQuery({
          query: GQL_GET_ORDERS,
          variables,
          data: {
            getOrders: {
              items: [...items, updateOrderStuffStatusMutate!.updateOrder],
              __typename: "OrdersResponse"
            }
          }
        });
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
  return { updateOrderMutate, result };
}
