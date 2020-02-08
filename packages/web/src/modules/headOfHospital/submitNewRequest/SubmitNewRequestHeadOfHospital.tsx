import {
  useCreateOrderMutate,
  useMeQuery,
  useOrganizationUnitsQuery,
  useUnitParentsQuery
} from "@satek/hooks";
import {
  createOrderVariables,
  getOrganizationUnits_getOrganization,
  getWares_getWares,
  OrderStatus
} from "@satek/resolvers";
import cx from "classnames";
import { History } from "history";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import { Route, useParams } from "react-router";
import { toast } from "react-toastify";
import { client } from "../../../Apollo";
import { Button } from "../../componentShare/button/Button";
import { CustomError } from "../../componentShare/customError/CustomError";
import { InputComponent } from "../../componentShare/inputComponent/InputComponent";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBoxSubmit } from "../../componentShare/modalBox/modalboxSubmit/ModalBoxSubmit";
import { ParseWare } from "../../componentShare/parseWare/PraseWare";
import {
  Selector,
  SelectorOptions
} from "../../componentShare/selectors/Selector";
import { ConvertDateToMiladi } from "../../function/ConvertDate";
import { ConvertFastDeliverTime } from "../../function/ConvertFastDeliverTime";
import { SelectBoxRegister } from "../../register/ComponentShare/SelectBoxRegister";
interface Props {
  path: string;
  history: History;
  id?: string;
}

