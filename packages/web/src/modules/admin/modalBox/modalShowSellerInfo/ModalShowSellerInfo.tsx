import React from "react";
import { Button } from "../../../componentShare/button/Button";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { ContainerStoreBossInfo } from "./ContainerStoreBossInfo";
import { ContainerStoreInfo } from "./ContainerStoreInfo";

export const ModalShowSellerInfo = () => {
  return (
    <ModalBox
      modalBoxSize="medium"
      headerName="مشاهده اطلاعات ثبت نامی فروشنده"
      display="flex"
    >
      <ContainerStoreInfo />
      <ContainerStoreBossInfo />

      <div
        style={{
          width: "90%",
          display: "flex",
          margin: "0 4rem",
          justifyContent: "flex-end"
        }}
        className="modal-btns-cnt"
      >
        <Button
          type="main"
          text="صفحه بعدی"
          fontSize=".9rem"
          padding=".5rem 1.5rem"
        />
        <Button
          type="cancel"
          text="انصراف"
          fontSize=".9rem"
          padding=".5rem 1.5rem"
          margin="0 .5rem 0 0"
        />
      </div>
    </ModalBox>
  );
};
