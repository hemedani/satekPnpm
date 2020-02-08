import React, { useState, useEffect } from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { RouteComponentProps, useParams, Route } from "react-router";
import { ComponentAddStuff } from "../modalBox/modalAddStuff/ComponentAddStuff";
import { ParseWare } from "../../componentShare/parseWare/PraseWare";
import {
  getStuffEdit_getStuff_ware,
  getWares_getWares,
  LongPayment
} from "@satek/resolvers";
import { useForm } from "react-hook-form";
import { ConvertDateToMiladi } from "../../function/ConvertDate";
import { useCreateStuffMutate, useMeQuery } from "@satek/hooks";
import { client } from "../../../Apollo";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import { Button } from "../../componentShare/button/Button";
import { ModalBarcode } from "../modalBox/modalBarcode/ModalBarcode";
interface Props extends RouteComponentProps {}
export const AddStuff: React.FC<Props> = ({ history }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [precentag, setPrecentag] = useState(0);
  const [handelPrice, setHandelPrice] = useState(false);
  const [longPayment, setLongPayment] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const { id } = useParams();
  const wareId = watch("wareId");
  useEffect(() => {
    register({ name: "wareId" });
  });
  const [myWare, setMyWare] = useState<
    getWares_getWares | getStuffEdit_getStuff_ware
  >();
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { createStuffMutate } = useCreateStuffMutate(
    {
      storeId:
        meId && meId.me && meId.me.userToSites
          ? meId.me.userToSites[0].site!.id
          : ""
    },
    client
  );
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
  return (
    <ContainerClient colorHeader="blue" textHeader="اضافه کردن کالا">
      <form onSubmit={onSubmit} className="formRegisterStore formaddstuff">
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
      <Route
        exact
        path="/seller/stuff/barcode"
        render={props => <ModalBarcode {...props} />}
      />
    </ContainerClient>
  );
};
