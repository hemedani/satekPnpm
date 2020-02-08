import React from "react";
import { InputComponent } from "../../../componentShare/inputComponent/InputComponent";
import { Button } from "../../../componentShare/button/Button";
import { Selector } from "../../../componentShare/selectors/Selector";

export const SearchInformationVendor: React.FC = props => {
  return (
    <div className="SearchHospital-admin">
      <div className="containerInput-SearchHospital-admin">
        <div className="inputOne-SearchInformationVendor-admin">
          <InputComponent textInput="جستجو" />
        </div>
        <div className="inputTwo-SearchInformationVendor-admin">
          <Selector
            placeholder=""
            options={[]}
            name="state"
            labelStyle={{ width: "2.5rem" }}
            style={{ width: "100%", display: "flex", alignItems: "center" }}
            label="استان"
          />
        </div>
        <div className="inputTwo-SearchInformationVendor-admin">
          <Selector
            labelStyle={{ width: "2.5rem" }}
            placeholder=""
            options={[]}
            name="state"
            style={{ width: "100%", display: "flex", alignItems: "center" }}
            label="استان"
          />
        </div>
      </div>
      <div className="boxButton-SearchHospital-admin">
        <Button
          margin="0 0 0 0.6rem"
          padding="0.5rem 2.5rem"
          type="main"
          text="جستجو"
        />
      </div>
    </div>
  );
};
