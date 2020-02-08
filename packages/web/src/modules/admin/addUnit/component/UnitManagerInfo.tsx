import React from "react";
import { DetailNameHuman } from "../../modalBox/component/DetailNameHuman";
export const UnitManagerInfo = () => {
  return (
    <div className="InformationMangerUnit-admin">
      <p className="headTitle-InformationMangerUnit-admin">
        اطلاعات مدیر و کارمندان واحد
      </p>
      <div className="container-InformationMangerUnit-admin">
        <div className="boxButton-InformationMangerUnit-admin">
          <button className="button-InformationMangerUnit-admin">
            افزودن مدیر
          </button>
        </div>
        <div className="row-InformationMangerUnit-admin">
          <p className="titleRow-InformationMangerUnit-admin">مسول واحد</p>
          <DetailNameHuman />
        </div>
        <div className="boxButton-InformationMangerUnit-admin">
          <button className="button-InformationMangerUnit-admin">
            افزودن کارمند
          </button>
        </div>
        <div className="row-InformationMangerUnit-admin">
          <p className="titleRow-InformationMangerUnit-admin">مسول واحد</p>
          <DetailNameHuman />
        </div>
        <div className="row-InformationMangerUnit-admin">
          <p className="titleRow-InformationMangerUnit-admin">مسول واحد</p>
          <DetailNameHuman />
        </div>
        <div className="row-InformationMangerUnit-admin">
          <p className="titleRow-InformationMangerUnit-admin">مسول واحد</p>
          <DetailNameHuman />
        </div>
      </div>
    </div>
  );
};
