import { useCreateStuffMutate, useMeQuery } from "@satek/hooks";
import {
  getStuffEdit_getStuff_ware,
  getWares_getWares,
  LongPayment
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { ParseWare } from "../../../componentShare/parseWare/PraseWare";
import { ConvertDateToMiladi } from "../../../function/ConvertDate";
import { ComponentAddStuff } from "./ComponentAddStuff";

interface Props extends RouteComponentProps {}
export const ModalAddStuff: React.FC<Props> = ({ history }) => {
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;

  const { register, handleSubmit, watch, setValue } = useForm();
  const [precentag, setPrecentag] = useState(0);
  const [handelPrice, setHandelPrice] = useState(false);
  const [longPayment, setLongPayment] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const [myWare, setMyWare] = useState<
    getWares_getWares | getStuffEdit_getStuff_ware
  >();
  const { id } = useParams();

  // const ParseWareEdit: React.FC<{ data: getStuffEdit_getStuff }> = ({
  //   data
  // }) => {
  //   setEditItems(data);
  //   setHandelPrice(data.hasAbsolutePrice);
  //   if (data.availableLongPayment)
  //     setLongPayment(data.availableLongPayment.length !== 0);
  //   if (data.expiration)
  //     setSelectedDay(ConvertDateToDatePicker(data.expiration));
  //   if (data.ware) setMyWare(data.ware);
  //   return <></>;
  // };
  useEffect(() => {
    register({ name: "wareId" });
  });

  // const { Response } = useGetStuffEditQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseWareEdit },
  //   {
  //     id: id ? id : ""
  //   },
  //   client
  // );
  // console.log(myWare && myWare.enName, "jgfhfdgotuy");
  const wareId = watch("wareId") as string;
  const ware: any = watch("ware");
  const Percent = [
    { percent: "twoMonthPricePercent", payment: LongPayment.twoMonth },
    { percent: "threeMonthPricePercent", payment: LongPayment.threeMonth },
    { percent: "fourMonthPricePercent", payment: LongPayment.fourMonth },
    { percent: "fiveMonthPricePercent", payment: LongPayment.fiveMonth },
    { percent: "sixMonthPricePercent", payment: LongPayment.sixMonth },
    { percent: "sevenMonthPricePercent", payment: LongPayment.sevenMonth },
    { percent: "eightMonthPricePercent", payment: LongPayment.eightMonth },
    { percent: "nineMonthPricePercent", payment: LongPayment.nineMonth },
    { percent: "tenMonthPricePercent", payment: LongPayment.tenMonth },
    { percent: "elevenMonthPricePercent", payment: LongPayment.elevenMonth },
    { percent: "twelveMonthPricePercent", payment: LongPayment.twelveMonth },
    {
      percent: "eighteenMonthPricePercent",
      payment: LongPayment.eighteenMonth
    },
    {
      percent: "twentyFourMonthPricePercent",
      payment: LongPayment.twentyFourMonth
    }
  ];
  const onSubmit = handleSubmit(async variables => {
    variables.wareId = myWare;
    variables.storeId = meId ? meId.me!.userToSites![0].site!.id : "";
    variables.hasAbsolutePrice = handelPrice;
    console.log(variables);

    variables.inventoryNo = Number(variables.inventoryNo);

    variables.pricePercentage = -Number(variables.pricePercentage);
    if (variables.barcode) {
      variables.barcode = Number(variables.barcode);
    }
    let availableLongPayment: LongPayment[] = [];

    Percent.map(val => {
      if (
        variables[val.percent] === undefined ||
        variables[val.percent] === ""
      ) {
        console.log("sllll");
        delete variables[val.percent];
      } else {
        console.log("sllffll", variables[val.percent], val.percent);
        variables[val.percent] = Number(variables[val.percent]);
        availableLongPayment.push(val.payment);
      }
    });

    if (handelPrice) {
      variables.price = parseFloat(variables.price + "");
    }
    if (selectedDay === null) {
      return;
    } else {
      variables.expiration = ConvertDateToMiladi(selectedDay!);
    }

    variables.availableLongPayment =
      availableLongPayment.length === 0 ? null : availableLongPayment;

    variables = { variables };
    console.log(variables, availableLongPayment);
    const result = await createStuffMutate(variables);
    history.goBack();
  });
  const { createStuffMutate } = useCreateStuffMutate(
    {
      storeId:
        meId && meId.me && meId.me.userToSites
          ? meId.me.userToSites[0].site!.id
          : ""
    },
    client
  );

  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="افزودن کالای جدید"
      display="flex"
      modalBoxSize="large"
    >
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="container-modalAddStuff">
          <div className="body-modalAddStuff">
            <div className="field-search-modalAddStuff">
              <ParseWare
                wareId={wareId}
                setValue={setValue}
                setMyWare={setMyWare}
              />
            </div>
            <ComponentAddStuff
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              register={register}
              myWare={myWare}
              setPrecentag={setPrecentag}
              setHandelPrice={setHandelPrice}
              setLongPayment={setLongPayment}
              longPayment={longPayment}
              precentag={precentag}
              handelPrice={handelPrice}
            />
          </div>
        </div>

        <div className="boxButton-modalEditInfoStore-admin">
          <Button
            padding="0.4rem 1.2rem"
            mainType="submit"
            text={id ? "ویرایش" : "تایید اطلاعات"}
            type="main"
          />
          <Button
            padding="0.4rem 1.2rem"
            margin="0 1rem"
            text="انصراف"
            type="cancel"
          />
        </div>
      </form>
    </ModalBox>
  );
};
