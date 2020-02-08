import {
  UseDeleteStuffMutate,
  useGetStuffEditQuery,
  useMeQuery,
  UseUpdateStuffMutate
} from "@satek/hooks";
import {
  getStuffEdit_getStuff,
  getStuffEdit_getStuff_ware,
  getWares_getWares,
  LongPayment
} from "@satek/resolvers";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { toast } from "react-toastify";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import {
  ConvertDateToDatePicker,
  ConvertDateToMiladi
} from "../../../function/ConvertDate";
import { ComponentAddStuff } from "./ComponentAddStuff";
interface Props extends RouteComponentProps {}
export const ModalUpdateStuff: React.FC<Props> = ({ history }) => {
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const [deleteButton, setDeleteButton] = useState(false);
  async function deleteStuff() {
    const variables = { id: id ? id : "" };
    try {
      await deleteStuffMutate({ variables });
    } catch (err) {
      toast(err.graphQLErrors[0].message);
    }
    history.goBack();
  }
  const { deleteStuffMutate, result: resultDelete } = UseDeleteStuffMutate(
    {
      storeId:
        meId && meId.me && meId.me.userToSites
          ? meId.me.userToSites[0].site!.id
          : ""
    },
    client
  );

  const { id } = useParams();
  const ParseWareEdit: React.FC<{ data: getStuffEdit_getStuff }> = ({
    data
  }) => {
    const { register, handleSubmit, watch, setValue } = useForm();
    useEffect(() => {
      register({ name: "wareId" });
    });
    const wareId = watch("wareId") as string;
    const [precentag, setPrecentag] = useState(data.pricePercentage);
    const [editItems, setEditItems] = useState(data);
    const [handelPrice, setHandelPrice] = useState(data.hasAbsolutePrice);

    const [longPayment, setLongPayment] = useState(
      data.availableLongPayment!.length !== 0
    );
    const [myWare, setMyWare] = useState<
      getWares_getWares | getStuffEdit_getStuff_ware | undefined
    >(data.ware!);

    const [selectedDay, setSelectedDay] = useState(
      ConvertDateToDatePicker(data.expiration)
    );

    const onSubmit = handleSubmit(async variables => {
      variables.wareId = wareId;
      variables.storeId = meId ? meId.me!.userToSites![0].site!.id : "";
      variables.hasAbsolutePrice = handelPrice;
      console.log(variables.pricePercentage, "variables.pricePercentage");
      variables.inventoryNo = Number(variables.inventoryNo);
      variables.pricePercentage = -Number(variables.pricePercentage);

      let availableLongPayment: LongPayment[] = [];

      Percent.map(val => {
        if (variables[val.percent] === "") {
          delete variables[val.percent];
        } else {
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
      console.log(selectedDay, ConvertDateToMiladi(selectedDay!));
      variables.availableLongPayment = availableLongPayment;
      variables.id = id;
      variables.wareId = myWare!.id;
      variables = { variables };

      console.log(variables, id, "id");
      await updateStuffMutate(variables);

      history.goBack();
    });
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

    // if (data.availableLongPayment)
    //   setLongPayment(data.availableLongPayment.length !== 0);
    // if (data.expiration)
    //   setSelectedDay(ConvertDateToDatePicker(data.expiration));
    // if (data.ware) setMyWare(data.ware);
    return (
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="container-modalAddStuff">
          <div className="body-modalAddStuff">
            <div className="field-search-modalAddStuff">
              {/* <ParseWare setValue={setValue} setMyWare={setMyWare} /> */}
            </div>
            <ComponentAddStuff
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              register={register}
              myWare={myWare}
              editItems={editItems}
              setPrecentag={setPrecentag}
              setHandelPrice={setHandelPrice}
              setLongPayment={setLongPayment}
              longPayment={longPayment}
              Percent={Percent}
              precentag={precentag}
              handelPrice={handelPrice}
            />{" "}
          </div>
        </div>
        <div className="boxButton-modalupdatestuff-admin">
          <div className="Button-modalupdatestuff-admin">
            <Button
              padding="0.2rem 1.2rem"
              mainType="submit"
              isLoading={result.loading}
              text={id ? "ویرایش" : "تایید اطلاعات"}
              type="main"
            />
            <Button
              padding="0.2rem 1.2rem"
              margin="0 1rem"
              text="انصراف"
              type="cancel"
            />
          </div>
          <div className="delete-box-modalupdatestuff">
            <p
              className={cx("paragrph-delete-modalupdatestuff", {
                "paragrph-delete-black-modalupdatestuff": deleteButton
              })}
              onClick={() => setDeleteButton(!deleteButton)}
            >
              می خواهید کالا را حذف کنید؟
            </p>
            {deleteButton && (
              <Button
                padding="0 1.2rem"
                margin="0 1rem"
                height="1.5rem"
                mainType="button"
                onClick={deleteStuff}
                text="حذف کالا"
                type="redCancel"
              />
            )}
          </div>
        </div>
      </form>
    );
  };

  const { Response } = useGetStuffEditQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareEdit },
    {
      id: id ? id : ""
    },
    client
  );

  const { updateStuffMutate, result } = UseUpdateStuffMutate(
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
      headerName="ویرایش کالای جدید"
      display="flex"
      modalBoxSize="large"
    >
      {id && Response}
    </ModalBox>
  );
};
