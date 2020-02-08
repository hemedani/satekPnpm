import { useLoginCodeMutate } from "@satek/hooks";
import { loginVariables } from "@satek/resolvers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { LogoCode } from "../../../register/ComponentShare/CodeLogo";
import { Timer } from "../../component/Timer";

interface Props extends RouteComponentProps {}

const LoginCodeView: React.FC<Props> = ({ history }) => {
  let device: string;
  let phone: string;
  const { register, handleSubmit } = useForm<loginVariables>();
  const detailLogin = localStorage.getItem("detailLogin");
  if (!detailLogin) {
    device = "";
    phone = "";
  } else {
    phone = JSON.parse(detailLogin).phone;
    device = JSON.parse(detailLogin).device;
  }

  const { loginCodeMutate, result } = useLoginCodeMutate(
    { device: "", phone: "", code: "" },
    client
  );
  useEffect(() => {
    if (result.data && result.data.login.user.userToSites) {
      client.resetStore();
      localStorage.setItem("Token", result.data.login.token);
      localStorage.removeItem("detailLogin");
      if (
        result.data.login.user.userToSites[0] &&
        result.data.login.user.userToSites![0].role === "Master"
      ) {
        history.push("/admin/");
      } else if (
        result.data.login.user.userToSites[0] &&
        result.data.login.user.userToSites![0].role === "UnitEmployee"
      ) {
        history.push("/client/SubmitNewRequest");
      } else if (
        result.data.login.user.userToSites[0] &&
        result.data.login.user.userToSites![0].role === "UnitHead"
      ) {
        history.push("/departmentmanager/viewrequest");
      } else if (
        result.data.login.user.userToSites[0] &&
        result.data.login.user.userToSites![0].role === "StoreHead"
      ) {
        history.push("/seller/");
      } else if (
        result.data.login.user.userToSites[0] &&
        result.data.login.user.userToSites![0].role === "OrganizationHead"
      ) {
        history.push("/headofhospital/");
      } else if (
        result.data.login.user.userToSites[0] &&
        (result.data.login.user.userToSites![0].role === "FinanceEmployee" ||
          result.data.login.user.userToSites![0].role === "FinanceHead" ||
          result.data.login.user.userToSites![0].role === "Supplier" ||
          result.data.login.user.userToSites![0].role === "Stockclerk" ||
          result.data.login.user.userToSites![0].role === "Expert")
      ) {
        history.push("/expert/");
      }
    }
  }, [history, result.data]);
  const onSubmit = handleSubmit(async variables => {
    variables.code = variables.code.replace(/ +/g, "");
    variables.device = device;
    variables.phone = phone;
    await loginCodeMutate({ variables });
  });

  return (
    <div className="boxRegisterStorePhoneCode">
      <div className="logoPhoneCode">
        <LogoCode />
      </div>
      <div className="fieldFormStorePhoneCode">
        <form onSubmit={onSubmit} className="formStylePhoneCode">
          <div className="field-note-login">
            <p className="note-text-login">
              کد پیامک شده را در کادر زیر وارد کنید
            </p>
            <div className="inner-input-login">
              <div className="input-box-login">
                <NumberFormat
                  autoFocus
                  format="# # # # # #"
                  mask="_"
                  getInputRef={register}
                  className="inputPhone input-dir-left-RegisterStoreOrgan"
                  name="code"
                  placeholder=""
                />
                <div className="sub-notation-login">
                  <p className="notation">تغییر شماره موبایل</p>
                  <p className="phone-notation-login">{phone}+</p>
                </div>
              </div>
              <div className="btnBoxPhoneCodeSubmit">
                <Button
                  text="ورود"
                  className="button-login"
                  type="main"
                  fontSize="0.9rem"
                  margin="0 0 1rem 0"
                  isLoading={result.loading}
                  padding="0.5rem 1.3rem"
                  height="2.5rem"
                  mainType="submit"
                />
                <p className="notation">ارسال مجدد</p>
              </div>
            </div>
          </div>

          <div className="btnBoxPhoneCodeSubmit">
            <Timer goBack={history.goBack} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCodeView;
