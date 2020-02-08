import { getOrganizations_getOrganizations } from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../componentShare/button/Button";
import { ParseOrganization } from "../../../componentShare/parseOrganization/ParseOrganization";
import { Selector } from "../../../componentShare/selectors/Selector";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

interface Props {
  setSelectFilter: (value: number) => void;
  selectFilter: number;
}
export const SearchNewRequest: React.FC<Props> = ({
  selectFilter,
  setSelectFilter
}) => {
  const [Organization, setOrganization] = useState<
    getOrganizations_getOrganizations
  >();
  const [searchAdvanced, setSearchAdvanced] = useState<boolean>(false);
  const { register, handleSubmit, watch, setValue } = useForm();

  return (
    <div className="searchMyProductList-seller">
      <div className="row-searchMyProductList-seller">
        <div className="search-searchNewRequest-seller">
          <ParseOrganization
            setValue={setValue}
            setOrganization={setOrganization}
          />
          {/* <Selector
            style={{ width: "64%", display: "flex", alignItems: "center" }}
            label="بیمارستان"
            name="Organization"
            placeholder=""
            labelStyle={{ width: "3rem", marginLeft: "1.3rem" }}
            options={[]}
          /> */}

          <Button
            fontSize="0.9rem"
            text="جستجو پیشرفته"
            padding="0 0.8rem"
            type={searchAdvanced ? "cancel" : "extra"}
            onClick={() => setSearchAdvanced(!searchAdvanced)}
          />
        </div>
        <div className="filter-searchnewrequest-seller">
          <SelectBoxRegister
            select={selectFilter}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            label="مرتب سازی"
            labelStyle={{ paddingLeft: "0.4rem" }}
            change={setSelectFilter}
            textFiledStyle={{ width: "3.8rem", textAlign: "center" }}
            nameFields={["مبلغ", "تعداد موجودی", "تاریخ نیاز"]}
          />
        </div>
      </div>
      {searchAdvanced && (
        <div className="row-searchMyProductList-seller">
          <Selector
            style={{ width: "32%", display: "flex", alignItems: "center" }}
            label="شهر"
            labelStyle={{ width: "3rem", marginLeft: "1.3rem" }}
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
          <Selector
            style={{ width: "32%", display: "flex", alignItems: "center" }}
            labelStyle={{ width: "unset", marginLeft: "1.3rem" }}
            label="زیر گروه کالا"
            name="historustart"
            placeholder=""
            options={[]}
          />
        </div>
      )}
    </div>
  );
};
