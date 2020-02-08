import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { RegistrationRequest } from "./component/RegistrationRequest";

export const RegistrationRequests = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="درخواست‌های ثبت نام">
      <div className="registration-requests-cnt">
        <RegistrationRequest
          city="تهران"
          headName="علیرضا قدسی"
          companyName="نواندیشان غرب سپهر آسیا"
          date="۲۸/۷/۱۳۹۸"
        />
        {/* <ModalBoxViewSellerInformation /> */}
      </div>
    </ContainerClient>
  );
};
