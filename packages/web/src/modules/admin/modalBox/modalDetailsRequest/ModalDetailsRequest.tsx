import { useOrderModalDetailsQuery } from "@satek/hooks";
import { getOrderModalDetails_getOrder } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { client } from "../../../../Apollo";
import { Status, StatusLevel } from "../../../../Status";
import StatusToColor from "../../../../StatusToColor";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";
import { FiledLevelRequest, LevelRequest } from "../../../componentShare/levelRequest/LevelRequest";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { ConvertDateToShamsi } from "../../../function/ConvertDate";

interface Props extends RouteComponentProps {
  details: any;
}
const status: FiledLevelRequest[] = [
  { accept: "pendingInUnitHead" },
  {
    accept: "pendingInOrganizationHead",
    reject: "rejectedByUnitHead"
  },
  { accept: "pendingInStore", reject: "rejectedByOrganizationHead" },
  { accept: "PreparationByStore", reject: "rejectedByStore" },
  { accept: "sentByStore" },
  { accept: "receivedByEmployee pendingForPay", reject: "rejectedByEmployee" },
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

// console.log(persianStatus, "persian status");
export const ModalDetailsRequest: React.FC<Props> = props => {
  const { id } = useParams();
  console.log(id, "modalDetails");
  const ParseAllOrders: React.FC<{ data: getOrderModalDetails_getOrder }> = ({
    data
  }) => {
    console.log(data, "from server...");
    return (
      <div className="modal-container-detailrequest">
        <div className="modal-body-detailrequest">
          <div className="modal-body-right-detailrequest">
            <Container padding="1rem 0">
              <div
                className="cnt-item-box-twice"
                style={{
                  alignItems: "baseline",
                  justifyContent: "space-between"
                }}
              >
                <ItemBox
                  margin="0 0"
                  width="100%"
                  title="نام کالا"
                  text={data.ware ? data.ware.name : ""}
                />
                {/* <Button
                text="مشخصات فنی کالا"
                type="okay"
                fontSize=".7rem"
                padding="0.3rem .5rem 0.3rem .5rem"
                margin="0 2rem"
              /> */}
              </div>

              <div
                className="cnt-item-box-quad responsive-modaldetailrequest"
                style={{
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "nowrap"
                }}
              >
                <ItemBox
                  width="unset"
                  margin="0"
                  className="itembox-modaldetailrequest"
                  title="تعداد / مقدار"
                  text={data.num + "بسته"}
                />
                <ItemBox
                  width="unset"
                  margin="0"
                  className="itembox-modaldetailrequest"
                  titleClassName="text-item-detailrequest"
                  title="موجودی قبل از درخواست"
                  text={
                    data.remaining ? data.remaining + " بسته" : "تعیین نشده"
                  }
                />
                <ItemBox
                  width="unset"
                  margin="0"
                  titleClassName="text-item-detailrequest"
                  className="itembox-modaldetailrequest"
                  title="تاریخ نیاز"
                  text={
                    data.deliveryTime
                      ? ConvertDateToShamsi(data.deliveryTime.split("T")[0])!
                      : ""
                  }
                />
                {/* <ItemBox
              width="45%"
              title="محل درخواست"
              text={props.details.unit.address}
            /> */}
              </div>
            </Container>

            {/* <SellerRequestorInformation
            title={["فروشنده", "درخواست کننده"]}
            text={[
              (props.details.store &&
                props.match.path.includes("departmentmanager")) ||
              props.match.path.includes("client")
                ? "******"
                : props.details.store
                ? props.details.store.name
                : "تعیین نشده",
              props.details.requestorUser.name
            ]}
            margin="0 3rem"
            padding="0rem 0"
          /> */}

            <Container padding="1rem 0">
              <div
                className="cnt-item-box-triple responsive-modaldetailrequest"
                style={{ alignItems: "baseline" }}
              >
                <ItemBox
                  width="unset"
                  title="تاریخ ثبت درخواست"
                  titleClassName="text-item-detailrequest"
                  className="itembox-modaldetailrequest"
                  margin="0"
                  text={
                    data.createdAt
                      ? ConvertDateToShamsi(data.createdAt.split("T")[0])!
                      : ""
                  }
                />
                <ItemBox
                  width="unset"
                  title="کد پیگیری ساتک"
                  fontSizeText="0.6rem"
                  className="itembox-modaldetailrequest"
                  textClassName="size-text-item-detailrequest"
                  titleClassName="text-item-detailrequest"
                  margin="0"
                  text={data.trackingcode}
                />
                <ItemBox
                  width="unset"
                  title="آخرین وضعیت درخواست  "
                  margin="0"
                  className="itembox-modaldetailrequest"
                  text={Status(data.status)}
                  textColor={StatusToColor(data.status)}
                />
              </div>
              <div
                className="cnt-item-box-triple responsive-modaldetailrequest"
                style={{ alignItems: "baseline" }}
              >
                <ItemBox
                  width="unset"
                  title="تاریخ ثبت ارسال"
                  margin="0"
                  className="itembox-modaldetailrequest"
                  text={
                    data.deliveryTime
                      ? ConvertDateToShamsi(data.deliveryTime.split("T")[0])!
                      : ""
                  }
                />
                <ItemBox
                  width="unset"
                  title="قیمت فی کالا با ارزش افزوده"
                  margin="0"
                  className="itembox-modaldetailrequest"
                  text={
                    data.stuff && data.stuff.price
                      ? String(data.stuff.price) + " " + "تومان"
                      : "تعیین نشده"
                  }
                />
                <ItemBox
                  width="unset"
                  title="قیمت نهائی کالا با ارزش افزوده"
                  className="itembox-modaldetailrequest"
                  margin="0"
                  text={
                    data.stuff && data.stuff.price
                      ? String(data.stuff.price * data.num) + " " + "تومان"
                      : "تعیین نشده"
                  }
                />
                {/* <ItemBox title="تخفیف" text="۲,۳۴۳,۲۱۳ ربال" /> */}
              </div>
            </Container>
          </div>

          <div className="modal-body-left-detailrequest">
            <LevelRequest
              Items={persianStatus}
              reject={data.status.includes("reject")}
              level={status.findIndex(
                val =>
                  val.accept.includes(data.status) || val.reject === data.status
              )}
            />
          </div>
        </div>
        <div className="modal-btns-cnt modal-box-btn-detailsrequest">
          <Button
            type="gray"
            text="بازگشت"
            onClick={props.history.goBack}
            fontSize=".9rem"
            padding=".5rem 1.5rem"
          />
        </div>
      </div>
    );
  };

  
  const data_ = useOrderModalDetailsQuery(
    { error: CustomError, loading: Loader, parsing: ParseAllOrders },
    { id: id! },
    client
  );
  return (
    <ModalBox
      modalBoxSize={props.match.path.includes("client") ? "medium" : "large"}
      history={props.history}
      headerName={
        "جزئیات درخواست" + "  " + data_ &&
        data_.data &&
        data_.data.getOrder &&
        data_.data.getOrder.ware
          ? data_.data.getOrder.ware.name
          : ""
      }
      display="flex"
    >
      {data_.Response}
    </ModalBox>
  );
};
