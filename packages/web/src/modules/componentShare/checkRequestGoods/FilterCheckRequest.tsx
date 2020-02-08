import {
  useMeQuery,
  useOrderQuery,
  useUpdateOrderStatusMutate
} from "@satek/hooks";
import {
  ChosenPayment,
  getCheckOrder_getOrder,
  LongPayment
} from "@satek/resolvers";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import { Route, useParams } from "react-router";
import { client } from "../../../Apollo";
import { ApolloVar } from "../../../ApolloVar";
import { Input } from "../../componentShare/Input/Input";
import { ConvertPayment, optionpayLong } from "../../function/ConvertPayment";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";
import { ModalBoxInquiry } from "../modalBox/modalboxInquiry/ModalBoxInquiry";
import { ModalBoxSubmit } from "../modalBox/modalboxSubmit/ModalBoxSubmit";
import { Selector, SelectorOptions } from "../selectors/Selector";
interface Props {
  numberRequest?: number | string;
  path?: string;
  history?: any;
  orderId?: string;
  historyExpiration?: string;
  nameCompany?: string;
  hasLine?: boolean;
  selectedDay?: object;
  dataOrder?: getCheckOrder_getOrder;
  setIsModelWare?: (val: boolean) => void;
  isModelWare?: boolean;
  setNum?: (variable: number) => void;
  setPayment?: (variable: LongPayment) => void;
  setSelectedDay?: (variable: object) => void;
  timePayment?: LongPayment | null;
  type:
    | "justShowDetail"
    | "justFilterPaymentMethod"
    | "allFilter"
    | "rejectRequest";
}

