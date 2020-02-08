import React from "react";
import { Button } from "../../../componentShare/button/Button";
import { Selector } from "../../../componentShare/selectors/Selector";

export const SearchAccountingReports: React.FC = () => {
  return (
    <div className="SearchAccountingReports-seller">
      <Selector
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        label="تاریخ شروع"
        name="historustart"
        placeholder=""
        options={[]}
      ></Selector>
      <Selector
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        label="تاریخ پایان"
        name="historustart"
        width="100%"
        placeholder=""
        options={[]}
      ></Selector>
      <Button
        margin="0rem 1rem 0 0"
        padding="0.5rem 0.8rem"
        text="تولید گزارش"
        type="main"
      />
    </div>
  );
};
