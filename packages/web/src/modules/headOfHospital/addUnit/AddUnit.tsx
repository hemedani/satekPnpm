import React from "react";
import { RouteComponentProps } from "react-router";
import { AddUnitWareGroupBox } from "../../admin/addUnitWareGroup/AddUnitWareGroupBox";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { ManagerStaffInfo } from "../../componentShare/managerStaffInfo/ManagerStaffInfo";

interface Props extends RouteComponentProps {}
export const AddUnit: React.FC<Props> = ({ match: { path } }) => {
  return (
    <ContainerClient colorHeader="blue" textHeader="افزودن واحد جدید">
      <div className="AddUnitsSections-admin">
        <div className="container-AddUnitsSections-admin">
          <div className="right-AddUnitsSections-admin">
            <div className="basicInformationOrgan-AddUnit-headHospital"></div>
            <div className="managerInformationOrgan-AddUnit-headHospital">
              <AddUnitWareGroupBox />
            </div>
          </div>
          <div className="left-AddUnitsSections-admin">
            <div className="informationMangerUnit-AddUnitsSections-admin">
              <ManagerStaffInfo />
            </div>
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
