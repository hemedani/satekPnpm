import {
  useCheckOrderQuery,
  useMeQuery,
  useUpdateOrderStatusMutate
} from "@satek/hooks";
import {
  CheckByFinance,
  ExpertCommentStatus,
  FinanceCommentStatus,
  getCheckOrder_getOrder,
  me_me,
  OrderStatus,
  updateOrderStatusVariables,
  UserRole
} from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../Apollo";
import { ApolloVar } from "../../../ApolloVar";
import { StatusLevel } from "../../../Status";
import { Button } from "../../componentShare/button/Button";
import { DetailGoodsAndApplicant } from "../../componentShare/checkRequestGoods/DetailGoodsAndApplicant";
import { FilterCheckRequest } from "../../componentShare/checkRequestGoods/FilterCheckRequest";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import {
  FiledLevelRequest,
  LevelRequest
} from "../../componentShare/levelRequest/LevelRequest";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBoxSubmit } from "../../componentShare/modalBox/modalboxSubmit/ModalBoxSubmit";
import { ConvertDateToShamsi } from "../../function/ConvertDate";
import { OpinionHeadHospital } from "./component/OpinionHeadHospital";

interface Props extends RouteComponentProps {}

export const CheckRequestGood: React.FC<Props> = ({
  history,
  location: { pathname },
  match: { path, params }
}) => {
  const { id }: any = params;
  const [accept, setAccept] = useState(false);
  const [status, setStatus] = useState<OrderStatus>();
  const [timePayment, setTimePayment] = useState();

  const ParseComment: React.FC<{ data: me_me }> = ({ data }) => {
    const { register, handleSubmit, watch, setValue } = useForm<
      updateOrderStatusVariables
    >();
    const goBack = () => (history ? history.goBack() : null);

    const onSubmit = handleSubmit(async variables => {
      console.log("Damet garm ", variables);
      if (path.includes("expert")) {
        if (!variables.checkByExpert && !variables.checkByFinance) {
          return;
        }
        if (status) {
          variables.orderStatus = status;
        } else {
          return;
        }
      } else if (path.includes("headofhospital")) {
        variables.orderStatus = accept
          ? OrderStatus.pendingInStore
          : OrderStatus.rejectedByOrganizationHead;
      }
      variables.id = id;
      if (data && data && data.userToSites) {
        if (data.userToSites[0].role === UserRole.FinanceHead) {
          variables.commentByFinanceStatus = FinanceCommentStatus.responded;
        } else if (data.userToSites[0].role === UserRole.Expert) {
          variables.commentByExpertStatus = ExpertCommentStatus.responded;
        }
      }

      console.log("variables....lol", variables);
      try {
        const result = await updateOrderStatusMutate({ variables });

        history.goBack();
      } catch (e) {
        console.log(JSON.stringify(e), "error is..");
      }
    });
    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
        onSubmit={onSubmit}
      >
        <div className="opinionBox-checkRequestGoods-headHospital">
          <Container
            margin="0 1rem"
            padding="0 0.5rem"
            height="100%"
            childStyle={{ minHeight: "5rem" }}
            width="90%"
            isBordered="false"
            title="نظر شما درباره ی خرید این کالا"
          >
            <div className="box-radio-checkRequestGoods">
              <div className="radio-checkRequestGoods">
                <input
                  ref={register}
                  type="radio"
                  name={
                    data.userToSites &&
                    data.userToSites[0].role.includes("Finance")
                      ? "checkByFinance"
                      : "checkByExpert"
                  }
                  value={CheckByFinance.Valid}
                />
                <p className="text-radio-checkRequestGoods">
                  مورد تایید کارشناس
                </p>
              </div>
              <div className="radio-checkRequestGoods">
                <input
                  ref={register}
                  type="radio"
                  name={
                    data.userToSites &&
                    data.userToSites[0].role.includes("Finance")
                      ? "checkByFinance"
                      : "checkByExpert"
                  }
                  value={CheckByFinance.Invalid}
                />
                <p className="text-radio-checkRequestGoods">
                  عدم تایید کارشناس
                </p>
              </div>
            </div>
            <textarea
              placeholder="لطفا نظر خود را درباره خرید این کالا برای مقام تشخیص بنویسید"
              ref={register}
              name="comment"
              className="textareaOpinion-checkRequestGoods-headHospital"
            />
          </Container>
        </div>
        <div className="buttonBox-checkRequestGoods-headHospital">
          <div className="container-checkRequestGoods-headHospital">
            <Button
              margin="0 0 0 0.7rem"
              type="main"
              width="40%"
              isLoading={result.loading}
              justifyContent="center"
              mainType="submit"
              // onClick={() => setAccept(true)}
              text={"ارسال نظر"}
            />
            <Button
              type="cancel"
              margin="0 0.7rem 0 0"
              width="40%"
              onClick={goBack}
              text={"بازگشت"}
            />
          </div>
        </div>
      </form>
    );
  };

  const { Response, data } = useMeQuery(
    { error: CustomError, loading: Loader, parsing: ParseComment },

    client
  );
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { updateOrderStatusMutate, result } = useUpdateOrderStatusMutate(
    ApolloVar(
      path,
      path && path.includes("headofhospital/checkrequestgood")
        ? [OrderStatus.pendingInOrganizationHead]
        : null,
      meSiteId
    ),
    client
  );

  // const onSubmit = handleSubmit(async variables => {
  //   console.log("Damet garm ", variables);
  //   if (path.includes("expert")) {
  //     variables.orderStatus = OrderStatus.pendingInOrganizationHead;
  //     // if (!variables.checkByExpert && !variables.checkByFinance) {
  //     //     console.log(
  //     //         variables.checkByFinance,
  //     //         "Damet ",
  //     //         variables.checkByExpert
  //     //     );
  //     //     console.log(
  //     //         !variables.checkByExpert,
  //     //         "Damet ",
  //     //         !variables.checkByFinance
  //     // //     );
  //     //     return;
  //     // }
  //   } else if (path.includes("headofhospital")) {
  //     variables.orderStatus = accept
  //       ? OrderStatus.pendingInStore
  //       : OrderStatus.rejectedByOrganizationHead;
  //   }
  //   variables.id = id;
  //   if (data && data.me && data.me.userToSites) {
  //     if (data.me.userToSites[0].role === UserRole.FinanceHead) {
  //       variables.commentByFinanceStatus = FinanceCommentStatus.responded;
  //     } else if (data.me.userToSites[0].role === UserRole.Expert) {
  //       variables.commentByExpertStatus = ExpertCommentStatus.responded;
  //     }
  //   }

  //   console.log("variables....lol", variables);
  //   try {
  //     // const result = await updateOrderStatusMutate({ variables });
  //     // console.log(result, "result is...");
  //     history.goBack();
  //   } catch (e) {
  //     console.log(JSON.stringify(e), "error is..");
  //   }
  // });
  const ParseCheckRequest: React.FC<{ data: getCheckOrder_getOrder }> = ({
    data
  }) => {
    // setFoundItem(String(data.length));
    const status: FiledLevelRequest[] = [
      { accept: "pendingInUnitHead" },
      {
        accept: "pendingInOrganizationHead",
        reject: "rejectedByUnitHead"
      },
      { accept: "pendingInStore", reject: "rejectedByOrganizationHead" },
      { accept: "PreparationByStore", reject: "rejectedByStore" },
      { accept: "sentByStore" },
      {
        accept: "receivedByEmployee pendingForPay",
        reject: "rejectedByEmployee"
      },
      { accept: "Paid", reject: "rejectedForPay" },
      { accept: "other" }
    ];
    const persianStatus = status.map(sta => {
      let perSta: FiledLevelRequest = { accept: "", reject: "" };
      if (sta.reject) {
        perSta.accept = StatusLevel(sta.accept);
        perSta.reject = StatusLevel(sta.reject);
      } else {
        perSta.accept = StatusLevel(sta.accept);
      }
      return perSta;
    });
    if (data) {
      setStatus(data.status);

      return (
        <>
          <div className="detail-checkRequestGoods-depManger">
            <DetailGoodsAndApplicant
              nameWare={data.ware!.name}
              price={data.ware!.price}
              priceFinal={data.ware!.price * data.num}
              nameRequestor={data.requestorUser!.name}
              historySubmit={
                path.includes("headofhospital/paymentconfirmationfinal")
                  ? null
                  : ConvertDateToShamsi(data.createdAt.split("T")[0])
              }
              historyCost={true}
              storeName={
                path.includes("headofhospital/paymentconfirmationfinal")
                  ? data.stuff && data.stuff.store && data.stuff.store.name
                  : null
              }
              confirmPayment={path.includes(
                "headofhospital/paymentconfirmationfinal"
              )}
            />
          </div>

          {!path.includes("headofhospital/paymentconfirmationfinal") && (
            <div className="filter-checkRequestGoods-depManger">
              <FilterCheckRequest
                path={path}
                hasLine={true}
                setPayment={setTimePayment}
                timePayment={timePayment}
                dataOrder={data}
                nameCompany={data.ware!.manufacturername}
                historyExpiration={ConvertDateToShamsi(
                  data.stuff!.expiration.split("T")[0]
                )}
                numberRequest={data.num}
                history
                type={
                  path.includes("expert")
                    ? "justShowDetail"
                    : "justFilterPaymentMethod"
                }
              />
            </div>
          )}

          {!path.includes("expert") && (
            <>
              <div className="opinionBox-checkRequestGoods-headHospital opinionBox-space-checkRequestGoods-headHospital">
                <OpinionHeadHospital
                  width="49%"
                  height="95%"
                  id={id && id}
                  comment={data.commentByExpert ? data.commentByExpert : ""}
                  showBtn={
                    !path.includes("headofhospital/paymentconfirmationfinal")
                  }
                  type={
                    data.commentByExpertStatus === ExpertCommentStatus.responded
                      ? "receive"
                      : data.commentByExpertStatus ===
                        ExpertCommentStatus.notSendFor
                      ? "send"
                      : "sended"
                  }
                  role="Expert"
                  title="نظر کارشناس تجهیزات پزشکی"
                  textButton="ارسال درخواست برای تجهیزات پزشکی"
                />
                <OpinionHeadHospital
                  width="49%"
                  id={id && id}
                  comment={data.commentByFinance ? data.commentByFinance : ""}
                  showBtn={
                    !path.includes("headofhospital/paymentconfirmationfinal")
                  }
                  type={
                    data.commentByFinanceStatus ===
                    FinanceCommentStatus.responded
                      ? "receive"
                      : data.commentByFinanceStatus ===
                        FinanceCommentStatus.notSendFor
                      ? "send"
                      : "sended"
                  }
                  height="95%"
                  role="Finance"
                  title="نظر کارشناس تامین اعتبار"
                />
              </div>
              {path.includes("headofhospital/paymentconfirmationfinal") && (
                <LevelRequest
                  Items={persianStatus}
                  reject={data.status.includes("reject")}
                  level={status.findIndex(
                    val =>
                      val.accept.includes(data.status) ||
                      val.reject === data.status
                  )}
                />
              )}
              <div className="buttonBox-checkRequestGoods-headHospital">
                <div className="container-checkRequestGoods-headHospital">
                  <Button
                    margin="0 0 0 0.7rem"
                    type={path.includes("expert") ? "main" : "sendReq"}
                    width="10rem"
                    justifyContent="center"
                    padding="0.5rem 0"
                    mainType="button"
                    to={
                      path.includes("headofhospital/paymentconfirmationfinal")
                        ? `${path.split(":")[0]}${id}/paymentacceptorg`
                        : `${path.split(":")[0]}${id}/acceptorghead`
                    }
                    onClick={() => setAccept(true)}
                    text={
                      path.includes("expert") ? "ارسال نظر" : "تایید درخواست"
                    }
                  />
                  {!path.includes(
                    "headofhospital/paymentconfirmationfinal"
                  ) && (
                    <Button
                      type={path.includes("expert") ? "cancel" : "redCancel"}
                      to={`${path.split(":")[0]}${id}/rejectorghead`}
                      margin="0 0.7rem 0 0"
                      width="10rem"
                      padding="0.5rem 0"
                      text={path.includes("expert") ? "بازگشت" : "رد درخواست"}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      );
    }
    return null;
  };
  const Resp = useCheckOrderQuery(
    { error: CustomError, loading: Loader, parsing: ParseCheckRequest },
    {
      id: id
    },
    client
  );
  const yuy =
    Resp.data &&
    Resp.data.getOrder &&
    Resp.data.getOrder.ware &&
    Resp.data.getOrder.ware.name;

  return (
    <ContainerClient
      colorHeader="blue"
      history={history}
      textHeader={"بررسی درخواست" + " " + yuy}
    >
      {Resp.Response}

      {path.includes("expert") && Response
      // <div className="opinionBox-checkRequestGoods-headHospital">
      //     <Container
      //         padding="0 5rem"
      //         height="100%"
      //         childStyle={{ minHeight: "5rem" }}
      //         width="100%"
      //         title="نظر شما درباره ی خرید این کالا"
      //     >
      //         <textarea
      //             placeholder="لطفا نظر خود را درباره خرید این کالا برای مقام تشخیص بنویسید"
      //             ref={register}
      //             name="comment"
      //             className="textareaOpinion-checkRequestGoods-headHospital"
      //         />
      //     </Container>
      // </div>
      }
      <Route
        exact
        path={`${path}/paymentacceptorg`}
        render={props => (
          <ModalBoxSubmit
            nameButton="ثبت نهایی درخواست"
            messageAccept="از ثبت درخواست خود مطمئن هستید؟"
            messageNotification=""
            textHeader="ثبت تایید درخواست"
            textCancel="بازگشت"
            {...props}
            path={`${path.split(":")[0]}${id}/paymentacceptorg`}
          />
        )}
      />
      <Route
        exact
        path={`${path}/acceptorghead`}
        render={props => (
          <ModalBoxSubmit
            nameButton="ثبت نهایی درخواست"
            messageAccept="از ثبت درخواست خود مطمئن هستید؟"
            messageNotification=""
            textHeader="ثبت تایید درخواست"
            textCancel="بازگشت"
            {...props}
            path={`${path.split(":")[0]}${id}/acceptorghead`}
          />
        )}
      />
      <Route
        exact
        path={`${path}/rejectorghead`}
        render={props => (
          <ModalBoxSubmit
            nameButton="تایید نهایی"
            cancel={true}
            textHeader="ثبت رد درخواست"
            messageAccept="از رد درخواست خود مطمئن هستید؟"
            messageNotification=""
            textCancel="بازگشت"
            path={`${path}/rejectorghead`}
            {...props}
          />
        )}
      />
    </ContainerClient>
  );
};
