import { useManufacturersQuery, useWareClassesQuery } from "@satek/hooks";
import {
  createWareVariables,
  getManufacturers_getManufacturers,
  getWareClasses_getWareClasses
} from "@satek/resolvers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { Loader } from "../../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../../componentShare/selectors/Selector";

export const DetailWare: React.FC = () => {
  const { register, handleSubmit, watch, setValue } = useForm<
    createWareVariables
  >();
  const [wareClass, setWareClass] = useState({ label: "", value: "" });
  const [wareGroup, setWareGroup] = useState({ label: "", value: "" });
  const [manufacturer, setManufacturer] = useState({ label: "", value: "" });
  const ParseClass: React.FC<{ data: getWareClasses_getWareClasses[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareClassId"
        placeholder="انتخاب گروه کالایی"
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        options={options}
        value={wareClass}
        onChange={(option: SelectorOptions) => {
          setWareClass(option);
        }}
      />
    );
  };
  const ParseManu: React.FC<{ data: getManufacturers_getManufacturers[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareClassId"
        placeholder="انتخاب گروه کالایی"
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        options={options}
        value={manufacturer}
        onChange={(option: SelectorOptions) => {
          setManufacturer(option);
          setValue("manufacturerId", option.value);
        }}
      />
    );
  };
  // const ParseGroup: React.FC<{ data: getWareClassWareGroups_getWareClass }> = ({
  //   data
  // }) => {
  //   if (data.wareGroups) {
  //     let options = data.wareGroups.reduce<SelectorOptions[]>(
  //       (options, option) => {
  //         options.push({ label: option.name, value: option.id });
  //         return options;
  //       },
  //       []
  //     );

  //     return (
  //       <Selector
  //         name="wareGroupId"
  //         placeholder="انتخاب زیرگروه کالایی"
  //         style={{ display: "flex", alignItems: "center" }}
  //         width="12rem"
  //         options={options}
  //         value={wareGroup}
  //         onChange={(option: SelectorOptions) => setWareGroup(option)}
  //       />
  //     );
  //   }
  //   return null;
  // };

  const ResponseClass = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClass },
    {},
    client
  );
  const ResponseManu = useManufacturersQuery(
    { error: CustomError, loading: Loader, parsing: ParseManu },
    {},
    client
  );
  // const ResponseGroup = useWareClassWareGroupsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseGroup },
  //   { id: wareClass.value },
  //   client
  // );

  return (
    <Container title="مشخصات کالا" margin="0.5rem 0">
      <div className="row-detailware">
        <div className="field-detailware">
          <p className="title-detailware">نام فارسی</p>
          <Input
            register={register}
            size="medium"
            name="name"
            title=""
            className="input-detailware"
          />
        </div>
        <div className="field-detailware">
          <p className="title-detailware">نام انگلیسی</p>
          <Input
            register={register}
            size="medium"
            name="enName"
            title="نام"
            className="input-detailware"
          />
          <input className="input-detailware" />
        </div>
      </div>
      <div className="row-detailware">
        <div className="field-umdns-detailware fix-row-detailware">
          <p className="title-detailware">UMDNS</p>
          <input className="input-detailware" />
        </div>
        <div className="field-group-ware-detailware fix-row-detailware">
          <p className="title-detailware">گروه کالایی</p>
          {ResponseClass.Response}
        </div>
        <div className="field-subgroup-ware-detailware fix-row-detailware">
          <p className="title-detailware">زیر گروه</p>
          {/* {wareClass.value && ResponseGroup.Response} */}
        </div>
      </div>
      <div className="row-detailware">
        {/* <div className="field-country-detailware fix-row-detailware">
          <p className="title-detailware">کشور سازنده قانونی</p>
          <Selector
            style={{ width: "100%" }}
            options={[]}
            name="country"
            placeholder=""
          />
        </div> */}
        <div className="field-compony-detailware fix-row-detailware">
          <p className="title-detailware">کمپانی سازنده قانونی</p>
          {ResponseManu.Response}
        </div>
        <div className="field-check-detailware fix-row-detailware">
          <div className="box-check-detailware fix-row-detailware">
            <input type="checkBox" />
            <p className="title-detailware">مصرفی</p>
          </div>
          <div className="box-check-detailware fix-row-detailware">
            <input type="checkBox" />
            <p className="title-detailware">نیمه مصرفی</p>
          </div>
          <div className="box-check-detailware fix-row-detailware">
            <input type="checkBox" />
            <p className="title-detailware">سرمایه ای</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
