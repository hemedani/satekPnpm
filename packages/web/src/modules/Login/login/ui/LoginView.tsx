import { useLoginRequest } from "@satek/hooks";
import { loginRequestVariables } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Loader } from "../../../componentShare/loader/Loader";
import { LogoCode } from "../../../register/ComponentShare/CodeLogo";
interface FormValues {
  phoneNumber: number;
  device: string;
}
interface Props extends RouteComponentProps {}

const LoginView: React.FC<Props> = ({ match: { path }, history }) => {
  const { register, handleSubmit } = useForm<loginRequestVariables>();

  const onSubmit = handleSubmit(async variables => {
    variables.phone = variables.phone.replace(/ +/g, "");
    variables.device = "asd";
    try {
      await LoginRequestMutate({ variables });
    } catch (e) {
      setError("شما در سایت ثبت نام نکردید");
    }
    console.log(result, "result");
  });

  const [error, setError] = useState<string>();

  const { LoginRequestMutate, result } = useLoginRequest(
    { device: "", phone: "" },
    client
  );
  useEffect(() => {
    if (result.data && result.data.loginRequest) {
      const authTimer = new Date();
      console.log(result.data.loginRequest.code);
      localStorage.setItem("authTime", JSON.stringify(authTimer.getTime()));
      localStorage.setItem(
        "detailLogin",
        JSON.stringify({
          phone: result.data.loginRequest.phone,
          device: "asd"
        })
      );
      history.push(`/login/code`);
    } else if (result.error) {
      console.log(result.error);
      setError("شما در سایت ثبت نام نکردید");
    }
  }, [history, result.data, result.error]);
  return (
    // <Formik<loginRequestVariables>
    // initialValues={{ device: "asd", phone: "" }}
    // onSubmit={async (values, { setSubmitting }) => {
    //   console.log(values);
    //   values.phone.trim();
    //   console.log(values);
    //   await LoginRequestMutate({ variables: values })
    //     .then(data => {
    //       if (data.data!.loginRequest.ok) {
    //         const authTimer = new Date();
    //         localStorage.setItem(
    //           "authTime",
    //           JSON.stringify(authTimer.getTime())
    //         );
    //         console.log(data.data!.loginRequest.code);
    //         history.push({
    //           pathname: "/login/code",
    //           state: { phone: data.data!.loginRequest.phone, device: "asd" }
    //         });
    //       }
    //     })
    //     .catch(() => setError("شما در سایت ثبت نام نکردید"));
    // }}
    // >
    <div className="boxRegisterStorePhoneCode">
      <div className="logoPhoneCode">
        <LogoCode />
      </div>
      <div className="fieldFormStorePhoneCode">
        <form onSubmit={onSubmit} className="formStylePhoneCode">
          <div className="field-note-login">
            {error === undefined && (
              <p className="note-text-login">
                شماره خود را جهت دریافت کد ورود به سامانه وارد کنید
              </p>
            )}
            <div className="inner-input-login">
              {result.loading ? (
                <Loader type="DotsHide" />
              ) : (
                <>
                  <NumberFormat
                    autoFocus
                    className="inputPhone input-dir-left-RegisterStoreOrgan"
                    name="phone"
                    getInputRef={register}
                    format="# # # # # # # # # # #"
                    mask="_"
                    placeholder="_ _ _ _ _ _ _ _ _ _ _  "
                    // placeholder="شماره همراه خود را وارد کنید"
                  />
                  <Button
                    fontSize="0.9rem"
                    height="2.5rem"
                    mainType="submit"
                    isLoading={result.loading}
                    text="ارسال کد"
                    className="button-login"
                    type="main"
                    margin="0 0rem 1rem 0"
                    padding="0.5rem 1.3rem"
                  />
                </>
              )}
            </div>
            {error && <p className="error-text-login">{error}</p>}
          </div>
        </form>
        <ul className="sub-link-login">
          <li>
            <Link to="/register/StoreOrganization">ثبت نام فروشندگان</Link>
          </li>
          <li>
            <Link to="">درباره ما</Link>
          </li>
          <li>
            <Link to="">سوالات متداول</Link>
          </li>
          <li>
            <Link to="">درخواست همکاری</Link>
          </li>
          <li>
            <Link to="">بلاک</Link>
          </li>
        </ul>
        {/* <p className="help-text-login">مشاهده راهنمای استفاده از سامانه</p> */}
      </div>
    </div>
    // </Formik>
  );
};

export default LoginView;
