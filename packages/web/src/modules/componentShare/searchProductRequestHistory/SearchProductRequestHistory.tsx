import { useMeQuery, useUnitsQuery } from "@satek/hooks";
import { getUnits_getUnits, OrderStatus } from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import { client } from "../../../Apollo";
import { Status } from "../../../Status";
import { Input } from "../../componentShare/Input/Input";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";
import { Selector, SelectorOptions } from "../selectors/Selector";
import { SelectBoxRegister } from "../../register/ComponentShare/SelectBoxRegister";

interface Props {
  searchWithCode: boolean;
  type: "admin" | "client" | "viewHospital";
  historySubmit?: object;
  history?: boolean;
  nameWare?: (variable: string) => void;
  situation?: (variable: OrderStatus | undefined) => void;
  codeTracking?: (variable: string) => void;
  setHistorySubmit?: (variable: { from: null; to: null }) => void;
  codeWare?: (variable: string) => void;
  checkDelivered?: (variable: string) => void;
  unit?: (variable: string) => void;
  path?: any;
  unitValue?: string;
  setSelectFastDelivery?: (variable: number) => void;
  selectFastDelivery?: number;
  setSelectSort?: (variable: number) => void;
  selectSort?: number;
}
interface SelectorOptionsOrders {
  label: string;
  value: OrderStatus;
}
export const ProductRequestHistory: React.FC<Props> = ({
  searchWithCode,
  type,
  nameWare,
  setHistorySubmit,
  historySubmit,
  codeTracking,
  codeWare,
  situation,
  history,
  unit,
  path,
  unitValue,
  setSelectFastDelivery,
  selectFastDelivery,
  setSelectSort,
  selectSort
}) => {
  const [status, setStatus] = useState<OrderStatus | null>();
  const [choosedUnit, setUnit] = useState();
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const Parse: React.FC<{ data: getUnits_getUnits[] }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        options={options}
        name="condition"
        placeholder=""
        label="نام واحد"
        isClearable={true}
        defaultValue={
          unitValue
            ? options.find(option => option.value === unitValue)
            : { value: "", label: "" }
        }
        labelStyle={{ width: "7rem", color: "#2b2b2b" }}
        placeholderFontSize="0.5rem"
        style={{
          width: "100%",
          fontSize: "0.7rem",
          display: "flex",
          height: "1.5rem",
          alignItems: "center"
        }}
        value={options.find(option => option.value === choosedUnit)}
        onChange={(option: SelectorOptionsOrders) => {
          if (option) {
            unit && unit(option.value);
            setUnit(option.value);
          } else {
            unit && unit("");
            setUnit("");
          }
        }}
      />
    );
  };
  const options = Object.values(OrderStatus).reduce<SelectorOptionsOrders[]>(
    (options, option) => {
      // console.log(options, "osososos");
      options.push({
        label: Status(option),
        value: option
      });
      return options;
    },
    []
  );
  const onSubmit = handleSubmit(async variables => {
    // console.log(variables, "s codeWare cas");
    nameWare!(variables.nameWare);
    codeTracking!(variables.codeTracking);
    codeWare!(variables.codeWare);
  });
  const clearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      if (e.target.name === "nameWare") {
        nameWare!("");
      } else if (e.target.name === "codeTracking") {
        codeTracking!("");
      } else if (e.target.name === "codeWare") {
        codeWare!("");
      }
    }
  };
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { Response } = useUnitsQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {
      organizationId:
        path &&
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
  return (
    <form onSubmit={onSubmit} className="ProductRequestHistory-client">
      <div className="row-ProductRequestHistory-client responsive-viewrequest">
        {type === "viewHospital" ? (
          <div className="searchNameCodeGoods-ProductRequestHistory-client">
            {Response}
          </div>
        ) : (
          <div className="searchNameCodeGoods-ProductRequestHistory-client">
            <Input
              name="nameWare"
              size="medium"
              callBackFunc={nameWare}
              register={register}
              clear={true}
              onChange={clearInput}
              style={{ width: "100%" }}
              titleStyle={{
                color: "#000",
                whiteSpace: "nowrap",
                width: "7rem"
              }}
              title="جستجو نام کالا"
            />
          </div>
        )}
        <div className="applicationFilingDate-ProductRequestHistory-client">
          {type === "admin" ? (
            <Input
              name="codeTracking"
              size="medium"
              clear={true}
              callBackFunc={codeTracking}
              style={{ width: "100%" }}
              onChange={clearInput}
              register={register}
              title="کد پیگیری ساتک"
              titleStyle={{
                color: "#000",
                whiteSpace: "nowrap",
                width: "7rem"
              }}
            />
          ) : type === "viewHospital" ? (
            <SelectBoxRegister
              label="نوع درخواست"
              style={{
                display: "flex",
                alignItems: "center",
                height: "1.5rem"
              }}
              labelStyle={{
                color: "black"
              }}
              change={setSelectFastDelivery!}
              select={selectFastDelivery!}
              nameFields={["همه", "عادی", "فوری"]}
            />
          ) : (
            <div className="input-cnt medium-ProductRequestHistory">
              <p className="title-ProductRequestHistory-client">
                تاریخ ثبت درخواست
              </p>
              <DatePicker
                value={historySubmit}
                onChange={setHistorySubmit}
                shouldHighlightWeekends
                isPersian
                wrapperClassName="datePicker-ProductRequestHistory datepicker-input-filterCheckRequest"
                calendarClassName="responsive-calendar"
                inputPlaceholder=" "
              />
            </div>
          )}
        </div>
        <div className="Condition-ProductRequestHistory-client">
          {type === "admin" && (
            <Selector
              options={options}
              name="condition"
              placeholder="وضعیت درخواست را کنترل کنید"
              label="وضعیت"
              isClearable={true}
              labelStyle={{ width: "7rem", color: "#2b2b2b" }}
              placeholderFontSize="0.5rem"
              style={{
                width: "100%",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center"
              }}
              value={
                options.find(option => option.value === status)
                  ? options.find(option => option.value === status)
                  : { value: "", label: "" }
              }
              onChange={(option: SelectorOptionsOrders) => {
                // console.log(option, "optin is...");
                if (option) {
                  situation && situation(option.value);
                  option.value && setStatus(option.value);
                } else {
                  situation && situation(undefined);
                  setStatus(undefined);
                }
              }}
            />
          )}
          {type === "viewHospital" && (
            <SelectBoxRegister
              label="نوع درخواست"
              style={{
                display: "flex",
                alignItems: "center",
                height: "1.5rem"
              }}
              labelStyle={{
                color: "black"
              }}
              styleBox={{ width: "100%" }}
              textFiledStyle={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem" }}
              change={setSelectSort!}
              select={selectSort!}
              nameFields={["مبلغ", "تاریخ ثبت درخواست", "تاریخ نیاز"]}
            />
          )}
          {type === "client" && (
            <Input
              name="codeTracking"
              size="medium"
              callBackFunc={codeTracking}
              onChange={clearInput}
              register={register}
              style={{ width: "100%" }}
              title="کد پیگیری ساتک"
              titleStyle={{
                color: "#000",
                whiteSpace: "nowrap",
                width: "7rem"
              }}
            />
          )}
        </div>
      </div>
      {history && (
        <div className="row-ProductRequestHistory-client responsive-viewrequest">
          <div className="searchNameCodeGoods-ProductRequestHistory-client">
            {/* <Selector
              options={options}
              name="condition"
              placeholder=""
              label="نام واحد"
              isClearable={true}
              labelStyle={{ width: "5rem", color: "#2b2b2b" }}
              placeholderFontSize="0.5rem"
              style={{
                width: "100%",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center"
              }}
              onChange={(option: SelectorOptionsOrders) => {
                situation!(option.value);
              }}
            /> */}
            {Response}
          </div>
          <div className="applicationFilingDate-ProductRequestHistory-client"></div>
          <div className="submittedRequest-ProductRequestHistory-client"></div>
        </div>
      )}
      {searchWithCode && (
        <div className="row-ProductRequestHistory-client responsive-viewrequest">
          <div className="searchNameCodeGoods-ProductRequestHistory-client">
            <Input
              name="codeWare"
              size="medium"
              onChange={clearInput}
              callBackFunc={codeWare}
              className="input-searchNameCodeGoods-ProductRequestHistory"
              padding="0.3rem 0"
              register={register}
              clear={true}
              title="جستجو کد کالا"
              titleStyle={{
                whiteSpace: "nowrap",
                color: "#000",
                width: "7rem"
              }}
            />
          </div>
          <div className="applicationFilingDate-ProductRequestHistory-client">
            <div className="input-cnt medium-ProductRequestHistory">
              <p className="title-ProductRequestHistory-client">
                تاریخ ثبت درخواست
              </p>
              <DatePicker
                value={historySubmit}
                onChange={setHistorySubmit}
                shouldHighlightWeekends
                locale="fa"
                wrapperClassName="datePicker-ProductRequestHistory datepicker-input-filterCheckRequest"
                calendarClassName="responsive-calendar"
                inputPlaceholder=" "
              />
            </div>
          </div>
          <div className="submittedRequest-ProductRequestHistory-client"></div>
        </div>
      )}

      {/* {path && path.includes("headofhospital") && Response} */}
      <div className="boxButton-ProductRequestHistory-client">
        <Button
          type="main"
          fontSize="0.8rem"
          mainType="submit"
          icon="ic_search"
          text="جستجو"
          padding="0.5rem 1.2rem"
        />
        <Button
          type="main"
          fontSize="0.8rem"
          text="پاک کردن"
          padding="0.5rem 1.2rem"
          margin="0 1rem 0 0"
          onClick={() => {
            // setClear(true);
            setStatus(null);
            situation!(undefined);
            setHistorySubmit!({ from: null, to: null });
            // unit && unit("");
            // setUnit("");
            reset();
          }}
        />
      </div>
    </form>
  );
};
