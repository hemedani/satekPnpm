import {
  useMeQuery,
  useOrderClientQuery,
  useUpdateOrderStatusMutate
} from "@satek/hooks";
import {
  getOrderForClient_getOrder,
  OrderStatus,
  updateOrderStatusVariables
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../Apollo";
import PathToStatus from "../../../PathToStatus";
import { BarcodeScanner } from "../../componentShare/barcode/BarcodeScanner";
import { Button } from "../../componentShare/button/Button";
import { CustomError } from "../../componentShare/customError/CustomError";
import { ItemBox } from "../../componentShare/itemBox/ItemBox";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBox } from "../../componentShare/modalBox/ModalBox";
import { ConvertDateToShamsi } from "../../function/ConvertDate";

interface Props extends RouteComponentProps {}
export const ModalDelivery: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<
    updateOrderStatusVariables
  >();

  useEffect(() => {
    register({ name: "rejectdes" });
  });
  let { id } = useParams();

  const ParseAllOrders: React.FC<{ data: getOrderForClient_getOrder }> = ({
    data
  }) => {
    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
      // codeReader.reset()
      // document.getElementById('result').textContent = '';
      // console.log('Reset.')
    }, []);
    return (
      <div className="container-modaldelivery">
        <div className="part-up-modaldelivery">
          <BarcodeScanner
            result={result}
            camera={camera}
            setCamera={setCamera}
            setResult={setResult}
          />

          {result && data.stuff && !camera && <div />}
          <div />
          <div className="accept-reject-barcode-modaldelivery">
            <Button
              type="main"
              fontSize="0.8rem"
              width="10rem"
              justifyContent="center"
              height="2rem"
              onClick={() => setCamera(!camera)}
              margin="2rem 0 0 0"
              text={camera ? "بستن بارکدخوان" : "استفاده از بارکدخوان"}
              padding="0.5rem 1.5rem"
            />
            {data && data.stuff && (
              <>
                <div className="text-barcode-scanner-modaldelivery">
                  {result ? (
                    <span
                      className={
                        result == data.stuff.barcode
                          ? "accept-barcode ic_accept"
                          : "reject-barcode ic_reject"
                      }
                    ></span>
                  ) : (
                    <></>
                  )}
                  {result === data.stuff.barcode}
                  <p
                    className={
                      result
                        ? result == data.stuff.barcode
                          ? "accept-barcode-modaldelivery"
                          : "reject-barcode-modaldelivery"
                        : "normal-barcode-modaldelivery"
                    }
                  >
                    {result
                      ? result == data.stuff.barcode
                        ? "بارکد اسکن شده با بارکد مرتبط درخواست مطابقت دارد"
                        : "بارکد اسکن شده با بارکد مرتبط درخواست مطابقت ندارد"
                      : "منتظر اسکن ..."}
                  </p>
                </div>
                <p
                  className={
                    result
                      ? result == data.stuff.barcode
                        ? "accept-barcode-modaldelivery"
                        : "reject-barcode-modaldelivery"
                      : "normal-barcode-modaldelivery"
                  }
                >
                  بارکد خوانده شده:
                  {result && result}
                </p>
              </>
            )}
          </div>
          {/* <img
            src={BarCode}
            className="image-barcode-modaldelivery"
            alt="NotFound"
          /> */}
        </div>
        <div className="part-down-modaldelivery">
          <ItemBox
            text={data && data.ware ? data.ware.name : ""}
            title="نام کالا"
          />
          <ItemBox
            text={
              data && data.ware && data.ware.manufacturer
                ? data.ware.manufacturer.name
                : ""
            }
            title="سازنده"
          />
          <div className="row-filed-modaldelivery">
            <ItemBox
              margin="0 0 0 2rem"
              text={
                data && data.stuff && data.stuff.expiration
                  ? ConvertDateToShamsi(data.stuff.expiration)!
                  : ""
              }
              title="تاریخ انقضا"
            />
            <ItemBox
              margin="0 2rem"
              text={data && data.num ? String(data.num) : ""}
              title="تعداد"
            />
          </div>
        </div>
      </div>
    );
  };

  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const data_ = useOrderClientQuery(
    { error: CustomError, loading: Loader, parsing: ParseAllOrders },
    { id: id! },
    client
  ).Response;
  const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
    {
      organizationId: "",
      unitId:
        meSiteId && meSiteId.me && meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "UnitEmployee"
            )[0].site!.id
          : "",
      storeId: "",
      statuses: PathToStatus("/client/deliverygoods")!
    },
    client
  );
  const onSubmit = handleSubmit(async variables => {
    let val;
    console.log("variables", variables);

    val = {
      id: id!,
      orderStatus: path.includes("modaldeliveryaccept")
        ? OrderStatus.pendingForPay
        : OrderStatus.rejectedByEmployee,
      comment: path.includes("modaldeliveryaccept") ? "" : variables.comment
    };

    try {
      // val = { ...val };
      console.log({ variables: val }, "...=<< at first %% ");
      delete val.comment;
      const result = await updateOrderStatusMutate({ variables: val });
      console.log("result is", JSON.stringify(result));
      history.goBack();
    } catch (err) {
      console.log(val, "...=<< ....");
      console.log(err, "error is ....");
    }
  });
  // console.groupEnd();
  console.log(watch("comment"), "qqqqqqqqqqqqq");
  return (
    <ModalBox history={history} headerName="تحویل گرفتن درخواست" display="flex">
      {data_}
      {path.includes("modaldeliveryreject") && (
        <textarea
          name="comment"
          defaultValue="دلیل رد درخواست"
          ref={register}
        ></textarea>
      )}
      <form className="boxButton-modaldelivery" onSubmit={onSubmit}>
        <Button
          fontSize="0.8rem"
          margin="0.5rem 0.5rem"
          type={path.includes("modaldeliveryreject") ? "redCancel" : "sendReq"}
          text={
            path.includes("modaldeliveryreject") ? "پس دادم" : "تحویل گرفتم"
          }
          name={path.includes("modaldeliveryreject") ? "accept" : ""}
          mainType="submit"
          padding="0.5rem 1rem"
        />

        <Button
          fontSize="0.8rem"
          margin="0.5rem 0.5rem 0.5rem 2rem"
          type="gray"
          onClick={() => history.goBack()}
          text="بازگشت"
          name="decline"
          padding="0.5rem 1rem"
          mainType="button"
        />
      </form>
    </ModalBox>
  );
};
