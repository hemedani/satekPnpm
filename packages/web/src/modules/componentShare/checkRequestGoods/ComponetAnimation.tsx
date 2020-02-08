import React from "react";
import { Button } from "../button/Button";
import {
  getStuffs_getStuffs_items,
  updateOrderStuffStatusVariables,
  OrderStatus,
  LongPayment,
  ChosenPayment
} from "@satek/resolvers";
import { optionpayLong } from "../../function/ConvertPayment";
import { toast } from "react-toastify";
import { ApolloVar } from "../../../ApolloVar";
import { useUpdateOrderStuffStatusMutate, useMeQuery } from "@satek/hooks";
import PathToStatus from "../../../PathToStatus";
import { client } from "../../../Apollo";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";

interface Props {
  setAnimation: (val: string) => void;
  animation: string;
  index: string;
  data: getStuffs_getStuffs_items;
  orderId: string;
  timePayment?: LongPayment | null;
  history?: any;
  path?: string;
}

export const ComponentAnimation: React.FC<Props> = ({
  setAnimation,
  index,
  animation,
  data,
  orderId,
  timePayment,
  history,
  path
}) => {
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { updateOrderStuffStatusMutate } = useUpdateOrderStuffStatusMutate(
    ApolloVar(path, PathToStatus(path!)!, meSiteId),
    client
  );
  console.log(PathToStatus(path!)!, "sd", path);
  async function buyStuff() {
    let val: updateOrderStuffStatusVariables;

    val = {
      stuffId: data.id,
      id: orderId,
      status: OrderStatus.pendingInOrganizationHead,
      chosenPayment: timePayment
        ? timePayment === optionpayLong[0].value || timePayment === undefined
          ? ChosenPayment.Incash
          : ChosenPayment.LongPayment
        : null,
      longPayment: timePayment
        ? LongPayment[timePayment!]
          ? LongPayment[timePayment!]
          : null
        : null
    };
    console.log(val, "val", timePayment);
    try {
      const result = await updateOrderStuffStatusMutate({ variables: val });
      setAnimation!("");
      history && history.goBack();
    } catch (err) {
      toast(err.graphQLErrors[0].message);
    }
  }

  return (
    <div
      className={
        index === animation ? "componentanimation" : "componentanimation-none"
      }
    >
      <p className="text-componentanimation">آیا مطمن هستید؟</p>
      <div className="btn-componentanimation">
        <Button
          fontSize="0.7rem"
          padding={"0.5rem 0.7rem 0.5rem 0.7rem"}
          text="بله"
          justifyContent="center"
          width="45%"
          mainType="button"
          onClick={buyStuff}
          type="sendReq"
        />
        <Button
          fontSize="0.7rem"
          padding={"0.5rem 0.7rem 0.5rem 0.7rem"}
          justifyContent="center"
          text="خیر"
          width="45%"
          mainType="button"
          type="redCancel"
        />
      </div>
    </div>
  );
};
