import { useStateCitiesQuery, useStatesQuery } from "@satek/hooks";
import {
  ActivityScope,
  ActivityType,
  Gender,
  getStateCities_getState,
  getStates_getStates,
  LegalPerson,
  StoreType
} from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";
import {
  ConvertDateToDatePicker,
  ConvertDateToMiladi
} from "../../../function/ConvertDate";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";
import { ItemRegister } from "../../ComponentShare/ItemRegister";
import { ItemRegisterLeft } from "../../ComponentShare/ItemRegisterLeft";
import { SelectBoxRegister } from "../../ComponentShare/SelectBoxRegister";

interface Props extends RouteComponentProps {}

export const RegisterStoreOrganizationView: React.FC<Props> = ({ history }) => {
  const optionsActivity: SelectorOptions[] = [
    { label: "دارویی", value: ActivityScope.Drug },
    { label: "پزشکی", value: ActivityScope.Medicine },
    { label: "دیگر", value: ActivityScope.Other }
  ];

  const optionsActivityType: SelectorOptions[] = [
    { label: "تولید کننده", value: ActivityType.Manufacturer },
    { label: "واردکننده", value: ActivityType.Importer },
    { label: "توزیع کننده", value: ActivityType.Wholesaler },
    { label: "فروشنده خرد", value: ActivityType.Dropshipper }
  ];
  const [selectStoreCompany, setSelectStoreCompany] = useState<number>(0);
  const [personalityType, setPersonalityType] = useState<number>(0);
  let registerStorage: any;
  if (localStorage.getItem("register")) {
    registerStorage = JSON.parse(localStorage.getItem("register")!);
  }
  const [selectSex, setSelectSex] = useState<number>(0);
  const [historySubmit, setHistorySubmit] = useState(
    registerStorage
      ? registerStorage[0].ceoBirthDate
        ? ConvertDateToDatePicker(registerStorage[0].ceoBirthDate)
        : null
      : null
  );
  const { register, handleSubmit, watch, setValue } = useForm();

  const Parse: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
    console.log(data, "data");
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    console.log(
      options,
      "options",
      options.find(({ value }) => value === stateId, stateId)
    );

    return (
      <Selector
        name="stateId"
        width="100%"
        style={{ display: "flex", alignItems: "center", width: "63%" }}
        label="استان/شهرستان"
        labelStyle={{
          color: "black",
          fontSize: "0.65rem",
          width: "5rem",
          fontFamily: "IRANSANS_LIGHT"
        }}
        placeholder=""
        options={options}
        value={options.find(({ value }) => value === stateId)}
        onChange={(option: SelectorOptions) => {
          setValue("cityId", "");
          setValue("stateId", option.value);
        }}
      />
    );
  };

  const ParseBirth: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="ceoStateId"
        placeholder=""
        style={{ display: "flex", alignItems: "center", width: "63%" }}
        options={options}
        label="محل تولد"
        labelStyle={{
          color: "black",
          fontSize: "0.65rem",
          width: "5rem",
          fontFamily: "IRANSANS_LIGHT"
        }}
        value={options.find(({ value }) => value === ceoStateId)}
        onChange={(option: SelectorOptions) => {
          setValue("ceoCityId", "");
          setValue("ceoStateId", option.value);
        }}
      />
    );
  };
  const StateCitiesFiledBirth: React.FC<{ data: getStateCities_getState }> = ({
    data
  }) => {
    if (data.cities) {
      let options = data.cities.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);

      return (
        <Selector
          name="ceoCityId"
          placeholder="انتخاب شهر"
          style={{ width: "35%" }}
          options={options}
          value={options.find(({ value }) => value === ceoCityId)}
          onChange={(option: SelectorOptions) =>
            setValue("ceoCityId", option.value)
          }
        />
      );
    }

    return null;
  };
  const StateCitiesFiled: React.FC<{ data: getStateCities_getState }> = ({
    data
  }) => {
    if (data.cities) {
      let options = data.cities.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);

      return (
        <Selector
          name="cityId"
          placeholder="انتخاب شهر"
          options={options}
          style={{ width: "35%" }}
          value={options.find(({ value }) => value === cityId)}
          onChange={(option: SelectorOptions) =>
            setValue("cityId", option.value)
          }
        />
      );
    }

    return null;
  };

  const onSubmit = handleSubmit(variables => {
    let typeStore: object = { storeType: "store" };
    let typeSex: object = { ceoGender: "Male" };
    console.log("variables", variables.name);
    console.log(variables);
    let typeLegalPerson: object = { legalPerson: "Natural" };
    switch (selectStoreCompany) {
      case 0:
        typeStore = { storeType: StoreType.Store };
        break;
      case 1:
        typeStore = { storeType: StoreType.Company };
        break;
      default:
        break;
    }
    switch (personalityType) {
      case 0:
        typeLegalPerson = { legalPerson: LegalPerson.Natural };
        break;
      case 1:
        typeLegalPerson = { legalPerson: LegalPerson.Juridical };
        break;
      default:
        break;
    }
    switch (selectSex) {
      case 0:
        typeSex = { ceoGender: Gender.Male };
        break;
      case 1:
        typeSex = { ceoGender: Gender.Female };
        break;
      default:
        break;
    }
    variables.contact = variables.phoneContact + "" + variables.codeContact;
    variables.ceoContact =
      variables.phoneCeoContact + "" + variables.codeCeoContact;
    variables.activityScope = ActivityScope.Medicine;
    if (historySubmit) {
      variables.ceoBirthDate = ConvertDateToMiladi(historySubmit!);
    } else {
      return;
    }
    variables = Object.assign(
      {},
      variables,
      typeSex,
      typeStore,
      typeLegalPerson
    );
    let levelOneRegister: [object] = JSON.parse(
      localStorage.getItem("register")!
    );
    if (levelOneRegister) {
      levelOneRegister[0] = variables;
      localStorage.setItem("register", JSON.stringify(levelOneRegister));
    } else {
      localStorage.setItem("register", JSON.stringify([variables]));
    }
    history.push("/register/photodocumentsmanager");
  });

  const stateId = watch("stateId");
  const activityScope = watch("activityScope");
  const activityType = watch("activityType");
  const cityId = watch("cityId");
  const ceoStateId = watch("ceoStateId");
  const ceoCityId = watch("ceoCityId");

  const StateResp = useStateCitiesQuery(
    { error: CustomError, loading: Loader, parsing: StateCitiesFiled },
    { id: stateId ? stateId + "" : "" },
    client
  );
  const { Response } = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {},
    client
  );
  const StateRespbirth = useStateCitiesQuery(
    { error: CustomError, loading: Loader, parsing: StateCitiesFiledBirth },
    { id: ceoStateId ? ceoStateId + "" : "" },
    client
  );
  const ResponseBirth = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: ParseBirth },
    {},
    client
  ).Response;
  React.useEffect(() => {
    register({ name: "ceoStateId" });
    register({ name: "ceoCityId" });
    register({ name: "activityType" });
    register({ name: "activityScope" });
    register({ name: "stateId" });
    register({ name: "cityId" });
    if (registerStorage) {
      registerStorage[0].stateId &&
        setValue("stateId", registerStorage[0].stateId);

      registerStorage[0].cityId &&
        setValue("cityId", registerStorage[0].cityId);

      registerStorage[0].ceoCityId &&
        setValue("ceoCityId", registerStorage[0].ceoCityId);

      registerStorage[0].ceoStateId &&
        setValue("ceoStateId", registerStorage[0].ceoStateId);
      console.log("slam");
      registerStorage[0].storeType === StoreType.Store
        ? setSelectStoreCompany(0)
        : setSelectStoreCompany(1);
      registerStorage[0].legalPerson === LegalPerson.Natural
        ? setPersonalityType(0)
        : setPersonalityType(1);
      registerStorage[0].ceoGender === Gender.Male
        ? setSelectSex(0)
        : setSelectSex(1);
    }
  }, [register, registerStorage, setValue]);
  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      textLink="افزودن اطلاعات سایر مالکین +"
      title="ثبت اطلاعات هویتی"
    >
      {console.log(selectStoreCompany)}
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="itemregister-selector">
          <div className="boxSelectStoreOrCompany">
            <SelectBoxRegister
              label="نوع فعالیت"
              labelStyle={{
                color: "black",
                fontSize: "0.65rem",
                width: "5rem",
                fontFamily: "IRANSANS_LIGHT"
              }}
              change={setSelectStoreCompany}
              select={selectStoreCompany}
              textFiledStyle={{ fontSize: "0.6rem" }}
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: "100%"
              }}
              nameFields={["فروشگاه های مجاز", "شرکت ها و موسسات"]}
            />
          </div>
        </div>
        {selectStoreCompany === 0 ? (
          <>
            <ItemRegister nameField={"نوع شخصیت"}>
              <div className="partRightRegisterStoreOrgan">
                <p className="textRegister">نوع شخصیت</p>

                <SelectBoxRegister
                  change={setPersonalityType}
                  select={personalityType}
                  style={{ height: "100%" }}
                  nameFields={["حقیقی", "حقوقی"]}
                />
              </div>
              <ItemRegisterLeft nameField="نام فروشگاه">
                <input
                  name="name"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].name &&
                    registerStorage[0].name
                  }
                  className="inputFormRegisterStoreOrganLeft"
                  type="text"
                  ref={register}
                />
              </ItemRegisterLeft>
            </ItemRegister>
            <ItemRegister nameField={"کد اقتصادی"}>
              <div className="partRightRegisterStoreOrgan input-dir-left-RegisterStoreOrgan">
                <p className="textRegister">کد اقتصادی</p>

                <input
                  name="economicCode"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].economicCode &&
                    registerStorage[0].economicCode
                  }
                  className="inputFormRegisterStoreOrgan"
                  type="text"
                  ref={register}
                />
              </div>
              <ItemRegisterLeft nameField="شناسه ملی">
                <input
                  name="nationalId"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].nationalId &&
                    registerStorage[0].nationalId
                  }
                  className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
                  type="text"
                  ref={register}
                />
              </ItemRegisterLeft>
            </ItemRegister>
          </>
        ) : (
          <React.Fragment>
            <ItemRegister nameField={"نام شرکت"}>
              <div className="partRightRegisterStoreOrgan">
                <p className="textRegister">نام شرکت</p>
                <input
                  name="name"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].name &&
                    registerStorage[0].name
                  }
                  className="inputFormRegisterStoreOrgan"
                  ref={register}
                />
              </div>
              <ItemRegisterLeft nameField="شماره ثبت">
                <input
                  name="economicCode"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].economicCode &&
                    registerStorage[0].economicCode
                  }
                  className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
                  ref={register}
                  type="text"
                />
              </ItemRegisterLeft>
            </ItemRegister>
            <ItemRegister nameField={"زمینه فعالیت"}>
              <div className="partRightRegisterStoreOrgan">
                <Selector
                  name="activityScope"
                  width="100%"
                  style={{ display: "flex", alignItems: "center" }}
                  label="زمینه فعالیت"
                  labelStyle={{
                    color: "black",
                    fontSize: "0.65rem",
                    width: "5rem",
                    fontFamily: "IRANSANS_LIGHT"
                  }}
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].activityScope && {
                      label: optionsActivity.find(
                        ({ value }) =>
                          value === registerStorage[0].activityScope
                      )!.label,
                      value: registerStorage[0].activityScope
                    }
                  }
                  value={optionsActivity.find(
                    ({ value }) => value === activityScope
                  )}
                  options={optionsActivity}
                  className="selector-inputFormRegisterStoreOrgan"
                  placeholder=""
                  onChange={(option: SelectorOptions) => {
                    setValue("activityScope", option.value);
                  }}
                />
              </div>
              <ItemRegisterLeft nameField="دامنه فعالیت">
                <Selector
                  name="activityType"
                  defaultValue={
                    registerStorage &&
                    registerStorage[0].activityType && {
                      label: optionsActivityType.find(
                        ({ value }) => value === registerStorage[0].activityType
                      )!.label,
                      value: registerStorage[0].activityType
                    }
                  }
                  options={optionsActivityType}
                  value={optionsActivityType.find(
                    ({ value }) => value === activityType
                  )}
                  className="selector-inputFormRegisterStoreOrganLeft"
                  placeholder=""
                  onChange={(option: SelectorOptions) => {
                    setValue("activityType", option.value);
                  }}
                />
              </ItemRegisterLeft>
            </ItemRegister>
          </React.Fragment>
        )}
        <ItemRegister nameField={"استان/شهرستان"}>
          <div className="partRightRegisterStoreOrgan partRightRegisterStoreOrgan-justify">
            {Response}
            {stateId && StateResp.Response}
          </div>
          <ItemRegisterLeft nameField="کدپستی">
            <input
              name="postalCode"
              defaultValue={
                registerStorage &&
                registerStorage[0].postalCode &&
                registerStorage[0].postalCode
              }
              className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
              ref={register}
              type="text"
            />
          </ItemRegisterLeft>
        </ItemRegister>
        <div className="itemRegisterTextarea">
          <p className="textRegister">آدرس</p>

          <div className="itemInputRegister">
            <textarea
              name="address"
              defaultValue={
                registerStorage &&
                registerStorage[0].address &&
                registerStorage[0].address
              }
              ref={register}
              className="textareaAddress"
            />
          </div>
        </div>
        <ItemRegister nameField={"تلفن ثابت"}>
          <div className="partRightRegisterStoreOrgan">
            <p className="textRegister">تلفن ثابت</p>
            <input
              name="phoneContact"
              type="text"
              defaultValue={
                registerStorage &&
                registerStorage[0].phoneContact &&
                registerStorage[0].phoneContact
              }
              ref={register}
              className="inputTelephoneRegister input-dir-left-RegisterStoreOrgan"
            />
          </div>
          <ItemRegisterLeft nameField="ایمیل">
            <input
              name="email"
              className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
              type="email"
              defaultValue={
                registerStorage &&
                registerStorage[0].email &&
                registerStorage[0].email
              }
              ref={register}
            />
          </ItemRegisterLeft>
        </ItemRegister>
        <div className="itemregister-selector">
          <div className="itemTextRegister">
            <p className="textInfoManagerRegisterHeader">
              اطلاعات مدیر فروشگاه
            </p>
          </div>
          <div className="itemInputRegister">
            <div className="lineInfoManagerHeader"></div>
          </div>
        </div>
        <ItemRegister nameField={"نام و نام خانوادگی"}>
          <div className="partRightRegisterStoreOrgan partRightRegisterStoreOrgan-justify">
            <div className="partRightRegisterStoreOrgan_right">
              <p className="textRegister">نام</p>
              <input
                name="ceoFirstName"
                defaultValue={
                  registerStorage &&
                  registerStorage[0].ceoFirstName &&
                  registerStorage[0].ceoFirstName
                }
                ref={register}
                className="inputFormRegisterStoreOrgan"
                type="text"
              />
            </div>
            <div className="partRightRegisterStoreOrgan_left">
              <p className="textRegister textRegister-left">نام خانوادگی</p>
              <input
                name="ceoLastName"
                defaultValue={
                  registerStorage &&
                  registerStorage[0].ceoLastName &&
                  registerStorage[0].ceoLastName
                }
                ref={register}
                className="inputFormRegisterStoreOrgan"
                type="text"
              />
            </div>
          </div>
          <ItemRegisterLeft nameField="کدملی">
            <input
              name="ceoSsn"
              defaultValue={
                registerStorage &&
                registerStorage[0].ceoSsn &&
                registerStorage[0].ceoSsn
              }
              ref={register}
              className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
              type="text"
            />
          </ItemRegisterLeft>
        </ItemRegister>
        <ItemRegister nameField={"تلفن همراه"}>
          <div className="partRightRegisterStoreOrgan">
            <p className="textRegister">تلفن همراه</p>
            <input
              name="mobileNumber"
              defaultValue={
                registerStorage &&
                registerStorage[0].mobileNumber &&
                registerStorage[0].mobileNumber
              }
              className="inputFormRegisterStoreOrgan input-dir-left-RegisterStoreOrgan"
              type="text"
              ref={register}
            />
          </div>
          <div className="partLeftRegisterStoreOrgan">
            <p className="textRegister">تاریخ تولد</p>

            <div className="boxBirthLeft">
              <div className="birthLeft">
                <div className="registerPartBirth">
                  <DatePicker
                    value={historySubmit}
                    onChange={setHistorySubmit}
                    shouldHighlightWeekends
                    locale="fa"
                    wrapperClassName="input-date-inputBirth"
                    calendarClassName="responsive-calendar-registerOrgan"
                    inputPlaceholder=" "
                  />
                  {/* <input
                      name="ceoBirthDate"
                      type="date"
                      value="2018-07-22"
                      min="2018-01-01"
                      max="2018-12-31"
                      ref={register}
                      className="inputBirth"
                    /> */}
                </div>
                <div className="boxSex">
                  <div className="itemTextRegister textSexSelector">
                    <p className="textRegistersex">جنسیت</p>
                  </div>
                  <div className="BoxSelectSex">
                    <SelectBoxRegister
                      change={setSelectSex}
                      style={{ height: "100%" }}
                      select={selectSex}
                      nameFields={["مرد", "زن"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ItemRegister>
        {console.log(stateId, "stateId")}
        <ItemRegister nameField={"محل تولد"}>
          <div className="partRightRegisterStoreOrgan partRightRegisterStoreOrgan-justify">
            {ResponseBirth}
            {ceoStateId && StateRespbirth.Response}
          </div>
          <ItemRegisterLeft nameField="کدپستی">
            <input
              name="ceoPostalCode"
              defaultValue={
                registerStorage &&
                registerStorage[0].ceoPostalCode &&
                registerStorage[0].ceoPostalCode
              }
              className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
              type="text"
              ref={register}
            />
          </ItemRegisterLeft>
        </ItemRegister>
        <div className="itemRegisterTextarea">
          <p className="textRegister">آدرس</p>

          <div className="itemInputRegister">
            <textarea
              name="ceoAddress"
              ref={register}
              defaultValue={
                registerStorage &&
                registerStorage[0].ceoAddress &&
                registerStorage[0].ceoAddress
              }
              className="textareaAddress"
            ></textarea>
          </div>
        </div>
        <ItemRegister nameField={"تلفن ثابت"}>
          <div className="partRightRegisterStoreOrgan">
            <p className="textRegister">تلفن ثابت</p>
            <input
              name="phoneCeoContact"
              type="text"
              defaultValue={
                registerStorage &&
                registerStorage[0].phoneCeoContact &&
                registerStorage[0].phoneCeoContact
              }
              ref={register}
              className="inputTelephoneRegister input-dir-left-RegisterStoreOrgan"
            />
          </div>
          <ItemRegisterLeft nameField="ایمیل">
            <input
              name="ceoEmail"
              className="inputFormRegisterStoreOrganLeft input-dir-left-RegisterStoreOrgan"
              type="email"
              defaultValue={
                registerStorage &&
                registerStorage[0].ceoEmail &&
                registerStorage[0].ceoEmail
              }
              ref={register}
            />
          </ItemRegisterLeft>
        </ItemRegister>

        <div className="bottomBodyBoxRegisterStoreContainer">
          <div className="itemContainerRegisterStore">
            <Button
              text="مرحله بعدی"
              type="main"
              mainType="submit"
              padding="0.5rem 0.8rem 0.5rem 0.8rem"
            />

            <a className="link-ContainerRegister-register" href="$">
              افزودن اطلاعات سایر مالکین +
            </a>
          </div>
        </div>
      </form>
    </ContainerRegister>
  );
};
