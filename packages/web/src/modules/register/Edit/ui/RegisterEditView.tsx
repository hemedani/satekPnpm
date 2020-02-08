import React from "react";
import { Button } from "../../../componentShare/button/Button";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

export const RegisterEditView = () => (
  <ContainerRegister btn={true} btnName="مرحله بعدی" title="ثبت اطلاعات هویتی">
    <div className="containerRegisterPhotoOwner">
      <div className="itemRegisterPhotoEdit">
        <p className="textRegisterPhotoEdit">
          اطلاعات فروشگاه/شرکت و مدیرعامل/مدیرفروشگاه
        </p>
        <Button
          padding="0.5rem 0.8rem 0.5rem 0.8rem"
          fontSize="0.7rem"
          text="ویرایش"
          type="main"
        />
      </div>
      <div className="itemRegisterPhotoEdit">
        <div className="boxTextRegisterPhotoEdit">
          <p className="textRegisterPhotoEdit">اطلاعات سایرمالکین یامدیران</p>
          <p className="textExplainRegisterPhotoEdit">
            (نام مدیر/مالک شماره ۱)
          </p>
        </div>
        <Button
          padding="0.5rem 0.8rem 0.5rem 0.8rem"
          fontSize="0.7rem"
          text="ویرایش"
          type="main"
        />
      </div>
      <div className="itemDownRegisterEdit">
        <div className="boxTextRegisterPhotoEdit">
          <p className="textRegisterPhotoEdit">اطلاعات سایرمالکین یامدیران</p>
          <p className="textExplainRegisterPhotoEdit">
            (نام مدیر/مالک شماره ۲)
          </p>
        </div>
        <Button
          padding="0.5rem 0.8rem 0.5rem 0.8rem"
          fontSize="0.7rem"
          text="ویرایش"
          type="main"
        />
      </div>
      <div className="itemAddMemberDownRegisterPhotoEdit">
        <a href="$" className="link-ContainerRegister-register">
          + افزودن اطلاعات صاحب امضا
        </a>
      </div>
    </div>
  </ContainerRegister>
);
