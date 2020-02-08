import {
  useMeQuery,
  useUpdateOrderStatusMutate,
  useUpdateOrderStuffStatusMutate
} from "@satek/hooks";
import {
  ChosenPayment,
  LongPayment,
  OrderStatus,
  updateOrderStatusVariables,
  updateOrderStuffStatusVariables,
  OrderSort
} from "@satek/resolvers";
import cx from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { toast } from "react-toastify";
import { client } from "../../../../Apollo";
import { ApolloVar } from "../../../../ApolloVar";
import { optionpayLong } from "../../../function/ConvertPayment";
import { Button } from "../../button/Button";
import { CustomError } from "../../customError/CustomError";
import { Loader } from "../../loader/Loader";
import { ModalBox } from "../ModalBox";
import { SortOrder } from "../../../function/SortOrder";
import { IsFastDelivery } from "../../../function/IsFastDelivery";

interface Props extends RouteComponentProps {
  nameButton: string;
  textCancel: string;
  path?: string;
  messageAccept?: string;
  AcceptLinkTo?: string;
  textHeader?: string;
  cancel?: boolean;
  accept?: boolean;
  functionInvoke?: () => void;
  messageNotification?: string;
  id?: string;
  orderDetails?: {
    isNewNum?: boolean;
    num?: number;
    timePayment?: LongPayment;
    stuffId?: string;
  };
  selectSort?: number;
  selectFastDelivery?: number;
  unit?: string;
}
export const ModalBoxSubmit: React.FC<Props> = ({
  messageAccept,
  history,
  messageNotification,
  nameButton,
  textCancel,
  functionInvoke,
  AcceptLinkTo,
  cancel,
  textHeader,
  accept,
  id,
  path,
  orderDetails,
  selectSort,
  selectFastDelivery,
  unit
}) => {
  const { stuffid } = useParams();
  const urlId = useParams<{ id: string }>();
  const { register, handleSubmit } = useForm<updateOrderStatusVariables>();

  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  // console.log(
  //     ApolloVar(
  //         path,
  //         path && path.includes("checkrequestgoods")
  //             ? OrderStatus.pendingInUnitHead
  //             : null,
  //         meSiteId
  //     ),
  //     "Apollo"
  // );
  // const { updateOrderMutate } = UseUpdateOrderMutate(
  //   ApolloVar(
  //     path,
  //     path && path.includes("checkrequestgoods")
  //       ? [OrderStatus.pendingInUnitHead]
  //       : null,
  //     meSiteId
  //   ),
  //   client
  // );
  console.log(
    Object.assign(
      ApolloVar(
        path,
        path && path.includes("checkrequestgoods")
          ? [OrderStatus.pendingInUnitHead]
          : null,
        meSiteId
      ),
      {
        unitId: unit ? unit : "",
        sort: SortOrder(selectSort),
        fastDelivery: IsFastDelivery(selectFastDelivery)
      }
    ),
    IsFastDelivery(selectFastDelivery),
    "SortOrder(selectSort)"
  );
  const {
    updateOrderStuffStatusMutate,
    result
  } = useUpdateOrderStuffStatusMutate(
    path!.includes("hospital")
      ? Object.assign(
          ApolloVar(
            path,
            path && path.includes("checkrequestgoods")
              ? [OrderStatus.pendingInUnitHead]
              : null,
            meSiteId
          ),
          {
            unitId: unit ? unit : "",
            sort: SortOrder(selectSort),
            fastDelivery: IsFastDelivery(selectFastDelivery)
          }
        )
      : ApolloVar(
          path,
          path && path.includes("checkrequestgoods")
            ? [OrderStatus.pendingInUnitHead]
            : null,
          meSiteId
        ),
    client
  );

  const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
    path!.includes("hospital")
      ? Object.assign(
          ApolloVar(
            path,
            path && path.includes("checkrequestgoods")
              ? [OrderStatus.pendingInUnitHead]
              : path && path.includes("modalvrefiy")
              ? [OrderStatus.pendingInOrganizationHead]
              : [OrderStatus.pendingInOrganizationHead],
            meSiteId
          ),
          {
            unitId: unit ? unit : "",
            sort: SortOrder(selectSort),
            fastDelivery: IsFastDelivery(selectFastDelivery)
          }
        )
      : ApolloVar(
          path,
          path && path.includes("checkrequestgoods")
            ? [OrderStatus.pendingInUnitHead]
            : path && path.includes("modalvrefiy")
            ? [OrderStatus.pendingInOrganizationHead]
            : [OrderStatus.pendingInOrganizationHead],
          meSiteId
        ),
    client
  );
  async function rejectedByUnitHead() {
    let val;
    val = {
      orderStatus: OrderStatus.rejectedByUnitHead,
      id: id!
    };
    console.log("<===data_v", val);
    const variables = val;
    try {
      const result = await updateOrderStatusMutate({ variables });
      history.push("/departmentmanager/viewrequest");
    } catch (err) {
      console.log(JSON.stringify(err), "error in detail store is ....");
      toast("خطا دارید");
    }
  }

  const onSubmit = handleSubmit(async variables => {
    if (path) {
      if (path.includes("submitnewrequest")) {
        history.push(
          path.includes("departmentmanager")
            ? `../viewrequest`
            : `../historyrequest`
        );
      } else if (path.includes("modalsetstuff")) {
        let val: updateOrderStuffStatusVariables;
        console.log(orderDetails && orderDetails.timePayment, "bedeh");
        val = {
          stuffId: stuffid ? stuffid : "",
          status: OrderStatus.pendingInOrganizationHead,
          id: id!,
          chosenPayment:
            orderDetails &&
            (orderDetails.timePayment === optionpayLong[0].value ||
              orderDetails.timePayment === undefined)
              ? ChosenPayment.Incash
              : ChosenPayment.LongPayment,
          longPayment:
            orderDetails && LongPayment[orderDetails.timePayment!]
              ? LongPayment[orderDetails.timePayment!]
              : null,
          num: orderDetails && orderDetails.num
        };
        // if (orderDetails && orderDetails.isNewNum) {
        //   const value = {
        //     num: orderDetails.num!,
        //     id: id!
        //   };
        //   await updateOrderMutate({ variables: value });
        // }
        console.log(val, "valvalvalvalvalvalvalvalvalvalvalvalvalvalvalval");
        try {
          const result = await updateOrderStuffStatusMutate({
            variables: val
          });
          history && history.push("/departmentmanager/viewrequest");
        } catch (err) {
          console.log(
            JSON.stringify(err.graphQLErrors[0].message),
            "error in detail store is ...."
          );
          toast(err.graphQLErrors[0].message);
        }
      } else if (path.includes("modalreject")) {
        let val;
        val = {
          orderStatus: OrderStatus.rejectedByUnitHead,
          id: id!,
          comment: variables.comment
        };
        try {
          const result = await updateOrderStatusMutate({
            variables: val
          });
          history.push("/departmentmanager/viewrequest");
        } catch (err) {
          console.log(JSON.stringify(err), "error in detail store is ....");
          toast("خطا دارید");
        }
      } else if (path.includes("acceptorghead")) {
        let val;
        val = {
          orderStatus: OrderStatus.pendingInStore,
          id: urlId && urlId.id
        };

        try {
          const result = await updateOrderStatusMutate({
            variables: val
          });
          history.push("/headofhospital/viewrequest");
        } catch (err) {
          console.log(JSON.stringify(err), "error in detail store is ....");
          toast("خطا دارید");
        }
      } else if (path.includes("paymentacceptorg")) {
        let val;
        val = {
          orderStatus: OrderStatus.Paid,
          id: urlId && urlId.id
        };
        try {
          const result = await updateOrderStatusMutate({
            variables: val
          });
          history.goBack();
        } catch (err) {
          console.log(JSON.stringify(err), "error in detail store is ....");
          toast("خطا دارید");
        }
      } else if (path.includes("rejectorghead")) {
        let val;
        val = {
          orderStatus: OrderStatus.rejectedByOrganizationHead,
          id: urlId && urlId.id,
          comment: variables.comment
        };
        try {
          const result = await updateOrderStatusMutate({
            variables: val
          });
          history.push("/headofhospital/viewrequest");
        } catch (err) {
          console.log(JSON.stringify(err), "error in detail store is ....");
          toast("خطا دارید");
        }
      }
    }
  });

  return (
    <ModalBox
      history={history}
      headerName={textHeader ? textHeader : "ثبت موفق درخواست"}
      display="flex"
    >
      <form className="form-container-ModalBoxSubmit" onSubmit={onSubmit}>
        <div className="containerSubmit-ModalBoxSubmit">
          <div className={cx("circle-icon-ModalBoxSubmit", {})}>
            <span
              className={cx({
                "icon-color-ModalBoxSubmit": cancel,
                ic_info: !cancel,
                // ic_info_circle: !cancel,
                ic_accept: accept,
                "icon-color-default-ModalBoxSubmit": !cancel,
                "icon-color-green-default-ModalBoxSubmit": accept
              })}
            ></span>
          </div>
          <h4
            className={cx("message-Submit-ModalBoxSubmit", {
              "message-cancel-Submit-ModalBoxSubmit": cancel,
              "message-accept-Submit-ModalBoxSubmit": accept
            })}
          >
            {messageAccept}
          </h4>
          <p className="notification-Submit-ModalBoxSubmit">
            {messageNotification}
          </p>
        </div>
        {path && path.includes("modalreject") && (
          <textarea
            name="comment"
            defaultValue="دلیل رد درخواست"
            ref={register}
          ></textarea>
        )}
        {path && path.includes("rejectorghead") && (
          <textarea
            name="comment"
            defaultValue="دلیل رد درخواست"
            ref={register}
          ></textarea>
        )}
        <div className="boxButton-ModalBoxSubmit">
          <Button
            text={nameButton}
            type="main"
            className="btn-ModalBoxSubmit"
            justifyContent="center"
            fontSize="0.9rem"
            isLoading={result.loading}
            padding="0.5rem 1rem"
            mainType="submit"
          />
          <p
            onClick={() => history.goBack()}
            className="textCancel-ModalBoxSubmit"
          >
            {textCancel}
          </p>
        </div>
      </form>
    </ModalBox>
  );
};
