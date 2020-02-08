import React from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { Button } from "../../../componentShare/button/Button";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

interface Props extends RouteComponentProps {}

export const RegisterPhotoDocumentsOwnerView: React.FC<Props> = ({
  history
}) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const onSubmit = handleSubmit(variables => {
    console.log("is", variables);
    history.push("/register/informationbank");
  });

  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      title="ثبت اطلاعات هویتی"
    >
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="containerRegisterPhotoOwner">
          <div className="itemRegisterPhotoEdit">
            <p className="textRegisterPhotoEdit">تصویر کارت ملی مدیر/مالک</p>
            <input
              ref={register}
              id="fileCardMelliOwner"
              type="file"
              name="cardMelliOwner"
              accept="image/*"
            />
            <label
              className="btn-main label-file-select"
              htmlFor="fileCardMelliOwner"
            >
              انتخاب فایل
            </label>
          </div>
          <div className="itemRegisterPhotoEdit">
            <p className="textRegisterPhotoEdit">تصویر مجوز فعالیت</p>
            <input
              ref={register}
              id="fileActivityPermissionOwner"
              type="file"
              name="activityPermissionOwner"
              accept="image/*"
            />
            <label
              className="btn-main label-file-select"
              htmlFor="fileActivityPermissionOwner"
            >
              انتخاب فایل
            </label>
          </div>
          <div className="itemDownRegisterPhotoEdit">
            <p className="textRegisterPhotoEdit">تصویر عکس پرسنلی مدیر/مالک</p>
            <input
              ref={register}
              id="fileOwnerImage"
              type="file"
              name="fileOwnerImage"
              accept="image/*"
            />
            <label
              className="btn-main label-file-select"
              htmlFor="fileOwnerImage"
            >
              انتخاب فایل
            </label>
          </div>
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
