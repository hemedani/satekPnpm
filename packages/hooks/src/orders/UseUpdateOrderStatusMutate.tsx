import { useMutation } from "@apollo/react-hooks";
import {
  getOrdersVariables,
  GQL_UPDATE_ORDER_STATUS,
  updateOrderStatus,
  updateOrderStatusVariables,
  GQL_GET_ORDERS,
  updateOrderStatus_updateOrderStatus
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import { variableOrder } from "./variableOrder";

export function useUpdateOrderStatusMutate<V extends getOrdersVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateOrderStatusMutate, result] = useMutation<
    updateOrderStatus,
    updateOrderStatusVariables
  >(GQL_UPDATE_ORDER_STATUS, {
    client,
    update: (store, { data: updateOrderStatusMutate }) => {
      console.log(variables, "kob");
      Object.keys(variableOrder).map((value, index) => {
        console.log(value, "salm", !variables[value], variables[value]);
        if (
          variables[value] === undefined ||
          variables[value] === null ||
          variables[value] === ""
        ) {
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
      console.log(
        getOrders,
        "getOrders before",
        updateOrderStatusMutate!.updateOrderStatus
      );

      if (getOrders) {
        const { items } = getOrders;
        const index = items.findIndex(
          (v: updateOrderStatus_updateOrderStatus) => {
            console.log(
              v.id === updateOrderStatusMutate!.updateOrderStatus.id &&
                variables.statuses &&
                !variables.statuses.includes(v.status),
              updateOrderStatusMutate,
              v,
              "data is"
            );
            return (
              v.id === updateOrderStatusMutate!.updateOrderStatus.id &&
              variables.statuses &&
              !variables.statuses.includes(v.status)
            );
          }
        );

        console.log(items, "before", getOrders, index);
        if (index !== -1) {
          items.splice(index, 1);
        }
        console.log(items, "after");
        store.writeQuery({
          query: GQL_GET_ORDERS,
          variables,
          data: {
            getOrders: {
              items: items,
              __typename: "OrdersResponse"
            }
          }
        });
        console.log(getOrders, "after getOrders");
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
    updateOrderStatusMutate,
    result
  };
}
