import React from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  createOrder,
  createOrderVariables,
  getOrdersVariables,
  GQL_CREATE_ORDER,
  GQL_GET_ORDERS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";
import { variableOrder } from "./variableOrder";

// @ts-ignore
export function useCreateOrderMutate<V extends getOrdersVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createOrderMutate, result] = useMutation<
    createOrder,
    createOrderVariables
  >(GQL_CREATE_ORDER, {
    client,
    update: (store, { data: createOrderMutate }) => {
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
      const { getOrders }: any = store.readQuery({
        query: GQL_GET_ORDERS,
        variables
      });
      if (getOrders) {
        store.writeQuery({
          query: GQL_GET_ORDERS,
          variables,
          data: {
            getOrders: {
              items: [...getOrders.items, createOrderMutate!.createOrder],
              __typename: "OrdersResponse"
            }
          }
        });
      }
    }
  });
  if (2 !== 2) {
    return <div></div>;
  }
  return { createOrderMutate, result };
}
