import React from "react";
import { Button } from "../../../componentShare/button/Button";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

export const RegisterFinalApprovalView = () => (
  <ContainerRegister btn={false} btnName="مرحله بعدی" title="ثبت اطلاعات هویتی">
    <div className="containerRegisterFinalApproval">
      <div className="itemsRegisterFinalApproval">
        <div className="headerRegisterFinalApproval">
          <h3 className="textHeaderRegisterFinalApproval">
            مراحل ثبت فروشگاه را با موفقیت انجام شد
          </h3>
        </div>
        <div className="textAndBtnRegisterFinalApproval">
          <p className="textRegisterFinalApproval">
            پس از بررسی مدارک و اطلاعات ثبت شده در
            <br /> سیستم و نیز تایید صحت تلفن ثابت و آدرس <br />
            فروشگاه نتیجه ثبت نام از طریق پیامک به اطلاع
            <br /> شما خواهد رسید
          </p>
          <div className="btnBoxRegisterFinalApproval">
            <Button
              type="main"
              to="/login/login"
              padding="0.3rem 0.5rem 0.3rem 0.5rem"
              text="بازگشت به صفحه اصلی"
            />
          </div>
        </div>
      </div>
    </div>
  </ContainerRegister>
);
