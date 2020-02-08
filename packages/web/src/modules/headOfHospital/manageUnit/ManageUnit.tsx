import React from "react";
import { AddUnitWareGroupBox } from "../../admin/addUnitWareGroup/AddUnitWareGroupBox";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { BasicInformationUnitsHeadHospital } from "../addUnit/component/BasicInformationUnitsHeadHospital";

export const ManageUnit = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="افزودن واحد/بخش جدید">
      <div className="AddUnitsSections-admin">
        <div className="container-AddUnitsSections-admin">
          <div className="right-AddUnitsSections-admin">
            <div className="basicInformationOrgan-AddUnitsSections-admin">
              <BasicInformationUnitsHeadHospital />
            </div>
            <div className="managerInformationOrgan-AddUnitsSections-admin">
              <AddUnitWareGroupBox />
            </div>
          </div>
          <div className="left-AddUnitsSections-admin">
            <div className="informationMangerUnit-AddUnitsSections-admin"></div>
          </div>
        </div>
        <div className="boxButton-AddUnitsSections-admin">
          <button className="button-AddUnitsSections-admin">
            تایید اطلاعات
          </button>
          <p className="textCancel-AddUnitsSections-admin">انصراف</p>
        </div>
      </div>
    </ContainerClient>
  );
};
