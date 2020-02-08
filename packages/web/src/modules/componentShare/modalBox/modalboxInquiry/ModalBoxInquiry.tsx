import { useGetStuffsQuery } from "@satek/hooks";
import {
  ChosenPayment,
  getStuffs_getStuffs_items,
  LongPayment
} from "@satek/resolvers";
import React, { useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../Apollo";
import {
  ConvertPayment,
  optionpayLong
} from "../../../function/ConvertPayment";
import { Button } from "../../button/Button";
import { DetailStore } from "../../checkRequestGoods/DetailStore";
import { ContainerClient } from "../../containerClient/ContainerClient";
import { CustomError } from "../../customError/CustomError";
import { ItemBox } from "../../itemBox/ItemBox";
import { Loader } from "../../loader/Loader";
import { Selector, SelectorOptions } from "../../selectors/Selector";
import { ModalBox } from "../ModalBox";
import { WarperAnimation } from "../../checkRequestGoods/WarperAnimation";
import { ComponentAnimation } from "../../checkRequestGoods/ComponetAnimation";

interface Props extends RouteComponentProps {
  idWare?: string;
  num?: number;
  expiration?: string;
  payment?: { chosenPayment: ChosenPayment; longPayment: LongPayment } | null;
  price?: number | null;
  timePayment?: LongPayment | null;
  setPayment?: (variable: LongPayment) => void;
}
export const ModalBoxInquiry: React.FC<Props> = ({
  history,
  num,
  expiration,
  match: { path },
  setPayment,
  timePayment,
  price,
  payment,
  idWare
}) => {
  interface SelectorOptionsPayment {
    value: LongPayment;
    label: "";
  }
  const optionPapers = Object.values(LongPayment).reduce<SelectorOptions[]>(
    (optionPapers, value) => {
      optionPapers.push({ label: ConvertPayment(value), value: value });
      return optionPapers;
    },
    []
  );
  const ParseWaresStuff: React.FC<{ data: getStuffs_getStuffs_items[] }> = ({
    data
  }) => {
    let { id } = useParams();
    // console.log(data, "<===data received department");
    // setFoundItem(String(data.length));
    const [animation, setAnimation] = useState();
    if (data) {
      // console.log(data.length, "<===data rstuff");

      return (
        <>
          {data.map(stuff => (
            <WarperAnimation key={stuff.id}>
              <ComponentAnimation
                index={stuff.id}
                data={stuff}
                orderId={id ? id : ""}
                setAnimation={setAnimation}
                animation={animation}
                history={history}
                timePayment={timePayment}
                path={path}
              />
              <DetailStore
                history={history}
                num={num}
                index={stuff.id}
                data={stuff}
                orderId={id ? id : ""}
                timePayment={timePayment}
                setAnimation={setAnimation}
                path={path}

                // wareId={idWare && idWare}
              />
            </WarperAnimation>
          ))}
        </>
      );
    }
    return null;
  };

  const wareStuffs = useGetStuffsQuery(
    { error: CustomError, loading: Loader, parsing: ParseWaresStuff },
    {
      wareId: idWare ? idWare : "",
      inventoryNo: num && num,
      longPayment: timePayment && LongPayment[timePayment!]
    },
    client
  );
  return (
    <ModalBox
      history={history}
      modalBoxSize="medium"
      headerName="استعلام جدیددرخواست"
      display="flex"
    >
      <div className="modalboxinquiry">
        <div className="body-modalboxinquiry">
          <div className="items-modalboxinquiry">
            <div className="item-modalboxinquiry">
              <Selector
                width="12rem"
                label="انتخاب نحوه پرداخت"
                name="historyPapers"
                height="1.8rem"
                labelStyle={{
                  whiteSpace: "nowrap",
                  width: "8rem",
                  color: "#728df1",
                  display: "flex",
                  alignItems: "center"
                }}
                style={{ fontSize: "0.7rem", display: "flex" }}
                defaultValue={
                  timePayment
                    ? optionPapers.find(({ value }) => value === timePayment)
                    : payment
                    ? payment.chosenPayment === undefined ||
                      payment.chosenPayment === ChosenPayment.Incash
                      ? optionpayLong[0]
                      : optionpayLong.find(
                          val => val.value === payment.longPayment
                        )
                    : optionpayLong[0]
                }
                isClearable={true}
                options={optionpayLong}
                value={optionPapers.find(({ value }) => value === timePayment)}
                onChange={(option: SelectorOptionsPayment) => {
                  setPayment!(option.value);
                }}
                placeholder=""
              />
            </div>
            {console.log(timePayment, "timePayment")}
            <div className="item-modalboxinquiry">
              <ItemBox
                text={`${price ? price + "ریال" : "نامشخص"}`}
                title="قیمت نهایی استعلام واحد(با ارزش افزوده)"
              />
            </div>
          </div>
          <ContainerClient
            centerLabel={true}
            violetBorder={true}
            colorHeader="blueDark"
            textHeader="لیست فروشندگان و جزییات فروش"
          >
            <div className="DetailStore-checkRequestGoods-depManger">
              {wareStuffs.Response}
            </div>
          </ContainerClient>
          <div className="box-button-modalboxinquiry">
            <Button
              fontSize="0.8rem"
              width="7rem"
              padding=".5rem 0"
              type="gray"
              margin="0 1 0 0rem"
              text="بازگشت"
              // to={"/seller/newrequests"}
            />
          </div>
        </div>
      </div>
    </ModalBox>
  );
};
