import React, { useState } from "react";
import { Button } from "../../../componentShare/button/Button";
import { Selector } from "../../../componentShare/selectors/Selector";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

export const SearchHistoryRequest: React.FC = () => {
  const [selectFilter, setSelectFilter] = useState<number>(0);
  return (
    <div className="searchMyProductList-seller">
      <div className="row-searchMyProductList-seller">
        <Selector
          style={{ width: "32%", display: "flex", alignItems: "center" }}
          label="شرکت سازنده"
          labelStyle={{ width: "unset", marginLeft: "1.3rem" }}
          name="historustart"
          placeholder=""
          options={[]}
        />
        <Selector
          style={{ width: "27%", display: "flex", alignItems: "center" }}
          label="گرو کالا"
          labelStyle={{ width: "unset", marginLeft: "1.3rem" }}
          name="historustart"
          placeholder=""
          options={[]}
        />
        <SelectBoxRegister
          select={selectFilter}
          style={{ display: "flex", alignItems: "center", width: "30%" }}
          label="وضعیت پرداخت"
          labelStyle={{ width: "7rem", paddingLeft: "0.4rem" }}
          change={setSelectFilter}
          textFiledStyle={{ width: "3.8rem", textAlign: "center" }}
          nameFields={["نمایش همه", "تایید شده ها", "تایید نشده ها"]}
        />
      </div>

      <div className="row-SearchHistoryRequest-seller">
        <Button padding="0.4rem 2rem" text="جستجو" type="main" />
      </div>
    </div>
  );
};
