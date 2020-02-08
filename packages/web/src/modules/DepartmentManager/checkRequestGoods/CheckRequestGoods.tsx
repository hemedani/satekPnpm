import { useGetStuffsQuery, useOrderQuery } from "@satek/hooks";
import {
  getOrder_getOrder,
  getStuffs_getStuffs_items,
  LongPayment
} from "@satek/resolvers";
import React, { useState } from "react";
import { Route, RouteComponentProps, useParams } from "react-router";
import { client } from "../../../Apollo";
import { DetailGoodsAndApplicant } from "../../componentShare/checkRequestGoods/DetailGoodsAndApplicant";
import { DetailStore } from "../../componentShare/checkRequestGoods/DetailStore";
import { FilterCheckRequest } from "../../componentShare/checkRequestGoods/FilterCheckRequest";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBoxSubmit } from "../../componentShare/modalBox/modalboxSubmit/ModalBoxSubmit";
import { ConvertDateToMiladi } from "../../function/ConvertDate";

interface Props extends RouteComponentProps {}

export const CheckRequestGoods: React.FC<Props> = ({
  match: { path },
  history
}) => {
  const { id }: any = useParams();
  const [selectedDay, setSelectedDay] = useState();
  const [isModelWare, setIsModelWare] = useState();
  const [timePayment, setTimePayment] = useState<LongPayment>();
  const [numberRequest, setNumberRequest] = useState<number>();
  const [numberRequestStuff, setNumberRequestStuff] = useState<number>();
  const ParseWaresStuff: React.FC<{ data: getStuffs_getStuffs_items[] }> = ({
    data
  }) => {
    // console.log(data, "<===data received department");
    // setFoundItem(String(data.length));
    if (data) {
      return (
        <React.Fragment>
          {data.map(stuff => (
            <DetailStore
              history={history}
              key={stuff.id}
              isNewNum={
                numberRequest ? numberRequestStuff !== numberRequest : false
              }
              timePayment={timePayment}
              // setStuffId={setStuffId}
              num={numberRequest ? numberRequest : numberRequestStuff}
              data={stuff}
              orderId={id}
              path={path}
              // wareId={alterwareid && alterwareid}
            />
          ))}
          {/* {console.log(numberRequest, numberRequestStuff, "number is")} */}
          <Route
            exact
            path={`${path!.split(":")[0]}${id}/modalstuff/:stuffid`}
            render={props => (
              <ModalBoxSubmit
                nameButton="ثبت نهایی درخواست"
                AcceptLinkTo=""
                // functionInvoke={buyStuff}
                messageAccept="از ثبت درخواست خود مطمئن هستید؟"
                messageNotification="لطفا به این نکته توجه کنید که درخواست های شما پس از تایید مقام تشخیص نهایی می شود"
                textCancel="اصلاح درخواست"
                path={`${path!.split(":")[0]}${id}/modalsetstuff`}
                {...props}
                id={id}
                orderDetails={{
                  num: numberRequest ? numberRequest : numberRequestStuff,
                  isNewNum: numberRequest
                    ? numberRequestStuff !== numberRequest
                    : false,
                  // stuffId: stuffId,
                  timePayment: timePayment
                }}
              />
            )}
          />
        </React.Fragment>
      );
    }
    return null;
  };

  const ParseWaresStuffOrder: React.FC<{ data: getOrder_getOrder }> = ({
    data
  }) => {
    setNumberRequestStuff(data.num);
    return (
      <>
        <div className="detail-checkRequestGoods-depManger">
          <DetailGoodsAndApplicant
            nameWare={data.ware ? data.ware.name : ""}
            nameRequestor={
              data.requestorUser && data.unit
                ? data.requestorUser.name + "-" + data.unit.name
                : ""
            }
            historyCost={false}
          />
        </div>

        <div className="filter-checkRequestGoods-depManger">
          <FilterCheckRequest
            numberRequest={numberRequest ? numberRequest : data.num}
            type="allFilter"
            path={path}
            setIsModelWare={setIsModelWare}
            isModelWare={isModelWare}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay!}
            setPayment={setTimePayment}
            timePayment={timePayment}
            history={history}
            setNum={setNumberRequest}
            orderId={id}
          />
        </div>
      </>
    );
  };

  // const [order, setOrder] = useState(
  //   data && data.getOrders && data.getOrders.items
  //     ? data.getOrders.items.find(t => t.id === id)
  //     : " nothing"
  // );

  // data &&
  //   data.getOrders &&
  //   data.getOrders.items &&
  //   setOrder(data.getOrders.items.find(t => t.id === id));

  const { Response, data } = useOrderQuery(
    { error: CustomError, loading: Loader, parsing: ParseWaresStuffOrder },
    {
      id: id
    },
    client
  );
  // console.log(alterwareid, "alterwareid is...");

  const wareStuffs = useGetStuffsQuery(
    { error: CustomError, loading: Loader, parsing: ParseWaresStuff },
    {
      wareId: !isModelWare
        ? data && data.getOrder && data.getOrder.ware
          ? data.getOrder.ware.id
          : ""
        : "",
      wareModelId: isModelWare
        ? data && data.getOrder && data.getOrder.wareModel
          ? data.getOrder.wareModel.id
          : ""
        : "",
      inventoryNo: numberRequest
        ? numberRequest
        : data && data.getOrder && data.getOrder.num,
      longPayment: timePayment && LongPayment[timePayment!],
      expiration: selectedDay && ConvertDateToMiladi(selectedDay)
    },
    client
  );
  // const wareStuffsAlter = useGetStuffsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseWaresStuff },
  //   {
  //     wareId: alterwareid,
  //     inventoryNo: numberRequest
  //       ? numberRequest
  //       : data && data.getOrder && data.getOrder.num,
  //     longPayment: timePayment && LongPayment[timePayment!],
  //     expiration: selectedDay && ConvertDateToMiladi(selectedDay)
  //   },
  //   client
  // );
  // console.log(alterwareid, "lksadsad", alterwareid == "undefined");
  // console.log("data is...", wareStuffs.Response, alterwareid);
  return (
    <ContainerClient
      history={history}
      colorHeader="blue"
      textHeader={
        "بررسی درخواست " +
        (data && data.getOrder.ware && data.getOrder.ware.name)
      }
    >
      {Response}
      <div className="listStores-checkRequestGoods-depManger">
        <Container
          width="100%"
          childStyle={{ height: "95%", minHeight: "11rem" }}
          margin="0 0 1rem 0"
          height="95%"
          title="لیست فروشندگان و جزییات فروش"
        >
          {/* {console.log(
            "---------------------------------------",
            id,
            "+_+_+_+",
            alterwareid
          )} */}
          <div className="DetailStore-checkRequestGoods-depManger">
            {data &&
              data.getOrder &&
              data.getOrder.ware &&
              data.getOrder.ware.id &&
              wareStuffs.Response}
          </div>
        </Container>
      </div>
    </ContainerClient>
  );
};
