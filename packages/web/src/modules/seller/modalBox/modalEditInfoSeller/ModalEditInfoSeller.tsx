import {
  useCitiesQuery,
  useGetInfoSellerQuery,
  useUpdateInfoSellerMutate
} from "@satek/hooks";
import {
  Gender,
  getCities_getCities,
  getInfoSeller_getStore,
  updateInfoSellerVariables
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../Apollo";
import { StateParser } from "../../../admin/user/components/parsers/StateParser";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";
import { ConvertDateToShamsi } from "../../../function/ConvertDate";
import { ItemRegister } from "../../../register/ComponentShare/ItemRegister";
import { ItemRegisterLeft } from "../../../register/ComponentShare/ItemRegisterLeft";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

interface Props extends RouteComponentProps {}
export const ModalEditInfoSeller: React.FC<Props> = ({ history }) => {
  const { id } = useParams();
  const goBack = () => (history ? history.goBack() : null);

  const Parse: React.FC<{ data: getInfoSeller_getStore }> = ({ data }) => {
    const methods = useForm<updateInfoSellerVariables>();
    useEffect(() => {
      methods.register({ name: "ceoStateId" });
      methods.register({ name: "ceoCityId" });
    });

    const ceoStateId = methods.watch("ceoStateId");
    const ceoCityId = methods.watch("ceoCityId");

    const ParseStateCities: React.FC<{ data: getCities_getCities[] }> = ({
      data: dataCity
    }) => {
      let options = dataCity.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);
      return (
        <Selector
          className="selector"
          name="ceoCityId"
          width="7rem"
          placeholder="انتخاب شهر"
          options={options}
          value={options.find(({ value }) => value === ceoCityId)}
          onChange={(option: SelectorOptions) => {
            methods.setValue("ceoCityId", option.value);
          }}
          defaultValue={options.find(
            ({ value }) => value === data.storeDetails!.ceoCity!.id
          )}
        />
      );
    };

    const { Response: ResponseStateCities } = useCitiesQuery(
      { error: CustomError, loading: Loader, parsing: ParseStateCities },
      {
        stateId: ceoStateId ? ceoStateId : data!.storeDetails!.ceoState!.id
      },
      client
    );

    const [selectSex, setSelectSex] = useState<number>(
      data.storeDetails
        ? data.storeDetails.ceoGender === Gender.Male
          ? 0
          : 1
        : 0
    );
    const { updateInfoSellerMutate, result } = useUpdateInfoSellerMutate(
      { id: id ? id : "" },
      client
    );
    const onSubmit = methods.handleSubmit(async variables => {
      variables.id = id ? id : "";
      delete variables.ceoBirthDate;
      variables.ceoGender = selectSex === 0 ? Gender.Male : Gender.Female;

      console.log(variables);

      const result = await updateInfoSellerMutate({ variables });

      history.goBack();
    });

    return (
      <FormContext {...methods}>
        <form className="formRegisterStore" onSubmit={onSubmit}>
          <div className="container-modalEditInfoSeller">
            <div className="body-modalEditInfoSeller">
              <ItemRegister nameField={"نام و نام خانوادگی"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    name="ceoname"
                    defaultValue={data ? data.ceoname : ""}
                    disabled={true}
                    ref={methods.register}
                    className="inputFormRegisterStoreOrgan none-border"
                    type="text"
                  />
                </div>
                <ItemRegisterLeft nameField="کدملی">
                  <input
                    name="ceoSsn"
                    defaultValue={
                      data && data.storeDetails ? data.storeDetails.ceoSsn : ""
                    }
                    disabled={true}
                    ref={methods.register}
                    className="inputFormRegisterStoreOrganLeft none-border"
                    type="text"
                  />
                </ItemRegisterLeft>
              </ItemRegister>
              <ItemRegister nameField={"تلفن همراه"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    name="mobileNumber"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.mobileNumber
                        : ""
                    }
                    disabled={true}
                    className="inputFormRegisterStoreOrgan none-border"
                    type="text"
                    ref={methods.register}
                  />
                </div>
                <div className="partLeftRegisterStoreOrgan">
                  <div className="itemTextRegister">
                    <p className="textRegister">تاریخ تولد</p>
                  </div>
                  <div className="boxBirthLeft">
                    <div className="containerBoxBirthLeft-modalEditInfoSeller">
                      <div className="birthLeft">
                        <div className="registerPartBirth">
                          <input
                            name="ceoBirthDate"
                            disabled={true}
                            defaultValue={
                              data && data.storeDetails
                                ? ConvertDateToShamsi(
                                    data.storeDetails.ceoBirthDate.split("T")[0]
                                  )
                                : ""
                            }
                            type="text"
                            ref={methods.register}
                            className="inputBirth none-border"
                          />
                        </div>
                        <div className="boxSex">
                          <div className="itemTextRegister textSexSelector">
                            <p className="textRegister">جنسیت</p>
                          </div>
                          <div className="BoxSelectSex">
                            <SelectBoxRegister
                              change={setSelectSex}
                              style={{
                                height: "100%"
                              }}
                              select={selectSex}
                              nameFields={["مرد", "زن"]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ItemRegister>
              <ItemRegister nameField={"محل تولد"}>
                <div className="partRightRegisterStoreOrgan">
                  <StateParser
                    label={false}
                    selectorStyles={{ width: "7rem" }}
                    className="state_parser"
                    name="ceoStateId"
                    type="createUniversity"
                    defaultValue={data && data.storeDetails!.ceoState!}
                  />
                  {ResponseStateCities}
                </div>
                <ItemRegisterLeft nameField="کدپستی">
                  <input
                    name="ceoPostalCode"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.ceoPostalCode
                        : ""
                    }
                    className="inputFormRegisterStoreOrganLeft"
                    type="text"
                    ref={methods.register}
                  />
                </ItemRegisterLeft>
              </ItemRegister>
              <div className="itemRegisterTextarea">
                <div className="itemTextContainerRegister">
                  <p className="textRegister">آدرس</p>
                </div>
                <div className="itemInputRegister">
                  <textarea
                    name="ceoAddress"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.ceoAddress
                        : ""
                    }
                    ref={methods.register}
                    className="textareaAddress"
                  ></textarea>
                </div>
              </div>
              <ItemRegister nameField={"تلفن ثابت"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    name="ceoContact"
                    type="text"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.ceoContact
                        : ""
                    }
                    ref={methods.register}
                    className="inputTelephoneRegister"
                  />
                </div>
                <ItemRegisterLeft nameField="ایمیل">
                  <input
                    name="ceoEmail"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.ceoEmail
                        : ""
                    }
                    className="inputFormRegisterStoreOrganLeft"
                    type="email"
                    ref={methods.register}
                  />
                </ItemRegisterLeft>
              </ItemRegister>
            </div>
          </div>
          <div className="boxButton-modalEditInfoStore-admin">
            <Button
              padding="0.4rem 1.2rem"
              mainType="submit"
              isLoading={result.loading}
              text="تایید اطلاعات"
              type="main"
            />
            <Button
              padding="0.4rem 1.2rem"
              mainType="button"
              margin="0 1rem"
              onClick={goBack}
              text="انصراف"
              type="cancel"
            />
          </div>
        </form>
      </FormContext>
    );
  };

  const { Response: ParsResponse } = useGetInfoSellerQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { id: id ? id : "" },
    client
  );
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="ویرایش اطلاعات مالک"
      display="flex"
    >
      {id && ParsResponse}
    </ModalBox>
  );
};
