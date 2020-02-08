import {
  useGetStoreSpatialCommitmentsQuery,
  useMeQuery,
  useStateForStoreQuery,
  useUpdateStoreSpatialCommitmentsMutate
} from "@satek/hooks";
import {
  DeliveryTime,
  getStoreSpatialCommitments_getStore,
  ServiceRange,
  updateStoreSpatialCommitmentsVariables,
  WorkingShift
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { FormContext, useForm } from "react-hook-form";
import { Route } from "react-router";
import { client } from "../../../Apollo";
import { StateParser } from "../../admin/user/components/parsers/StateParser";
import { Button } from "../../componentShare/button/Button";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../componentShare/selectors/Selector";
import { SelectBoxRegister } from "../../register/ComponentShare/SelectBoxRegister";
import { DeliveryTimeState } from "../../register/function/DeliveryTimeState";
import { ModalEditInfoSeller } from "../modalBox/modalEditInfoSeller/ModalEditInfoSeller";
import { ModalEditInfoStore } from "../modalBox/modalEditInfoStore/ModalEditInfoStore";

interface SelectorOptionsDeliverTime {
  label: string;
  value: DeliveryTime;
}

export const SettingStore: React.FC = () => {
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  // const { Response } = useStoreQuery(
  //   { error: CustomError, loading: Loader },
  //   { id: meId ? meId.me!.userToSites![0].site!.id : "" },
  //   client
  // );
  const Parse: React.FC<{ data: getStoreSpatialCommitments_getStore }> = ({
    data
  }) => {
    const methods = useForm<updateStoreSpatialCommitmentsVariables>();
    useEffect(() => {
      methods.register({ name: "cityDeliveryTime" });
      methods.register({ name: "stateDeliveryTime" });
      methods.register({ name: "selectedStateDeliveryTime" });
      methods.register({ name: "countryDeliveryTime" });
      methods.register({ name: "selectedStatesIds" });
      methods.register({ name: "serviceRange" });
    });
    const onSubmit = methods.handleSubmit(async variables => {
      let bb = stateSelected!.reduce<string[]>((bb, b) => {
        bb.push(b.value);
        return bb;
      }, []);
      methods.setValue("selectedStatesIds", bb);
      switch (scopeTime) {
        case 0:
          variables.workingShift = WorkingShift.Morning;
          break;
        case 1:
          variables.workingShift = WorkingShift.MorningAndAfternoon;
          break;
        case 2:
          variables.workingShift = WorkingShift.AllDayLong;
          break;
        default:
          variables.workingShift = WorkingShift.Morning;
          break;
      }
      let service = [];
      selectCity &&
        !data.serviceRange!.includes(ServiceRange.City) &&
        service.push(ServiceRange.City);
      selectInternalState &&
        !data.serviceRange!.includes(ServiceRange.State) &&
        service.push(ServiceRange.State);
      selectState &&
        !data.serviceRange!.includes(ServiceRange.SelectedStates) &&
        service.push(ServiceRange.SelectedStates);
      selectCountry &&
        !data.serviceRange!.includes(ServiceRange.Country) &&
        service.push(ServiceRange.Country);
      if (!selectCity) variables.cityDeliveryTime = null;
      if (!selectInternalState) variables.stateDeliveryTime = null;
      if (!selectState) variables.selectedStateDeliveryTime = null;
      if (!selectCountry) variables.countryDeliveryTime = null;

      variables.serviceRange = service;
      console.log(data.serviceRange, "data.serviceRange");
      console.log(variables, "variables");
      console.log(service, "service");
      console.log(variables.serviceRange, "variables.serviceRange");

      variables.id = data.id;
      try {
        const result = await updateSpatialCommitmentsMutate({ variables });
        console.log(result.errors);
      } catch (e) {
        console.log(e, "is erwes");
      }
    });
    const {
      updateSpatialCommitmentsMutate,
      result
    } = useUpdateStoreSpatialCommitmentsMutate({ id: data.id }, client);
    const cityDeliveryTime = methods.watch("cityDeliveryTime") as DeliveryTime;
    const stateDeliveryTime = methods.watch(
      "stateDeliveryTime"
    ) as DeliveryTime;
    const selectedStateDeliveryTime = methods.watch(
      "selectedStateDeliveryTime"
    ) as DeliveryTime;
    const countryDeliveryTime = methods.watch(
      "countryDeliveryTime"
    ) as DeliveryTime;
    const selectedStatesIds = methods.watch("selectedStatesIds");
    const [scopeTime, setScopeTime] = useState<number>(
      data.workingShift === WorkingShift.Morning
        ? 0
        : data.workingShift === WorkingShift.MorningAndAfternoon
        ? 1
        : 2
    );

    const [selectCity, setSelectCity] = useState<boolean>(
      data.cityDeliveryTime ? true : false
    );
    const [selectInternalState, setSelectInternalState] = useState<boolean>(
      data.stateDeliveryTime ? true : false
    );
    const [selectCountry, setCountry] = useState<boolean>(
      data.countryDeliveryTime ? true : false
    );
    const [selectState, setSelectState] = useState<boolean>(
      data.selectedStateDeliveryTime ? true : false
    );
    const [stateSelected, setStateSelected] = useState<SelectorOptions[]>();

    return (
      <FormContext {...methods}>
        <div className="top-settingStore-seller">
          <div className="part-settingStore-seller">
            <Container title="ویرایش اطلاعات هویتی">
              <div className="first-settingStore-seller first-withBorder-settingStore-seller">
                <p>اطلاعات فروشگاه/شرکت</p>
                <Button
                  to={`/seller/settingstore/editstores/${data.id}`}
                  padding="0.4rem 1rem"
                  margin="0.35rem 0"
                  fontSize="0.8rem"
                  type="main"
                  text="ویرایش"
                />
              </div>
              <div className="first-settingStore-seller">
                <p>اطلاعات مالک/مدیرعامل</p>
                <Button
                  to={`/seller/settingstore/editseller/${data.id}`}
                  padding="0.4rem 1rem"
                  margin="0.35rem 0"
                  fontSize="0.8rem"
                  type="main"
                  text="ویرایش"
                />
              </div>
            </Container>
          </div>
          <div className="part-settingStore-seller">
            <Container height="100%" title="ویرایش اطلاعات مالی">
              <p className="infoMany-settingStore-seller">
                برای تغییر اطلاعات مالی لازم است ابتدا فرم زیر را انلود کرده و
                پس از تکمیل آن رامهر پ امضا نمایید و از طریق مرکز بارگزاری مدارک
                آن را برای اعمال تغییرات آپلود نمایید
              </p>
              <div className="btnBox-settingStore-seller">
                <Button
                  padding="0.3rem 0.95rem"
                  margin="0.5rem 0 0 0"
                  type="extra"
                  fontSize="0.8rem"
                  text="دانلود فرم تغییر اطلاعات مالی"
                />
              </div>
            </Container>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bottom-settingStore-seller">
          <Container width="100%" title="ویرایش تعهدات مکانی/زمانی فروش">
            <div className="item-settingStore-seller">
              <div className="field-item-settingStore-seller">
                <input
                  onChange={e => setSelectCity(e.target.checked)}
                  type="checkbox"
                  name="cityDeliveryTime"
                  checked={selectCity}
                  value="innercity"
                />
                <p className="checkBox-settingStore-seller">داخل شهری</p>
                {selectCity && (
                  <Selector
                    name="cityDeliveryTime"
                    width="14rem"
                    style={{ fontSize: "0.8rem", marginLeft: "1rem" }}
                    placeholder=""
                    disable={!selectCity}
                    defaultValue={DeliveryTimeState.find(
                      ({ value }) => value === data.cityDeliveryTime
                    )}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === cityDeliveryTime
                    )}
                    options={DeliveryTimeState}
                    onChange={(option: SelectorOptionsDeliverTime) =>
                      methods.setValue("cityDeliveryTime", option.value)
                    }
                  />
                )}
              </div>
              <div className="field-item-settingStore-seller">
                <input
                  onChange={e => setSelectInternalState(e.target.checked)}
                  type="checkbox"
                  name="stateDeliveryTime"
                  checked={selectInternalState}
                  value="innercity"
                />
                <p className="checkBox-settingStore-seller">داخل استانی</p>
                {selectInternalState ? (
                  <Selector
                    name="stateDeliveryTime"
                    width="14rem"
                    style={{ fontSize: "0.8rem", marginLeft: "1rem" }}
                    placeholder=""
                    disable={!selectCity}
                    defaultValue={DeliveryTimeState.find(
                      ({ value }) => value === data.stateDeliveryTime
                    )}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === stateDeliveryTime
                    )}
                    options={DeliveryTimeState}
                    onChange={(option: SelectorOptionsDeliverTime) =>
                      methods.setValue("stateDeliveryTime", option.value)
                    }
                  />
                ) : (
                  <div style={{ width: "15rem" }}></div>
                )}
              </div>
            </div>

            <div className="item-settingStore-seller">
              <div className="field-item-settingStore-seller">
                <input
                  onChange={e => setSelectState(e.target.checked)}
                  type="checkbox"
                  name="selectedStateDeliveryTime"
                  checked={selectState}
                  value="innercity"
                />
                <p className="checkBox-settingStore-seller">استان های منتخب</p>
                {selectState && (
                  <Selector
                    name="selectedStateDeliveryTime"
                    width="14rem"
                    style={{ fontSize: "0.8rem", marginLeft: "1rem" }}
                    placeholder=""
                    disable={!selectCity}
                    defaultValue={DeliveryTimeState.find(
                      ({ value }) => value === data.selectedStateDeliveryTime
                    )}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === selectedStateDeliveryTime
                    )}
                    options={DeliveryTimeState}
                    onChange={(option: SelectorOptionsDeliverTime) =>
                      methods.setValue(
                        "selectedStateDeliveryTime",
                        option.value
                      )
                    }
                  />
                )}
              </div>
              <div className="field-item-settingStore-seller">
                <input
                  onChange={e => setCountry(e.target.checked)}
                  type="checkbox"
                  name="placeActivity"
                  checked={selectCountry}
                  value="innercity"
                />
                <p className="checkBox-settingStore-seller">سراسر کشور</p>
                {selectCountry ? (
                  <Selector
                    name="countryDeliveryTime"
                    width="14rem"
                    style={{ fontSize: "0.8rem", marginLeft: "1rem" }}
                    placeholder=""
                    disable={!selectCity}
                    defaultValue={DeliveryTimeState.find(
                      ({ value }) => value === data.countryDeliveryTime
                    )}
                    value={DeliveryTimeState.find(
                      ({ value }) => value === countryDeliveryTime
                    )}
                    options={DeliveryTimeState}
                    onChange={(option: SelectorOptionsDeliverTime) =>
                      methods.setValue("countryDeliveryTime", option.value)
                    }
                  />
                ) : (
                  <div style={{ width: "15rem" }}></div>
                )}
              </div>
            </div>
            <div className="item-settingStore-seller">
              <StateParser
                type="updateStoreSpatialCommitments"
                className="state_parser"
                classNameLabel="state_parser_label"
                defaultValue={data && data.selectedStatesIds}
                isMulti={true}
                name="selectedStatesIds"
                label="انتخاب استان های منتخب"
                useStateProps={{
                  setStateSelected,
                  stateSelected
                }}
                placeholder=""
                selectorStyles={{
                  width: "100%",
                  height: "1.7rem"
                }}
              />
            </div>
            <div className="item-settingStore-seller">
              <SelectBoxRegister
                label="زمان سرویس دهی فروشگاه"
                change={setScopeTime}
                select={scopeTime}
                styleBox={{ width: "14rem" }}
                style={{
                  height: "2rem",
                  display: "flex",
                  alignItems: "center"
                }}
                labelStyle={{
                  fontSize: "0.8rem",
                  width: "9.5rem",
                  color: "#2b2b2b",
                  marginLeft: "13px",
                  padding: "0.3rem"
                }}
                nameFields={["8 تا 15", "8 تا 22", "24 ساعته"]}
              />

              {/* <Selector
                label="روزهای تعطیل فروشگاه"
                options={[]}
                labelStyle={{
                  fontSize: "0.8rem",
                  width: "9.5rem",
                  color: "#2b2b2b",
                  marginLeft: "13px",
                  padding: "0.3rem"
                }}
                width="14rem"
                style={{ display: "flex", alignItems: "center" }}
                name="innerCity"
                placeholder=""
              /> */}
            </div>
          </Container>
          <div className="buttonBox-settingStore-seller">
            <Button
              type="main"
              mainType="submit"
              text="ثبت تغییرات"
              isLoading={result.loading}
              padding="0.4rem 1.2rem"
              margin="0 0.5rem"
            />
            <Button
              type="cancel"
              text="انصراف"
              mainType="button"
              padding="0.4rem 1.2rem"
              margin="0 0.5rem"
            />
          </div>
        </form>
      </FormContext>
    );
  };
  const dataState = useStateForStoreQuery(
    { error: CustomError, loading: Loader },
    {},
    client
  ).data;
  const ResponseSpatial = useGetStoreSpatialCommitmentsQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { id: meId ? meId.me!.userToSites![0].site!.id : "" },
    client
  ).Response;

  // const ParseSelectedState = () => {
  //   let options: SelectorOptions[] = [];
  //   if (dataState) {
  //     options = dataState.getStates.reduce<SelectorOptions[]>(
  //       (options: SelectorOptions[], option: getStates_getStates) => {
  //         options.push({ label: option.name, value: option.id });
  //         return options;
  //       },
  //       []
  //     );
  //   }

  //   let optionsDefault: SelectorOptions[] = [];

  //   // if (data && data!.getStore.selectedStates) {
  //   //   data!.getStore.selectedStates.map(selectedStates => {
  //   //     optionsDefault.push({
  //   //       label: selectedStates.name,
  //   //       value: selectedStates.id
  //   //     });
  //   //   });
  //   // }

  //   return (
  //     <Selector
  //       placeholder=""
  //       labelStyle={{
  //         fontSize: "0.8rem",
  //         width: "9.5rem",
  //         color: "#2b2b2b",
  //         marginLeft: "13px",
  //         padding: "0.3rem"
  //       }}
  //       name="selectedStatesIds"
  //       width="100%"
  //       label="انتخاب استان های منتخب"
  //       style={{ width: "100%", display: "flex", alignItems: "center" }}
  //       isMulti={true}
  //       className="selector"
  //       options={options}
  //       defaultValue={optionsDefault}
  //       value={options.find(({ value }) => value === countryDeliveryTime)}
  //       onChange={(option: SelectorOptionsDeliverTime) => {
  //         setValue("countryDeliveryTime", option.value);
  //       }}
  //     />
  //   );
  // };

  return (
    <ContainerClient colorHeader="blue" textHeader="حسابداری و گزارشات">
      {meId &&
        meId.me &&
        meId.me.userToSites &&
        meId.me.userToSites[0].site &&
        meId.me.userToSites[0].site.id &&
        ResponseSpatial}

      <Route
        exact
        path="/seller/settingstore/editstores/:id"
        render={props => <ModalEditInfoStore {...props} />}
      />
      <Route
        exact
        path="/seller/settingstore/editseller/:id"
        render={props => <ModalEditInfoSeller {...props} />}
      />
    </ContainerClient>
  );
};
