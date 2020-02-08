import {
  getStuffEdit_getStuff,
  getStuffEdit_getStuff_ware,
  getWares_getWares,
  LongPayment
} from "@satek/resolvers";
import React, { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import { Container } from "../../../componentShare/container/Container";
import { Button } from "../../../componentShare/button/Button";

interface Props {
  selectedDay: any;
  setSelectedDay: (variable: any) => void;
  setLongPayment: (variable: boolean) => void;
  register: (Ref: any, validateRule?: any) => void;
  myWare?: getWares_getWares | getStuffEdit_getStuff_ware;
  editItems?: getStuffEdit_getStuff;
  setPrecentag: (value: number) => void;
  setHandelPrice: (value: boolean) => void;
  handelPrice: boolean;
  longPayment: boolean;
  precentag: number | null;
  Percent?: { percent: string; payment: LongPayment }[];
}
export const ComponentAddStuff: React.FC<Props> = ({
  myWare,
  setSelectedDay,
  selectedDay,
  editItems,
  register,
  setLongPayment,
  precentag,
  setPrecentag,
  longPayment,
  setHandelPrice,
  handelPrice,
  Percent
}) => {
  const [percentPayment, setPercentPayment] = useState<number[]>([
    editItems && editItems.twoMonthPricePercent
      ? editItems.twoMonthPricePercent!
      : 0,
    editItems && editItems.threeMonthPricePercent
      ? editItems.threeMonthPricePercent!
      : 0,
    editItems && editItems.fourMonthPricePercent
      ? editItems.fourMonthPricePercent!
      : 0,
    editItems && editItems.fiveMonthPricePercent
      ? editItems.fiveMonthPricePercent!
      : 0,
    editItems && editItems.sixMonthPricePercent
      ? editItems.sixMonthPricePercent!
      : 0,
    editItems && editItems.sevenMonthPricePercent
      ? editItems.sevenMonthPricePercent!
      : 0,
    editItems && editItems.eightMonthPricePercent
      ? editItems.eightMonthPricePercent!
      : 0,
    editItems && editItems.nineMonthPricePercent
      ? editItems.nineMonthPricePercent!
      : 0,
    editItems && editItems.tenMonthPricePercent
      ? editItems.tenMonthPricePercent!
      : 0,
    editItems && editItems.elevenMonthPricePercent
      ? editItems.elevenMonthPricePercent!
      : 0,
    editItems && editItems.twelveMonthPricePercent
      ? editItems.twelveMonthPricePercent!
      : 0,
    editItems && editItems.eighteenMonthPricePercent
      ? editItems.eighteenMonthPricePercent!
      : 0,
    editItems && editItems.twentyFourMonthPricePercent
      ? editItems.twentyFourMonthPricePercent!
      : 0
  ]);

  function changePercentage(event: any) {
    event.preventDefault();
    setPrecentag(event.target.value);
  }
  const dataPercent = [
    [
      [
        { title: "دو ماهه", name: "twoMonthPricePercent" },
        { title: "سه ماهه", name: "threeMonthPricePercent" },
        { title: "چهار ماهه", name: "fourMonthPricePercent" },
        { title: "پنج ماهه", name: "fiveMonthPricePercent" }
      ],
      [
        { title: "شش ماهه", name: "sixMonthPricePercent" },
        { title: "هفت ماهه", name: "sevenMonthPricePercent" },
        { title: "هشت ماهه", name: "eightMonthPricePercent" },
        { title: "نه ماهه", name: "nineMonthPricePercent" }
      ],
      [
        { title: "ده ماهه", name: "tenMonthPricePercent" },
        { title: "یازده ماهه", name: "elevenMonthPricePercent" },
        { title: "دوازده ماهه", name: "twelveMonthPricePercent" },
        { title: "", name: "" }
      ]
    ],
    [
      [
        { title: "18 ماهه", name: "eighteenMonthPricePercent" },
        { title: "24 ماهه", name: "twentyFourMonthPricePercent" },
        { title: "", name: "" },
        { title: "", name: "" }
      ]
    ]
  ];
  function changeInput(event: any, index: number): any {
    percentPayment[index] = Number(event.target.value);
    const myArray = [...percentPayment];

    setPercentPayment(myArray);
  }
  return (
    <>
      <Container childStyle={{ direction: "rtl" }} width="100%">
        <div className="field-name-modalAddStuff">
          <p className="title-modalAddStuff">نام فارسی</p>
          <h3 className="name-goods-modalAddStuff">{myWare && myWare.name}</h3>
        </div>
        <div className="field-name-modalAddStuff">
          <p className="title-modalAddStuff">نام انگلیسی</p>
          <p className="name-en-modalAddStuff">{myWare && myWare.enName}</p>
        </div>
        <div className="field-tag-modalAddStuff">
          <p className="tag-modalAddStuff">
            {/* {myWare && myWare.wareGroup && myWare.wareGroup.wareClasses && ( */}
            <>
              <span className="ic_group icon-style-modalAddStuff" />
              {/* {myWare.wareGroup.wareClasses.name} */}
            </>
          </p>
          <p className="tag-modalAddStuff">
            <span className="icon-style-modalAddStuff" />
            {myWare && myWare.wareGroup && myWare.wareGroup.name}
          </p>
          <p className="tag-modalAddStuff">
            {myWare && myWare.manufacturer && (
              <>
                <span className="ic_flag icon-style-modalAddStuff" />
                {myWare.manufacturer.country}
              </>
            )}
          </p>
          <p className="tag-modalAddStuff">
            <span className="icon-style-modalAddStuff" />
            {myWare && myWare.manufacturername}
          </p>
        </div>
        <div className="field-detail-modalAddStuff">
          <div className="field-part-right-detail-modalAddStuff">
            <p className="title-detail-modalAddStuff title-width-detail-modalAddStuff">
              بارکد
            </p>
            <input
              name="barcode"
              ref={register}
              defaultValue={
                editItems
                  ? editItems.barcode
                    ? ""
                    : Math.abs(editItems.barcode!) + ""
                  : ""
              }
              type="number"
              className="number-inventory-modalAddStuff"
            />
            <Button
              padding="0.3rem 1.5rem"
              margin="0 1rem"
              type="main"
              to={"/seller/stuff/barcode"}
              text="استفاده از بارکد"
            />
          </div>
        </div>
        <div className="field-detail-modalAddStuff">
          <div className="field-part-right-detail-modalAddStuff">
            <div className="field-input-detail-modalAddStuff">
              <p className="title-detail-modalAddStuff">تاریخ انقضا</p>
              <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                shouldHighlightWeekends
                locale="fa"
                calendarClassName="responsive-calendar"
                inputPlaceholder=" "
              />
            </div>
            <p className="title-detail-modalAddStuff">تعداد موجودی</p>
            <input
              name="inventoryNo"
              type="number"
              defaultValue={editItems && editItems.inventoryNo}
              ref={register}
              className="number-inventory-modalAddStuff"
            />
          </div>
          <div className="field-part-left-detail-modalAddStuff">
            <div className="part-left-detail-modalAddStuff">
              <p className="title-part-modalAddStuff">
                سقف قیمت خرید مراکز درمانی
              </p>
              <p className="tag-modalAddStuff">
                {myWare !== undefined &&
                  myWare.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                ریال
              </p>
            </div>
          </div>
        </div>
        <div className="field-detail-modalAddStuff">
          <div className="field-part-right-detail-modalAddStuff">
            <p className="title-detail-modalAddStuff">
              درصد تخفیف فروش نقدی نسبت به سقف قیمت
            </p>
            <p className="title-explanation-detail-modalAddStuff">
              (با احتساب ارزش افزوده)
            </p>
            <input
              name="pricePercentage"
              ref={register}
              defaultValue={
                editItems
                  ? editItems.hasAbsolutePrice
                    ? ""
                    : Math.abs(editItems.pricePercentage!) + ""
                  : ""
              }
              onChange={changePercentage}
              type="number"
              value={handelPrice ? "" : undefined}
              disabled={handelPrice}
              className="number-inventory-modalAddStuff"
            />
            <p className="title-percent-part-modalAddStuff">درصد</p>
          </div>
          <div className="field-part-left-detail-modalAddStuff">
            {!handelPrice && precentag != 0 && (
              <>
                <div className="nearly-modalAddStuff color-red-modalAddStuff">
                  ~
                </div>
                <div className="part-left-detail-modalAddStuff">
                  <p className="title-part-modalAddStuff color-red-modalAddStuff">
                    قیمت فروش نقدی شما
                  </p>
                  <p className="tag-modalAddStuff color-red-modalAddStuff">
                    {myWare !== undefined &&
                      precentag &&
                      (myWare.price * ((100 - Math.abs(precentag)) / 100))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    ریال
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="field-detail-modalAddStuff">
          <div className="field-part-right-detail-modalAddStuff">
            <input
              checked={handelPrice}
              onChange={e => {
                setHandelPrice(e.target.checked);
                console.log(e.target.checked, handelPrice, "handelPrice");
                setPrecentag(0);
              }}
              className="checkBox-modalAddStuff"
              type="checkBox"
            />
            <p className="title-detail-modalAddStuff">
              اعمال قیمت دستی برای فروش نقدی
            </p>
            <p className="title-explanation-detail-modalAddStuff">
              (با احتساب ارزش افزوده)
            </p>
            {handelPrice && (
              <>
                <input
                  name="price"
                  ref={register}
                  defaultValue={editItems ? editItems.price : ""}
                  className="number-inventory-modalAddStuff"
                />
                <p className="title-percent-part-modalAddStuff">ریال</p>
              </>
            )}
          </div>
        </div>
      </Container>
      <Container
        width="100%"
        childStyle={{ padding: "1rem 0.7rem", direction: "rtl" }}
        margin="0.5rem 0"
      >
        <div className="field-part-right-detail-modalAddStuff">
          <input
            onChange={e => {
              setLongPayment(e.target.checked);
            }}
            checked={longPayment}
            className="checkBox-modalAddStuff"
            type="checkBox"
          />
          <p className="title-detail-modalAddStuff">
            فروش کالا به صورت مدت دار
          </p>
        </div>
        {longPayment && (
          <>
            {dataPercent.map((percent, index) => {
              return (
                <div
                  key={"1" + index}
                  className={
                    index === 0
                      ? "up-modaltimedsalessettings"
                      : "down-modaltimedsalessettings"
                  }
                >
                  {percent.map((percentUp, index1) => {
                    return (
                      <div
                        key={"2" + index1}
                        className="row-modaltimedsalessettings"
                      >
                        {percentUp.map((internalPercent, index2) => {
                          return (
                            <div
                              key={"3" + index2}
                              className="row-field-modaltimedsalessettings"
                            >
                              {internalPercent.name && (
                                <>
                                  <p className="title-modaltimedsalessettings">
                                    {internalPercent.title}
                                  </p>
                                  <input
                                    name={internalPercent.name}
                                    onChange={e =>
                                      changeInput(
                                        e,
                                        index == 0
                                          ? index1 * 4 + index2
                                          : 11 + index2
                                      )
                                    }
                                    ref={register}
                                    defaultValue={
                                      editItems &&
                                      String(
                                        Object.values(editItems)[
                                          Object.keys(editItems!).indexOf(
                                            internalPercent.name
                                          )
                                        ]
                                      )
                                    }
                                    type="number"
                                    className="input-modaltimedsalessettings"
                                  />
                                  <p className="text-modaltimedsalessettings">
                                    درصد
                                  </p>

                                  <p className="text-modaltimedsalessettings">
                                    {myWare &&
                                      myWare.price +
                                        percentPayment[
                                          index == 0
                                            ? index1 * 4 + index2
                                            : 11 + index2
                                        ] *
                                          myWare.price *
                                          0.01}
                                  </p>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      </Container>
    </>
  );
};
