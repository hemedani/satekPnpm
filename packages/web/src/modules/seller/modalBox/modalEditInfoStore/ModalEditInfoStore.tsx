import {
  useCitiesQuery,
  useGetInfoStoreQuery,
  useUpdateInfoStoreMutate
} from "@satek/hooks";
import {
  getCities_getCities,
  getInfoStore_getStore,
  updateStoreVariables
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
import { ItemRegister } from "../../../register/ComponentShare/ItemRegister";
import { ItemRegisterLeft } from "../../../register/ComponentShare/ItemRegisterLeft";

interface Props extends RouteComponentProps {}
export const ModalEditInfoStore: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  const { id } = useParams();
  const [fromAdmin, setFromAdmin] = useState(
    path.includes("/admin/storesmanagement/modaleditstore")
  );

  const goBack = () => (history ? history.goBack() : null);

  const Parse: React.FC<{ data: getInfoStore_getStore }> = ({ data }) => {
    const methods = useForm<updateStoreVariables>();
    useEffect(() => {
      methods.register({ name: "stateId" });
      methods.register({ name: "cityId" });
    });
    const stateId = methods.watch("stateId");
    const cityId = methods.watch("cityId");
    const onSubmit = methods.handleSubmit(async variables => {
      console.log(variables, "variables");
      variables.id = id ? id : "";
      try {
        const result = await updateInfoStoreMutate({ variables });
      } catch (e) {
        console.log(e);
      }
      history.goBack();
    });

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
          name="cityId"
          width="7rem"
          placeholder="انتخاب شهر"
          options={options}
          value={options.find(({ value }) => value === cityId)}
          onChange={(option: SelectorOptions) => {
            methods.setValue("cityId", option.value);
          }}
          defaultValue={options.find(({ value }) => value === data.city!.id)}
        />
      );
    };

    const { Response: ResponseStateCities } = useCitiesQuery(
      { error: CustomError, loading: Loader, parsing: ParseStateCities },
      {
        stateId: stateId ? stateId : data!.state!.id
      },
      client
    );

    const { updateInfoStoreMutate } = useUpdateInfoStoreMutate(
      { id: id ? id : "" },
      client
    );
    return (
      <FormContext {...methods}>
        <form onSubmit={onSubmit} className="formRegisterStore">
          <div className="container-modalEditInfoSeller">
            <div className="body-modalEditInfoSeller">
              <ItemRegister nameField={"نام شرکت"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    name="name"
                    defaultValue={data ? data.name : ""}
                    disabled={fromAdmin ? false : true}
                    className={
                      fromAdmin
                        ? "inputFormRegisterStoreOrgan"
                        : "inputFormRegisterStoreOrgan none-border"
                    }
                    ref={methods.register}
                    type="text"
                  />
                </div>
                <ItemRegisterLeft nameField="شماره ثبت">
                  <input
                    name="economicCode"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.economicCode
                        : ""
                    }
                    className={
                      fromAdmin
                        ? "inputFormRegisterStoreOrganLeft"
                        : "inputFormRegisterStoreOrganLeft none-border"
                    }
                    disabled={fromAdmin ? false : true}
                    ref={methods.register}
                    type="text"
                  />
                </ItemRegisterLeft>
              </ItemRegister>
              <ItemRegister nameField={"زمینه فعالیت"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    disabled={fromAdmin ? false : true}
                    defaultValue={data ? data.activityScope : ""}
                    name="activityScope"
                    className={
                      fromAdmin
                        ? "inputFormRegisterStoreOrgan"
                        : "inputFormRegisterStoreOrgan none-border"
                    }
                    ref={methods.register}
                    type="text"
                  />
                </div>
                <ItemRegisterLeft nameField="دامنه فعالیت">
                  <input
                    disabled={fromAdmin ? false : true}
                    //   ref={register}
                    //   name="scopeActivity"
                    className={
                      fromAdmin
                        ? "inputFormRegisterStoreOrganLeft"
                        : "inputFormRegisterStoreOrganLeft none-border"
                    }
                    type="text"
                  />
                </ItemRegisterLeft>
              </ItemRegister>
              <ItemRegister nameField={"استان/شهرستان"}>
                <div className="partRightRegisterStoreOrgan">
                  <StateParser
                    label={false}
                    selectorStyles={{ width: "7rem" }}
                    className="state_parser"
                    name="stateId"
                    type="updateStore"
                    defaultValue={data && data.state!}
                  />
                  {ResponseStateCities}
                </div>
                <ItemRegisterLeft nameField="کدپستی">
                  <input
                    ref={methods.register}
                    name="postalCode"
                    className="inputFormRegisterStoreOrganLeft"
                    defaultValue={
                      data && data.storeDetails
                        ? data.storeDetails.postalCode
                        : ""
                    }
                    type="text"
                  />
                </ItemRegisterLeft>
              </ItemRegister>
              <div className="itemRegisterTextarea">
                <div className="itemTextContainerRegister">
                  <p className="textRegister">آدرس</p>
                </div>
                <div className="itemInputRegister">
                  <textarea
                    name="address"
                    defaultValue={data && data.address}
                    ref={methods.register}
                    className="textareaAddress"
                  />
                </div>
              </div>
              <ItemRegister nameField={"تلفن ثابت"}>
                <div className="partRightRegisterStoreOrgan">
                  <input
                    name="contact"
                    type="text"
                    defaultValue={data ? data.contact + "" : ""}
                    ref={methods.register}
                    className="inputTelephoneRegister"
                  />
                </div>
                <ItemRegisterLeft nameField="ایمیل">
                  <input
                    name="email"
                    className="inputFormRegisterStoreOrganLeft"
                    defaultValue={
                      data && data.storeDetails ? data.storeDetails.email : ""
                    }
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
              text="تایید اطلاعات"
              type="main"
            />
            <Button
              padding="0.4rem 1.2rem"
              margin="0 1rem"
              mainType="button"
              text="انصراف"
              onClick={goBack}
              type="cancel"
            />
          </div>
        </form>
      </FormContext>
    );
  };
  const { Response: ParsResponse } = useGetInfoStoreQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { id: id ? id : "" },
    client
  );

  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="ویرایش اطلاعات فروشگاه"
      display="flex"
    >
      {id && ParsResponse}
    </ModalBox>
  );
};
