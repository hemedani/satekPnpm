import { Field, Form, FormikProps, withFormik } from "formik";
import React, { useState } from "react";
import { Selector } from "../../../componentShare/selectors/Selector";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";
import { ItemRegister } from "../../ComponentShare/ItemRegister";
import { SelectBoxRegister } from "../../ComponentShare/SelectBoxRegister";

interface FormValues {
  firstNameAndLastName: string;
  nationalCode: string;
  cellularPhone: string;
  dateBirth: string;
  provincePlaceBirth: string;
  countyPlaceBirth: string;
  postalCodeStore: string;
  addressStoreManager: string;
  phoneStoreManager: string;
  phoneCodeStoreManager: string;
  emailStoreManager: string;
  jobDescription: string;
}

interface Props {
  submit: (values: FormValues) => Promise<void>;
}

const C: React.FC<FormikProps<FormValues> & Props> = props => {
  const [selectSex, setSelectSex] = useState<number>(0);
  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      textLink="تایید و افزودن مدیر/مالک بعدی +"
      title="ثبت اطلاعات هویتی"
    >
      <Form className="formRegisterStore">
        <div className="itemRegister">
          <div className="itemTextRegister">
            <p className="textInfoManagerRegisterHeader">
              اطلاعات سایر اعضای شرکت/فروشگاه
            </p>
          </div>
          <div className="itemInputRegister">
            <div className="lineInfoManagerHeader"></div>
          </div>
        </div>
        <ItemRegister nameField={"نام و نام خانوادگی"}>
          <div className="partRightRegisterStoreOrgan">
            <Field
              name="firstNameAndLastName"
              className="inputFormRegisterStoreOrgan"
              type="text"
            />
          </div>
          <div className="partLeftRegisterStoreOrgan">
            <div className="itemTextRegister">
              <p className="textRegister">کد ملی</p>
            </div>
            <div className="inputBoxRegisterStoreOrgan">
              <Field
                name="nationalCode"
                className="inputFormRegisterStoreOrganLeft"
                type="text"
              />
            </div>
          </div>
        </ItemRegister>
        <ItemRegister nameField={"تلفن همراه"}>
          <div className="partRightRegisterStoreOrgan">
            <Field
              name="cellularPhone"
              className="inputFormRegisterStoreOrgan"
              type="text"
            />
          </div>
          <div className="partLeftRegisterStoreOrgan">
            <div className="itemTextRegister">
              <p className="textRegister">تاریخ تولد</p>
            </div>
            <div className="boxBirthLeft">
              <div className="containerBoxBirthLeft">
                <div className="birthLeft">
                  <div className="registerPartBirth">
                    <Field
                      name="dateBirth"
                      type="text"
                      className="inputBirth"
                    />
                  </div>
                  <div className="boxSex">
                    <div className="itemTextRegister textSexSelector">
                      <p className="textRegister">جنسیت</p>
                    </div>
                    <div className="BoxSelectSex">
                      <SelectBoxRegister
                        change={setSelectSex}
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
            <Selector
              name="provincePlaceBirth"
              className="selectorInput"
              height="1.7rem"
              placeholder=""
              options={[]}
            />
            <Selector
              name="countyPlaceBirth"
              className="selectorInput"
              height="1.7rem"
              placeholder=""
              options={[]}
            />
          </div>
          <div className="partLeftRegisterStoreOrgan">
            <div className="itemTextRegister">
              <p className="textRegister">کد پستی</p>
            </div>
            <div className="inputBoxRegisterStoreOrgan">
              <Field
                name="postalCodeStore"
                className="inputFormRegisterStoreOrganLeft"
                type="text"
              />
            </div>
          </div>
        </ItemRegister>
        <div className="itemRegisterTextarea">
          <div className="itemTextContainerRegister">
            <p className="textRegister">آدرس</p>
          </div>
          <div className="itemInputRegister">
            <Field
              component="textarea"
              name="addressStoreManager"
              className="textareaAddress"
            ></Field>
          </div>
        </div>
        <ItemRegister nameField={"تلفن ثابت"}>
          <div className="partRightRegisterStoreOrgan">
            <Field
              name="phoneStoreManager"
              type="text"
              className="inputTelephoneRegister"
            />
            <Field
              name="phoneCodeStoreManager"
              type="text"
              className="inputCityCodeRegister"
            />
          </div>
          <div className="partLeftRegisterStoreOrgan">
            <div className="itemTextRegister">
              <p className="textRegister">ایمیل</p>
            </div>
            <div className="inputBoxRegisterStoreOrgan">
              <Field
                name="emailStoreManager"
                className="inputFormRegisterStoreOrganLeft"
                type="text"
              />
            </div>
          </div>
        </ItemRegister>
        <div className="itemRegisterTextarea">
          <div className="itemTextContainerRegister">
            <p className="textRegister">شرح شغلی</p>
          </div>
          <div className="itemInputRegister">
            <Field
              component="textarea"
              name="jobDescription"
              className="textareaAddress"
            ></Field>
          </div>
        </div>
      </Form>
    </ContainerRegister>
  );
};
export const RegisterMembersStoreView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    firstNameAndLastName: "",
    nationalCode: "",
    cellularPhone: "",
    dateBirth: "",
    provincePlaceBirth: "",
    countyPlaceBirth: "",
    postalCodeStore: "",
    addressStoreManager: "",
    phoneStoreManager: "",
    phoneCodeStoreManager: "",
    emailStoreManager: "",
    jobDescription: ""
  }),
  handleSubmit: values => {
    // do submitting things
  }
})(C);