export const SubmitNewRequestHeadOfHospital: React.FC<Props> = ({
  path,
  history
}) => {
  const { id } = useParams();

  const meSiteId = useMeQuery({ error: CustomError, loading: Loader }, client)
    .data;
  const unitData = useUnitParentsQuery(
    { error: CustomError, loading: Loader },
    {
      id:
        meSiteId && meSiteId.me && meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) =>
                t.role === "UnitEmployee" ||
                t.role === "UnitHead" ||
                t.role === "OrganizationHead"
            )[0].site!.id
          : ""
    },
    client
  ).data;
  // console.log(
  //     meSiteId && meSiteId.me && meSiteId.me.userToSites,
  //     "unitData..."
  // );
  console.log(`${path.split(":")[0]}success`, "path is...");
  const notify = () => toast("Wow so easy !");
  const [wareName, setWareName] = useState();
  const [selectTime, setSelectTime] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [myWare, setMyWare] = useState<getWares_getWares>();
  const [selectedDelivery, setSelectedDelivery] = useState<number>(0);
  const { register, handleSubmit, watch, setValue, reset } = useForm<
    createOrderVariables
  >();
  //@ts-ignore
  const { createOrderMutate } = useCreateOrderMutate(
    {
      unitId: path.includes("client")
        ? meSiteId &&
          meSiteId.me &&
          meSiteId.me.userToSites &&
          meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) =>
              t.role === "UnitEmployee" || t.role === "UnitHead"
          )[0].site!.id
        : path.includes("departmentmanager") &&
          meSiteId &&
          meSiteId.me &&
          meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) =>
              t.role === "UnitEmployee" || t.role === "UnitHead"
          )[0].site!.id
        : "",
      organizationId: "",
      statuses: path.includes("client")
        ? null
        : [OrderStatus.pendingInUnitHead],
      storeId: ""
    },
    client
  );

  const ParseUnits: React.FC<{
    data: getOrganizationUnits_getOrganization;
  }> = ({ data }) => {
    if (data.categories && data.categories[0].units) {
      let options = data.categories[0].units.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );
      return (
        <Selector
          name="unitId"
          label="واحد"
          placeholder="انتخاب  واحد"
          style={{ display: "flex", alignItems: "center" }}
          width="12rem"
          height="1.5rem"
          labelStyle={{ width: "unset", marginLeft: "0.5rem" }}
          options={options}
          value={options.find(({ value }) => value === unitId)}
          onChange={(option: SelectorOptions) => {
            setValue("unitId", option.value);
            setValue("requestorUserId", meSiteId!.me!.id);
            setValue(
              "organizationId",
              path.includes("headofhospital") &&
                meSiteId &&
                meSiteId.me &&
                meSiteId.me.userToSites
                ? meSiteId!.me!.userToSites!.filter(
                    (t: { role: string }) => t.role === "OrganizationHead"
                  )[0].site!.id
                : ""
            );
          }}
        />
      );
    }
    return null;
  };

  // console.log(path, "is it realy correct");
  const ResponseUnits = useOrganizationUnitsQuery(
    { error: CustomError, loading: Loader, parsing: ParseUnits },
    {
      id:
        path.includes("headofhospital") &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : ""
    },
    client
  );
  // console.log(meSiteId, "ok baby...");
  // console.log(unitData, "hi baby...");
  // const ResponseWares = useWaresQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseWare },
  //   { userId: meSiteId && meSiteId.me ? meSiteId!.me!.id : "" },
  //   client
  // );
  const unitId = watch("unitId");
  const wareId = watch("wareId");

  useEffect(() => {
    register({ name: "unitId" });
    register({ name: "wareId" });
    register({ name: "remaining" });
    register({ name: "organizationId" });
  });

  const onSubmit = handleSubmit(async (variables, e) => {
    console.log("==================");
    console.log("variables", variables);
    console.log("==================");
    console.group("result from submit");
    let val;
    val = {
      ...variables,
      num: Number(variables.num),
      remaining: Number(variables.remaining),
      fastDelivery: selectedDelivery === 1
    };
    if (selectedDelivery === 0 && selectedDay) {
      val.deliveryTime = ConvertDateToMiladi(selectedDay!);
      delete val.fastDeliveryTime;
    }
    if (selectedDelivery === 1) {
      val.fastDeliveryTime = ConvertFastDeliverTime!(selectTime);
      delete val.deliveryTime;
    }
    if (
      path.includes("departmentmanager") &&
      unitData &&
      unitData.getUnit &&
      unitData.getUnit.organization
    ) {
      val = {
        ...val,
        unitId:
          meSiteId && meSiteId.me && meSiteId.me.userToSites
            ? meSiteId.me.userToSites.filter(
                (t: { role: string }) =>
                  t.role === "UnitEmployee" || t.role === "UnitHead"
              )[0].site!.id
            : "",

        organizationId: unitData.getUnit.organization.id,
        requestorUserId: meSiteId && meSiteId.me ? meSiteId.me.id : ""
      };
    } else if (
      path.includes("client") &&
      unitData &&
      unitData.getUnit &&
      unitData.getUnit.organization
    ) {
      val = {
        ...val,
        unitId:
          meSiteId && meSiteId.me && meSiteId.me.userToSites
            ? meSiteId!.me!.userToSites!.filter(
                (t: { role: string }) =>
                  t.role === "UnitEmployee" || t.role === "UnitHead"
              )[0].site!.id
            : "",
        organizationId: unitData.getUnit.organization.id,
        requestorUserId: meSiteId && meSiteId.me ? meSiteId.me.id : ""
      };
    }
    try {
      console.log(val, "val is...");

      const result = await createOrderMutate({ variables: val });
      setSelectedDay(null);
      setValue("unitId", "");
      setValue("wareId", "");
      reset();
      history.push(`${path.split(":")[0]}/success`);
      console.log(result, "result is...");
      //   history.push(`${path}/success`);

      // toast("درخواست" + " " + wareName + " " + "با موفقیت ثبت شد");
    } catch (err) {
      console.log(JSON.stringify(err), "error is...");
      toast(err);
      reset();
      setValue("unitId", "");
      setValue("wareId", "");
    }

    // standard reset after form submit
    // e.target.reset();
    // setValue("wareId", "");
    console.groupEnd();
  });

  return (
    <>
      <form onSubmit={onSubmit} className="SubmitNewRequest-client">
        <div className="up-SubmitNewRequest-client">
          <div className="boxInput-SubmitNewRequest-client">
            {/* {ResponseWares.Response} */}
            <ParseWare
              idUser={meSiteId && meSiteId.me ? meSiteId!.me!.id : ""}
              setValue={setValue}
              wareId={wareId}
              setMyWare={setMyWare}
            />

            {/* <p className="title-SubmitNewRequest-client">نام کالا</p>
        <input type="text" className="input-SubmitNewRequest-client" /> */}
          </div>
          <div className="boxInput-SubmitNewRequest-client">
            <div className="boxunit-SubmitNewRequest-client">
              {path.includes("headofhospital") && ResponseUnits.Response}
            </div>
          </div>
          <div
            className={cx("boxInput-SubmitNewRequest-client", {
              "boxInput-center-SubmitNewRequest-client": selectedDelivery === 1
            })}
          >
            <div className="select-SubmitNewRequest-client">
              <SelectBoxRegister
                select={selectedDelivery}
                labelStyle={{ color: "black", width: "5rem" }}
                style={{
                  height: "1.8rem",
                  display: "flex",
                  alignItems: "center"
                }}
                label="نوع تحویل"
                change={setSelectedDelivery}
                nameFields={["عادی", "فوری"]}
              />
            </div>
            <div className="historyNeedGoods-SubmitNewRequest-client">
              {/* <InputComponent
              inputReturn={value => setValue("deliveryTime", value)}
              textInput="حداکثر زمان تحویل"
              type="Date"
              innerRef={register}
              name="deliveryTime"
            /> */}
              {selectedDelivery === 1 ? (
                <div className="SelectBox-SubmitNewRequest-client">
                  <p className="titleSelectBox-SubmitNewRequest-client">
                    تحویل تا چند ساعت آینده انجام شود؟
                  </p>
                  <SelectBoxRegister
                    nameFields={["1", "2", "3", "4", "5"]}
                    style={{
                      width: "90%",
                      height: "1.8rem"
                    }}
                    change={setSelectTime}
                    select={selectTime}
                  />
                </div>
              ) : (
                <>
                  <p className="text-InputComponent">تاریخ تحویل</p>
                  <DatePicker
                    value={selectedDay}
                    wrapperClassName="datepicker-input-filterCheckRequest"
                    onChange={setSelectedDay}
                    shouldHighlightWeekends
                    locale="fa"
                    calendarClassName="responsive-calendar"
                    inputPlaceholder=" "
                  />
                </>
              )}
            </div>
            <div className="unit-SubmitNewRequest-client">
              <InputComponent
                inputReturn={value => setValue("num", value)}
                textInput="تعداد/مقدار"
                type="text"
                fontSize="0.8rem"
                labelStyle={{ width: "5rem" }}
                widthInput="100%"
                innerRef={register}
                height="1.3rem"
                name="num"
              />
            </div>
            <div className="unit-SubmitNewRequest-client">
              <InputComponent
                textInput="موجودی فعلی"
                inputReturn={value => setValue("remaining", value)}
                widthInput="100%"
                labelStyle={{ width: "5rem" }}
                fontSize="0.8rem"
                type="text"
                innerRef={register}
                height="1.3rem"
                name="remaining"
              />
            </div>
          </div>
        </div>
        <div className="boxButtonTime-SubmitNewRequest-client">
          <Button
            padding="0.5rem 1rem"
            type="sendReq"
            mainType="submit"
            // onClick={() => {
            //   history.push(`${path.split(":")[0]}/success`);
            // }}
            // to={`${path}/success`}
            text="افزودن به لیست درخواست ها "
          />
        </div>
      </form>
      <Route
        exact
        path={`${path.split(":")[0]}/success`}
        render={props => (
          <ModalBoxSubmit
            textCancel="متوجه شدم"
            AcceptLinkTo={`/${path.split("/:id")}/HistoryRequest`}
            messageNotification="  لطفا به این نکته توجه کنید که درخواست شما پس از تایید مسول واحد و مقام
  تشخیص نهایی می شود"
            messageAccept="درخواست شما با موفقیت ثبت شد"
            nameButton="مشاهده تاریخچه درخواست"
            accept={true}
            path={path}
            {...props}
          />
        )}
      />
    </>
  );
};