export const FilterCheckRequest: React.FC<Props> = ({
  type,
  numberRequest,
  orderId,
  history,
  timePayment,
  path,
  historyExpiration,
  nameCompany,
  setPayment,
  setNum,
  setSelectedDay,
  selectedDay,
  hasLine,
  dataOrder,
  setIsModelWare,
  isModelWare
}) => {
  useEffect(() => {
    register({ name: "historyPapers" });
  });
  const [checkPapers, setCheckPapers] = useState<boolean>(false);
  let { id } = useParams();
  // console.log(id, "id is true...");
  // console.log(alterwareid, "alterwareid is true...");
  // console.log(alterwareid, "alterwareid is true...");
  // console.log(`${path!.split(":")[0]}modalotherwares`, "url is true...");

  const Parse: React.FC = ({}) => {
    return null;
  };

  const { Response, data } = useOrderQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {
      id: orderId!
    },
    client
  );
  // console.log(data, "qwertyqwerty");
  // const [selectedDay, setSelectedDay] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { watch, register } = useForm();
  // console.log(selectedDay && typeof selectedDay);
  interface SelectorOptionsPayment {
    value: LongPayment;
    label: "";
  }
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;

  // const WareGroupWares: React.FC<{
  //   data: getWareGroupWares_getWareGroup;
  // }> = ({ data }) => {
  //   let options =
  //     data &&
  //     data.wares &&
  //     data.wares.reduce<SelectorOptions[]>((options, option) => {
  //       options.push({ label: option.name, value: option.id });
  //       return options;
  //     }, []);
  //   // console.log(options, "uiuiuiuiuiui");
  //   return (
  //     <Selector
  //       options={options!}
  //       name="condition"
  //       placeholder="نام برند "
  //       isClearable={true}
  //       labelStyle={{ width: "5rem", color: "#2b2b2b" }}
  //       placeholderFontSize="0.5rem"
  //       value={
  //         options
  //           ? options.find(option => option.value === otherWare)
  //           : { value: "", label: "" }
  //       }
  //       width="90%"
  //       height="1.8rem"
  //       onChange={(option: SelectorOptions) => {
  //         if (option) {
  //           // unit && unit(option.value);
  //           setOtherWare(option.value);
  //           history &&
  //             history.push(
  //               `${path!.split(":")[0]}${id}/modalotherwares/${wareGroupId!}`
  //             );
  //         } else {
  //           // unit && unit("");
  //           setOtherWare("");
  //         }
  //       }}f
  //     />
  //   );
  // };
  const optionPapers = Object.values(LongPayment).reduce<SelectorOptions[]>(
    (optionPapers, value) => {
      optionPapers.push({ label: ConvertPayment(value), value: value });
      return optionPapers;
    },
    []
  );
  const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
    ApolloVar(path!, null, meSiteId),

    client
  );

  return (
    <form
      className={cx("filtercheckrequest", {
        "line-border-filtercheckrequest": hasLine
      })}
    >
      <div className="filterCheckRequest-depManger">
        <div className="responsive-selectBox-filterCheckRequest-depManger">
          <div className="responsive-part-selectBox-filterCheckRequest-depManger">
            <div className="selectBox-filterCheckRequest-depManger">
              {type === "justFilterPaymentMethod" ||
              type === "justShowDetail" ? (
                <p className="title-input-filterCheckRequest-depManger">
                  برند کالا
                </p>
              ) : (
                <p className="title-input-filterCheckRequest-depManger">
                  مشاهده برندهای دیگر
                </p>
                // { wareName }
              )}
              {type === "justShowDetail" && (
                <p className="name-admin">{nameCompany}</p>
              )}
              {type === "allFilter" && ( // <Selector
                //   width="90%"
                //   height="1.8rem"
                //   isClearable={true}
                //   options={[
                //     { label: "مونوبایند", value: "" },
                //     { label: "اتوبیو", value: "" },
                //     { label: "الایزا", value: "" }
                //   ]}
                //   name="company"
                //   placeholder=""
                //   onChange={option =>
                //     history &&
                //     history.push(`${path!.split(":")[0]}${id}/modalotherwares`)
                //   }
                // />
                // <Button
                //   height="2rem"
                //   fontSize="0.8rem"
                //   padding="0.3rem 1rem"
                //   text= {alterwareid ? wareName : "مشاهده برندهای دیگر"}
                //   type="main"
                //   to={`${path!.split(":")[0]}${id}/modalotherwares/${wareGroupId!}`}
                // />
                <div className="DatePicker input-calender-depManger datepicker-input-filterCheckRequest">
                  <Button
                    fontSize="0.8rem"
                    padding="0.5rem 0"
                    text={"کالا های مشابه"}
                    type={isModelWare ? "main" : "okay"}
                    widthLink="80%"
                    icon={isModelWare ? "ic_reject" : ""}
                    width="100%"
                    height="100%"
                    onClick={() => setIsModelWare!(!isModelWare)}
                    justifyContent="space-around"
                  />
                </div>
              )}
              {type === "justFilterPaymentMethod" && (
                <p className="input-calender-depManger">{nameCompany}</p>
              )}
            </div>
            <div className="selectBox-filterCheckRequest-depManger">
              {type === "justFilterPaymentMethod" ||
              type === "justShowDetail" ? (
                <p className="title-input-filterCheckRequest-depManger">
                  تاریخ انقضا
                </p>
              ) : (
                <p className="title-input-filterCheckRequest-depManger">
                  تاریخ انقضا نزدیک و با تخفیف
                </p>
              )}
              {type === "justShowDetail" && (
                <p className="name-admin">{historyExpiration}</p>
              )}
              {type === "allFilter" && (
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay!}
                  shouldHighlightWeekends
                  locale="fa"
                  wrapperClassName="input-calender-depManger datepicker-input-filterCheckRequest"
                  calendarClassName="responsive-calendar"
                  inputPlaceholder=" "
                />
              )}
              {type === "justFilterPaymentMethod" && (
                <p className="input-calender-depManger">{historyExpiration}</p>
              )}
            </div>
          </div>
          <div className="responsive-part-selectBox-filterCheckRequest-depManger">
            <div className="selectBox-filterCheckRequest-depManger">
              {type === "justFilterPaymentMethod" ? (
                <p className="title-input-filterCheckRequest-depManger">
                  نحوه پرداخت
                </p>
              ) : (
                <p className="title-input-filterCheckRequest-depManger">
                  تغییر زمان پرداخت
                </p>
              )}
              {type === "justShowDetail" && (
                <p className="name-admin">شش ماهه(1398/05/05)</p>
              )}
              {console.log(dataOrder && dataOrder.chosenPayment, "chose")}
              {(type === "allFilter" || type === "justFilterPaymentMethod") && (
                <Selector
                  width="90%"
                  name="historyPapers"
                  height="1.8rem"
                  style={{ fontSize: "0.7rem" }}
                  defaultValue={
                    dataOrder
                      ? dataOrder.chosenPayment === undefined ||
                        dataOrder.chosenPayment === ChosenPayment.Incash
                        ? optionpayLong[0]
                        : optionpayLong.find(
                            val => val.value === dataOrder!.longPayment
                          )
                      : optionpayLong[0]
                  }
                  options={optionpayLong}
                  value={optionPapers.find(
                    ({ value }) => value === timePayment
                  )}
                  onChange={(option: SelectorOptionsPayment) => {
                    setPayment!(option.value);
                  }}
                  placeholder=""
                />
              )}
            </div>
            <div className="inputBox-filterCheckRequest-depManger">
              <p className="title-input-filterCheckRequest-depManger">
                تعداد مورد نیاز
              </p>
              {type === "justShowDetail" && (
                <p className="name-admin">{numberRequest}</p>
              )}
              {type === "allFilter" && (
                <Input
                  defaultValue={String(numberRequest)}
                  onBlur={e => setNum!(Number(e.target.value))}
                  size="medium"
                  style={{ width: "90%" }}
                  name="numberRequest"
                  title=""
                  clear={true}
                />
                // <div className="search-wrapper">
                //   <input
                //     defaultValue={numberRequest}
                //     className="input-filterCheckRequest-depManger"
                //     onBlur={e => setNum!(Number(e.target.value))}
                //     type="text"
                //   />
                //   <button
                //     className="close-icon-filterCheckRequest-depManger"
                //     type="reset"
                //   >
                //     <svg className="css-6q0nyr-Svg"></svg>
                //   </button>
                // </div>
              )}
              {type === "justFilterPaymentMethod" && (
                <p className="input-calender-depManger">{numberRequest}</p>
              )}
            </div>
            {console.log(timePayment, "kob")}
          </div>
        </div>
        <div className="responsive-button-selectBox-filterCheckRequest-depManger">
          <div
            className={cx("scopeCast-filterCheckRequest-depManger", {
              "scopeCast-button-filterCheckRequest-depManger":
                type === "allFilter",
              "scopeCast-center-button-filterCheckRequest-depManger":
                type === "justShowDetail" || type === "justFilterPaymentMethod"
            })}
          >
            {type === "allFilter" && (
              // <React.Fragment>
              //   <p className="title-scopeCast-filterCheckRequest-depManger">
              //     بازه قیمتی فروش نقدی در ماه اخیر
              //   </p>
              //   <p className="title-Cast-filterCheckRequest-depManger">
              //     تومان 52362254-34544354
              //   </p>
              // </React.Fragment>

              <div className="button-box-filtercheckrequest">
                <Button
                  height="2rem"
                  padding="0.3rem 0.5rem"
                  fontSize="0.7rem"
                  margin="0 0 0 0.5rem"
                  text="پاک کردن"
                  type="main"
                  to={`/departmentmanager/checkrequestgoods/${orderId}/something/${data &&
                    data.getOrder &&
                    data.getOrder.ware &&
                    data.getOrder.ware.id}`}
                />
                <Button
                  height="2rem"
                  padding="0.3rem 0.5rem"
                  margin="0 0.5rem 0 0"
                  fontSize="0.7rem"
                  text="رد درخواست"
                  to={`${path!.split(":")[0]}${id}/modalreject`}
                  type="redCancel"
                />
              </div>
            )}
            {(type === "justFilterPaymentMethod" ||
              type === "justShowDetail") && (
              <Button
                height="2rem"
                fontSize="0.8rem"
                padding="0.3rem 1rem"
                text="مشاهده استعلام واحد"
                to={`${path!.split(":")[0]}${id}/modalboxinquiry`}
                type="main"
              />
            )}
            {/* {type === "justShowDetail" && (
            <React.Fragment>
              <p className="title-input-filterCheckRequest-depManger">
                تاریخ تحویل
              </p>
              <p className="name-admin">1398/2/23</p>
            </React.Fragment>
          )} */}
          </div>
        </div>
      </div>
      {type !== "justFilterPaymentMethod" && type !== "justShowDetail" && (
        <div className="papers-filterCheckRequest">
          <div className="papers-checkBox-filterCheckRequest">
            <input
              checked={checkPapers}
              onChange={e => setCheckPapers(e.target.checked)}
              type="checkBox"
              className="papers-checkBox-filterCheckRequest"
            />
            <p className="text-papers-checkBox-filterCheckRequest">
              قیمت کالا بر مبنای اسناد خزانه
            </p>
          </div>
          {checkPapers && (
            <>
              <div className="history-papers-inputs-filterCheckRequest">
                <Selector
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center"
                  }}
                  options={[]}
                  label="تاریخ سر رسید"
                  labelStyle={{ width: "6rem" }}
                  height="1.8rem"
                  name=""
                  placeholder=""
                />
              </div>
              <div className="Percentage-papers-inputs-filterCheckRequest">
                <Selector
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center"
                  }}
                  height="1.8rem"
                  options={[]}
                  label="درصد سرک اوراق"
                  labelStyle={{ width: "6rem" }}
                  name=""
                  placeholder=""
                />
              </div>
            </>
          )}
        </div>
      )}
      <Route
        exact
        path={`${path!.split(":")[0]}${id}/modalreject`}
        render={props => (
          <ModalBoxSubmit
            nameButton="تایید نهایی"
            AcceptLinkTo=""
            cancel={true}
            id={id}
            textHeader="ثبت رد درخواست"
            messageAccept="از رد درخواست خود مطمئن هستید؟"
            messageNotification="لطفا به این نکته توجه کنید که درخواست های لغو شده در بخش تاریخچه درخواست ها قابل مشاهده هستند"
            textCancel="اصلاح درخواست"
            path={`${path!.split(":")[0]}${orderId}/modalreject`}
            {...props}
          />
        )}
      />

      <Route
        exact
        path={`${path}/modalboxinquiry`}
        render={props => {
          console.log(timePayment, "jan man");
          return (
            <ModalBoxInquiry
              price={dataOrder && dataOrder.ware!.price * dataOrder.num}
              idWare={dataOrder ? dataOrder.ware!.id : ""}
              num={dataOrder && dataOrder.num}
              setPayment={setPayment}
              payment={
                dataOrder
                  ? {
                      chosenPayment: dataOrder.chosenPayment!,
                      longPayment: dataOrder.longPayment!
                    }
                  : null
              }
              timePayment={timePayment}
              expiration={dataOrder ? dataOrder.stuff!.expiration : ""}
              {...props}
            />
          );
        }}
      />

      {/* {modalShow && (
        <ModalBoxSubmit
          nameButton="تایید نهایی"
          history={history}
          AcceptLinkTo=""
          cancel={true}
          textHeader="ثبت رد درخواست"
          functionInvoke={rejectedByUnitHead}
          messageAccept="رد درخواست توسط مدیر در سامانه ثبت شد"
          messageNotification="لطفا به این نکته توجه کنید که درخواست های لغو شده در بخش تاریخچه درخواست ها قابل مشاهده هستند"
          success={setModalShow}
          textCancel="اصلاح درخواست"
        />
      )} */}
    </form>
  );
};
