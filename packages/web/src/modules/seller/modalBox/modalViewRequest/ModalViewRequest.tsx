import {
  useMeQuery,
  useOrderSellerQuery,
  useUpdateOrderStatusMutate
} from "@satek/hooks";
import {
  getOrderForSeller_getOrder,
  OrderStatus,
  updateOrderStatusVariables
} from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { DetailDestinationHospital } from "./component/DetailDestinationHospital";
import { DetailGoodSeller } from "./component/DetailGoodSeller";
import { DetailInfoGoodSeller } from "./component/DetailInfoGoodSeller";

interface Props extends RouteComponentProps {}

export const ModalViewRequest: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<
    updateOrderStatusVariables
  >();
  // console.log(path, "path is...");
  let { id } = useParams();
  let { from } = useParams();

  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const [orderState, setOrderState] = useState<"sent" | "reject" | "prepare">();

  const [newReq, setNewReq] = useState<boolean>(from === "newrequests");

  const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
    {
      organizationId: "",
      unitId: "",
      storeId:
        meSiteId && meSiteId.me && meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "StoreHead"
            )[0].site!.id
          : "",
      statuses: path.includes("unfinishedrequest")
        ? [OrderStatus.PreparationByStore]
        : path.includes("newrequests")
        ? [OrderStatus.pendingInStore]
        : null
    },
    client
  );
  async function handleOrder(orderState: string) {
    console.log(orderState, "hi sir...");
    let val;
    switch (orderState) {
      case "sent":
        {
          val = {
            id: id!,
            orderStatus: OrderStatus.sentByStore
          };
        }
        break;

      case "reject":
        {
          val = {
            id: id!,
            orderStatus: OrderStatus.rejectedByStore
          };
        }
        break;

      case "prepare":
        {
          val = {
            id: id!,
            orderStatus: OrderStatus.PreparationByStore
          };
        }
        break;
    }

    try {
      // val = { ...val };
      console.log(val, "...=<< at first ");

      await updateOrderStatusMutate({ variables: val });

      history.goBack();
    } catch (err) {
      console.log(val, "...=<<");
      console.log(err, "error is ....");
    }
  }
  // console.groupEnd();

  const ParseAllOrders: React.FC<{ data: getOrderForSeller_getOrder }> = ({
    data
  }) => {
    // console.log(data.status, "ya rabbb");
    return (
      <form className="modalViewRequest">
        <div className="body-modalViewRequest">
          <DetailInfoGoodSeller data={data && data} />
          <DetailGoodSeller data={data && data} />
          <DetailDestinationHospital data={data && data} />
        </div>
        <div className="box-bottom-modalViewRequest">
          <p className="text-help-modalViewRequest">
            لطفا پس از بررسی جزییات وضعیت درخواست را تعیین نمایید
          </p>
          <div className="box-button-modalViewRequest">
            <Button
              fontSize="0.8rem"
              width="7rem"
              padding=".5rem 0"
              type="sendReq"
              mainType="button"
              margin={
                data.status === OrderStatus.PreparationByStore
                  ? "0 0 0 1rem"
                  : ""
              }
              text="ارسال شد"
              onClick={() => {
                handleOrder("sent");
              }}
              // to={"/seller/newrequests"}
            />
            {data.status !== OrderStatus.PreparationByStore && (
              <Button
                fontSize="0.8rem"
                width="7rem"
                padding="0.5rem 0.1rem"
                margin="0 1rem"
                mainType="button"
                type="main"
                justifyContent="center"
                text="در حال آماده سازی"
                onClick={() => {
                  handleOrder("prepare");
                }}
                // to={"/seller/newrequests"}
              />
            )}
            {data.status !== "sentByStore" && (
              <Button
                fontSize="0.8rem"
                width="7rem"
                padding=".5rem 0"
                mainType="button"
                type="redCancel"
                margin="0 1 0 0rem"
                text="لغو درخواست"
                onClick={() => {
                  handleOrder("reject");
                }}
                // to={"/seller/newrequests"}
              />
            )}
          </div>
        </div>
      </form>
    );
  };
  const data_ = useOrderSellerQuery(
    { error: CustomError, loading: Loader, parsing: ParseAllOrders },
    { id: id! },
    client
  ).Response;

  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="مشاهده درخواست"
      modalBoxSize="medium"
      display="flex"
    >
      {id && data_}
    </ModalBox>
  );
};
