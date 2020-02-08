import {
  useManufacturersQuery,
  useWareClassesQuery,
  useWareGroupsQuery
} from "@satek/hooks";
import {
  getManufacturers_getManufacturers,
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups
} from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Input } from "../../../componentShare/Input/Input";
import { Loader } from "../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";
import { SelectBoxRegister } from "../../../register/ComponentShare/SelectBoxRegister";

interface Props {
  setNameWare: (value: string) => void;
  setSelectFilter: (value: number) => void;
  setSelectManufacturer: (value: string) => void;
  setSelectWareClass: (value: string) => void;
  setSelectWareGroup: (value: string) => void;
  selectFilter: number;
}
export const SearchMyProductList: React.FC<Props> = ({
  setSelectFilter,
  setNameWare,
  selectFilter,
  setSelectManufacturer,
  setSelectWareClass,
  setSelectWareGroup
}) => {
  const [searchAdvanced, setSearchAdvanced] = useState<boolean>(false);
  const { register, handleSubmit, setValue, watch } = useForm();
  const onSubmit = handleSubmit(async variables => {
    setNameWare(variables.nameWare);
  });
  const manufacturer = watch("manufacturer");
  const wareClass = watch("wareClass");
  const wareGroup = watch("wareGroup");

  const ParseManufacturers: React.FC<{
    data: getManufacturers_getManufacturers[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        style={{ width: "23%", display: "flex", alignItems: "center" }}
        label="شرکت سازنده"
        labelStyle={{ width: "unset", marginLeft: "0.5rem" }}
        name="manufacturer"
        placeholder=""
        isClearable={true}
        options={options}
        value={options.find(({ value }) => value === manufacturer)}
        onChange={(option: SelectorOptions) => {
          setValue("manufacturer", option.value);
          console.log(option.value, "change");
          setSelectManufacturer(option.value);
        }}
      />
    );
  };
  const ParseWareClass: React.FC<{
    data: getWareClasses_getWareClasses[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        style={{ width: "18%", display: "flex", alignItems: "center" }}
        label="گروه"
        labelStyle={{ width: "unset", marginLeft: "0.5rem" }}
        name="wareClass"
        placeholder=""
        isClearable={true}
        options={options}
        value={options.find(({ value }) => value === wareClass)}
        onChange={(option: SelectorOptions) => {
          setValue("wareGroup", "");
          setValue("wareClass", option.value);
          setSelectWareClass(option.value);
        }}
      />
    );
  };
  const ParseWareGroup: React.FC<{
    data: getWareGroups_getWareGroups[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        style={{ width: "23%", display: "flex", alignItems: "center" }}
        labelStyle={{ width: "unset", marginLeft: "0.5rem" }}
        label="زیر گروه"
        name="wareGroup"
        placeholder=""
        isClearable={true}
        options={options}
        value={options.find(({ value }) => value === wareGroup)}
        onChange={(option: SelectorOptions) => {
          setValue("wareGroup", option.value);
          setSelectWareGroup(option.value);
        }}
      />
    );
  };

  const { Response: ResponseWareGroup } = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareGroup },
    {},
    client
  );
  const { Response: ResponseWareClass } = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareClass },
    {},
    client
  );
  const { Response: ResponseManufacturers } = useManufacturersQuery(
    { error: CustomError, loading: Loader, parsing: ParseManufacturers },
    {},
    client
  );
  return (
    <form onSubmit={onSubmit} className="searchMyProductList-seller">
      <div className="row-searchMyProductList-seller">
        <div className="search-searchMyProductList-seller">
          <Input
            style={{ width: "50%", display: "flex", alignItems: "center" }}
            title="جستجوی نام کالا"
            name="nameWare"
            placeholder=""
            register={register}
            clear={true}
            size="medium"
            titleStyle={{ width: "unset", marginLeft: "1.3rem" }}
          />
          <Button
            fontSize="0.9rem"
            text="جستجو"
            padding="0 0.8rem"
            mainType="submit"
            type="main"
          />
          <Button
            fontSize="0.9rem"
            text="جستجو پیشرفته"
            mainType="button"
            padding="0 0.8rem"
            type={searchAdvanced ? "cancel" : "extra"}
            onClick={() => setSearchAdvanced(!searchAdvanced)}
          />
        </div>
        <div className="filter-searchMyProductList-seller">
          <Button
            fontSize="0.9rem"
            text="افزودن کالای جدید"
            padding="0.5rem 0.8rem"
            to="/seller/stuff"
            type="main"
          />
        </div>
      </div>
      {searchAdvanced && (
        <div className="row-searchMyProductList-seller">
          {ResponseManufacturers}
          {ResponseWareClass}
          {wareClass && ResponseWareGroup}
          <div className="filter-searchMyProductList-seller">
            <SelectBoxRegister
              select={selectFilter}
              style={{ display: "flex", alignItems: "center", width: "100%" }}
              label="مرتب سازی"
              labelStyle={{ paddingLeft: "0.4rem" }}
              change={setSelectFilter}
              textFiledStyle={{ width: "3.8rem", textAlign: "center" }}
              nameFields={["مبلغ", "تعداد موجودی", "تاریخ"]}
            />
          </div>
        </div>
      )}
    </form>
  );
};
