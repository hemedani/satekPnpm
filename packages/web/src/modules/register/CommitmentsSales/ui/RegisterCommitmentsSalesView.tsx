import { useStatesQuery } from "@satek/hooks";
import {
  getStates_getStates,
  PaymentDeadLine,
  ServiceRange,
  WorkingShift
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";
import { SelectBoxRegister } from "../../ComponentShare/SelectBoxRegister";
import { DeliveryTimeState } from "../../function/DeliveryTimeState";

interface Props extends RouteComponentProps {}

export const RegisterCommitmentsSalesView: React.FC<Props> = ({ history }) => {
  let registerStorage: any;
  if (localStorage.getItem("register")) {
    registerStorage = JSON.parse(localStorage.getItem("register")!);
  }
  const [selectTime, setSelectTime] = useState<number>(0);

  const { register, handleSubmit, watch, setValue } = useForm();
  const [selectCity, setSelectCity] = useState<boolean>(false);
  const [selectInternalState, setSelectInternalState] = useState<boolean>(
    false
  );
  const [selectCountry, setCountry] = useState<boolean>(false);
  const [selectFastDelivery, setFastDelivery] = useState<boolean>(false);
  const [selectState, setSelectState] = useState<boolean>(false);
  const [stateSelected, setStateSelected] = useState<SelectorOptions[]>();
  const Parse: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        className="selectorRangeTimeCommitmentsSalesRight"
        height="1.7rem"
        name="selectedStatesIds"
        isMulti={true}
        defaultValue={
          registerStorage &&
          registerStorage[3] &&
          registerStorage[3].selectedStatesIds &&
          registerStorage[3].selectedStatesIds.map((state: any) => {
            return options.find(({ value }) => value === state);
          })
        }
        placeholder=""
        options={options}
        value={stateSelected}
        onChange={(option: SelectorOptions[]) => {
          setStateSelected(option);
          let bb = option.reduce<string[]>((bb, b) => {
            bb.push(b.value);
            return bb;
          }, []);
          setValue("selectedStatesIds", bb);
        }}
      />
    );
  };

  const onSubmit = handleSubmit(variables => {
    console.log(selectedStatesIds, variables, stateSelected);
    let workingTime: object = { workingShift: "Morning" };
    switch (selectTime) {
      case 0:
        workingTime = { workingShift: "Morning" };
        break;
      case 1:
        workingTime = { workingShift: "MorningAndAfternoon" };

        break;
      case 2:
        workingTime = { workingShift: "AllDayLong" };

        break;
      default:
        break;
    }
    variables.selectedStatesIds = selectedStatesIds;
    let range: ServiceRange[] = [];
    if (selectCity) range.push(ServiceRange.City);
    if (selectInternalState) range.push(ServiceRange.State);
    if (selectState) range.push(ServiceRange.SelectedStates);
    if (selectCountry) range.push(ServiceRange.Country);

    variables.paymentDeadLine = PaymentDeadLine.SixMonth;
    variables.serviceRange = range;
    variables.fastDelivery = selectFastDelivery;
    variables = Object.assign({}, variables, workingTime);

    let levelOneRegister = JSON.parse(localStorage.getItem("register")!);
    if (levelOneRegister) {
      levelOneRegister[3] = variables;
      localStorage.setItem("register", JSON.stringify(levelOneRegister));
    } else {
      localStorage.setItem("register", JSON.stringify([variables]));
    }
    history.push("/register/rule");
  });
  useEffect(() => {
    register({ name: "cityDeliveryTime" });
    register({ name: "stateDeliveryTime" });
    register({ name: "selectedStatesIds" });
    register({ name: "selectedStateDeliveryTime" });
    register({ name: "countryDeliveryTime" });
    if (registerStorage && registerStorage[3]) {
      registerStorage[3].workingShift === WorkingShift.Morning
        ? setSelectTime(0)
        : registerStorage[3].workingShift === WorkingShift.MorningAndAfternoon
        ? setSelectTime(1)
        : setSelectTime(2);

      registerStorage[3].serviceRange.includes(ServiceRange.City)
        ? setSelectCity(true)
        : setSelectCity(false);

      registerStorage[3].serviceRange.includes(ServiceRange.State)
        ? setSelectState(true)
        : setSelectState(false);

      registerStorage[3].serviceRange.includes(ServiceRange.SelectedStates)
        ? setSelectInternalState(true)
        : setSelectInternalState(false);

      registerStorage[3].serviceRange.includes(ServiceRange.Country)
        ? setCountry(true)
        : setCountry(false);
      registerStorage[3].fastDelivery
        ? setFastDelivery(true)
        : setFastDelivery(false);

      registerStorage[3].selectedStatesIds &&
        setValue("selectedStatesIds", registerStorage[3].selectedStatesIds);

      registerStorage[3].cityDeliveryTime &&
        setValue("cityDeliveryTime", registerStorage[3].cityDeliveryTime);

      registerStorage[3].stateDeliveryTime &&
        setValue("stateDeliveryTime", registerStorage[3].stateDeliveryTime);

      registerStorage[3].selectedStateDeliveryTime &&
        setValue(
          "selectedStateDeliveryTime",
          registerStorage[3].selectedStateDeliveryTime
        );

      registerStorage[3].countryDeliveryTime &&
        setValue("countryDeliveryTime", registerStorage[3].countryDeliveryTime);
    }
  }, [register, registerStorage, setValue]);
  const selectedStatesIds = watch("selectedStatesIds");
  const cityDeliveryTime = watch("cityDeliveryTime");
  const stateDeliveryTime = watch("stateDeliveryTime");
  const selectedStateDeliveryTime = watch("selectedStateDeliveryTime");
  const countryDeliveryTime = watch("countryDeliveryTime");

  const { Response } = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {},
    client
  );
  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      title="ثبت اطلاعات هویتی"
    >
      {console.log(stateSelected, "stateSelected")}
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="itemsCommitmentsSales">
          <div className="rangePlaceCommitmentsSales">
            <div className="headerRangePlacesCommitmentsSales">
              <h4 className="header-registerCommitmentsSalesView">
                تعهدات محدوده مکانی فروش
              </h4>
              <p className="text-registerCommitmentsSalesView">
                انتخاب هر یک از گزینه ها به معنی تعهد شما برای ارسال به آن
                محدوده مکانی است
              </p>
            </div>
            <div className="checkBoxRangePlacesCommitmentsSales">
              <div className="boxCheckBoxRangePlacesCommitmentsSales">
                <input
                  onChange={e => setSelectCity(e.target.checked)}
                  type="checkbox"
                  name="placeActivity"
                  value="innercity"
                  checked={selectCity}
                />
                <p className="checkBoxTextrangePlacesCommitmentsSales">
                  داخل شهری
                </p>
              </div>
              <div className="boxCheckBoxRangePlacesCommitmentsSales">
                <input
                  type="checkbox"
                  name="placeActivity"
                  checked={selectInternalState}
                  value="innerprovince"
                  onChange={e => setSelectInternalState(e.target.checked)}
                />
                <p className="checkBoxTextrangePlacesCommitmentsSales">
                  داخل استانی
                </p>
              </div>
              <div className="boxCheckBoxRangePlacesCommitmentsSales">
                <input
                  type="checkbox"
                  name="placeActivity"
                  value="electedprovince"
                  checked={selectState}
                  onChange={e => setSelectState(e.target.checked)}
                />
                <p className="checkBoxTextrangePlacesCommitmentsSales">
                  استان های منتخب
                </p>
              </div>

              <div className="boxCheckBoxRangePlacesCommitmentsSales">
                <input
                  type="checkbox"
                  name="placeActivity"
                  checked={selectCountry}
                  value="allcountry"
                  onChange={e => setCountry(e.target.checked)}
                />
                <p className="checkBoxTextrangePlacesCommitmentsSales">
                  سراسر کشور
                </p>
              </div>
            </div>
            <div className="checkBoxRangePlacesCommitmentsSales">
              {selectState && (
                <div className="boxlargeCheckBoxRangePlacesCommitmentsSales">
                  {Response}
                </div>
              )}
            </div>
          </div>
          <div className="rangeTimeCommitmentsSales">
            <div className="headerRangeTimeCommitmentsSales">
              <h4 className="header-registerCommitmentsSalesView">
                تعهدات زمانی تحویل تجمعی
              </h4>
              <p className="text-registerCommitmentsSalesView">
                انتخاب هر یک از گزینه ها به معنی تعهد شما برای ارسال به آن
                محدوده مکانی است
              </p>
            </div>
            <div className="itemRangeTimeCommitmentsSales">
              <div className="itemRangeTimeCommitmentsSalesLeft">
                <div className="boxselectorRangeTimeCommitmentsSales">
                  <Selector
                    label="داخل شهری"
                    labelStyle={{ width: "6.2rem", whiteSpace: "nowrap" }}
                    name="cityDeliveryTime"
                    width="100%"
                    style={{ width: "100%", backgroundColor: "unset" }}
                    className="selectorRangeTimeCommitmentsSalesLeft"
                    height="1.7rem"
                    placeholder=""
                    disable={!selectCity}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === cityDeliveryTime
                    )}
                    options={DeliveryTimeState}
                    onChange={(option: SelectorOptions) =>
                      setValue("cityDeliveryTime", option.value)
                    }
                  />
                </div>
              </div>
              <div className="itemRangeTimeCommitmentsSalesRight">
                <div className="boxselectorRangeTimeCommitmentsSales">
                  <Selector
                    name="stateDeliveryTime"
                    label="داخل استانی"
                    labelStyle={{ width: "6.2rem", whiteSpace: "nowrap" }}
                    style={{ width: "100%", backgroundColor: "unset" }}
                    className="selectorRangeTimeCommitmentsSalesRight"
                    height="1.7rem"
                    placeholder=""
                    disable={!selectInternalState}
                    options={DeliveryTimeState}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === stateDeliveryTime
                    )}
                    onChange={(option: SelectorOptions) =>
                      setValue("stateDeliveryTime", option.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="itemRangeTimeCommitmentsSales">
              <div className="itemRangeTimeCommitmentsSalesLeft">
                <div className="boxselectorRangeTimeCommitmentsSales">
                  <Selector
                    name="selectedStateDeliveryTime"
                    label="استان های منتخب"
                    labelStyle={{ width: "6.2rem", whiteSpace: "nowrap" }}
                    style={{ width: "100%", backgroundColor: "unset" }}
                    className="selectorRangeTimeCommitmentsSalesLeft"
                    height="1.7rem"
                    placeholder=""
                    disable={!selectState}
                    options={DeliveryTimeState}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === selectedStateDeliveryTime
                    )}
                    onChange={(option: SelectorOptions) =>
                      setValue("selectedStateDeliveryTime", option.value)
                    }
                  />
                </div>
              </div>
              <div className="itemRangeTimeCommitmentsSalesRight">
                <div className="boxselectorRangeTimeCommitmentsSales">
                  <Selector
                    name="countryDeliveryTime"
                    label="سراسر کشور"
                    labelStyle={{ width: "6.2rem", whiteSpace: "nowrap" }}
                    style={{ width: "100%", backgroundColor: "unset" }}
                    className="selectorRangeTimeCommitmentsSalesRight"
                    height="1.7rem"
                    placeholder=""
                    disable={!selectCountry}
                    options={DeliveryTimeState}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === countryDeliveryTime
                    )}
                    onChange={(option: SelectorOptions) =>
                      setValue("countryDeliveryTime", option.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="itemRangeTimeCommitmentsSales">
              <div className="itemRangeTimeCommitmentsSalesLeft">
                <div className="boxCheckBoxRangeTimeCommitmentsSales">
                  <input
                    type="checkbox"
                    name="fastDelivery"
                    value="instantSupply"
                    checked={selectFastDelivery}
                    onChange={e => setFastDelivery(e.target.checked)}
                  />
                  <p className="checkBoxTextrangePlacesCommitmentsSales">
                    امکان تامین در خواست های فوری کالا در داخل شهر را دارم.
                  </p>
                </div>
              </div>
              <div className="itemRangeTimeCommitmentsSalesRight">
                {selectFastDelivery && (
                  <>
                    <p className="TextRangeTimeCommitmentsSales">
                      زمان تحویل(ساعت)
                    </p>
                    <div className="boxselectorRangeTimeCommitmentsSales">
                      <Selector
                        name="deliveryTime"
                        className="selectorDeliveryRangeTimeCommitmentsSales"
                        height="1.7rem"
                        placeholder=""
                        options={[{ label: "1", value: "1" }]}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="costSendCommitmentsSales">
            <div className="headerCostSendCommitmentsSales">
              <h4 className="header-registerCommitmentsSalesView">
                هزینه ارسال
              </h4>
            </div>
            <div className="boxTextCostSendCommitmentsSales">
              <p className="text-registerCommitmentsSalesView">
                هزینه ارسال برای در خواست های داخل شهری به صورت رایگان و برای
                درخواست های داخل استانی استان های منتخب و سراسر کشور بر اساس
                تعرفه پست سفارشی محاسبه خواهد شد
              </p>
            </div>
          </div>
          <div className="ScopeTimeCommitmentsSales">
            <h4 className="header-registerCommitmentsSalesView">
              بازه زمانی سرویس دهی را انتخاب کنید.
            </h4>
            <div className="scopeSelectTimeBoxCommitmentsSales">
              <SelectBoxRegister
                nameFields={["8 تا 15", "8 تا 22", "24 ساعته"]}
                change={setSelectTime}
                style={{ height: "1.5rem" }}
                select={selectTime}
              />
            </div>
          </div>
        </div>
        <div className="bottomBodyBoxRegisterStoreContainer">
          <div className="itemContainerRegisterStore">
            <Button
              text="مرحله بعدی"
              type="main"
              mainType="submit"
              padding="0.5rem 0.8rem 0.5rem 0.8rem"
            />
          </div>
        </div>
      </form>
    </ContainerRegister>
  );
};
