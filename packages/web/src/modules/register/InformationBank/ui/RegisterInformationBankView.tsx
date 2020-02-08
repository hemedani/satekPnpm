import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { Button } from "../../../componentShare/button/Button";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

interface Props extends RouteComponentProps {}

export const RegisterInformationBankView: React.FC<Props> = ({ history }) => {
  let registerStorage: any;
  if (localStorage.getItem("register")) {
    registerStorage = JSON.parse(localStorage.getItem("register")!);
  }

  // const [addBank, setBank] = useState<boolean>(false);
  // const clickAddBank = () => {
  //   setBank(true);
  // };
  const { register, handleSubmit, watch, setValue } = useForm();

  const onSubmit = handleSubmit(variables => {
    let levelOneRegister = JSON.parse(localStorage.getItem("register")!);
    if (levelOneRegister) {
      levelOneRegister[2] = variables;
      localStorage.setItem("register", JSON.stringify(levelOneRegister));
    } else {
      localStorage.setItem("register", JSON.stringify([variables]));
    }
    history.push("/register/commitmentssales");
  });
  useEffect(() => {
    register({ name: "bankName" });

    if (!localStorage.getItem("register")) {
      history.push("/register/StoreOrganization");
    }
    if (registerStorage && registerStorage[2]) {
      registerStorage[2].bankName &&
        setValue("bankName", registerStorage[2].bankName);
      console.log(registerStorage[2].bankName, "asd");
    }
  }, [history, register, registerStorage, setValue]);
  const options = [
    { label: "بانک صادرات", value: "saderat" },
    { label: "بانک ملت", value: "melat" },
    { label: "بانک ملی", value: "melli" },
    { label: "بانک سپه", value: "sepah" },
    { label: "بانک مسکن", value: "maskan" },
    { label: "بانک تجارت", value: "tejart" }
  ];
  const bankName = watch("bankName");

  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      title="ثبت اطلاعات هویتی"
    >
      <form onSubmit={onSubmit} className="formInformationBank">
        <div className="itemsInformationBank">
          <div className="itemInformationBank">
            <div className="boxTextItemInformationBank">
              <p className="textItemInformationBank">شماره کارت بانکی</p>
            </div>
            <div className="BoxInputInformationBank">
              <input
                ref={register}
                type="text"
                defaultValue={
                  registerStorage &&
                  registerStorage[2] &&
                  registerStorage[2].bankCardNumber
                }
                name="bankCardNumber"
                className="inputInformationBank input-dir-left-RegisterStoreOrgan"
              ></input>
            </div>
          </div>
          <div className="itemInformationBank">
            <div className="boxTextItemInformationBank">
              <p className="textItemInformationBank">شماره شبا</p>
            </div>
            <div className="BoxInputInformationBank">
              <input
                ref={register}
                type="text"
                defaultValue={
                  registerStorage &&
                  registerStorage[2] &&
                  registerStorage[2].shebaNumber
                }
                name="shebaNumber"
                className="inputInformationBank input-dir-left-RegisterStoreOrgan"
              ></input>
            </div>
          </div>
          <div className="itemInformationBank">
            <div className="boxTextItemInformationBank">
              <p className="textItemInformationBank">نام کامل صاحب حساب</p>
            </div>
            <div className="BoxInputInformationBank">
              <input
                ref={register}
                name="nameOfAccountHolder"
                type="text"
                defaultValue={
                  registerStorage &&
                  registerStorage[2] &&
                  registerStorage[2].nameOfAccountHolder
                }
                className="inputInformationBank"
              ></input>
            </div>
          </div>
          <div className="itemInformationBank">
            <div className="boxTextItemInformationBank">
              <p className="textItemInformationBank">نام بانک</p>
            </div>
            <div className="BoxInputInformationBank">
              <Selector
                className="selectInputInformationBank"
                placeholder=""
                name="bankName"
                options={options}
                value={options.find(({ value }) => value === bankName)}
                onChange={(option: SelectorOptions) =>
                  setValue("bankName", option.value)
                }
              />
            </div>
          </div>
          {/* {addBank ? (
            <React.Fragment>
              <div className="itemLineInformationBank">
                <div className="lineInformationBank"></div>
              </div>
              <div className="itemInformationBank">
                <div className="boxTextItemInformationBank">
                  <p className="textItemInformationBank">شماره کارت بانکی</p>
                </div>
                <div className="BoxInputInformationBank">
                  <input type="text" className="inputInformationBank"></input>
                </div>
              </div>

              <div className="itemInformationBank">
                <div className="boxTextItemInformationBank">
                  <p className="textItemInformationBank">شماره شبا</p>
                </div>
                <div className="BoxInputInformationBank">
                  <input type="text" className="inputInformationBank"></input>
                </div>
              </div>
              <div className="itemInformationBank">
                <div className="boxTextItemInformationBank">
                  <p className="textItemInformationBank">نام کامل صاحب حساب</p>
                </div>
                <div className="BoxInputInformationBank">
                  <input type="text" className="inputInformationBank"></input>
                </div>
              </div>
              <div className="itemInformationBank">
                <div className="boxTextItemInformationBank">
                  <p className="textItemInformationBank">نام بانک</p>
                </div>
                <div className="BoxInputInformationBank">
                  <Selector
                    className="selectInputInformationBank"
                    placeholder=""
                    name="bankTwo"
                    options={[]}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="itemAddInformationBank">
              <p
                onClick={clickAddBank}
                className="link-ContainerRegister-register"
              >
                + افزودن حساب بانکی دوم
              </p>
            </div>
          )} */}
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
