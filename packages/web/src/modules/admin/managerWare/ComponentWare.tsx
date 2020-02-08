import {
  useUpdateWareClassMutate,
  useUpdateWareGroupMutate,
  useUpdateWareModelMutate,
  useUpdateWareTypeMutate,
  useWareClassesQuery,
  useWareGroupsQuery,
  useWareTypesQuery
} from "@satek/hooks";
import {
  getWareClasses_getWareClasses,
  getWareClass_getWareClass_wareType,
  getWareGroups_getWareGroups,
  getWareGroup_getWareGroup_wareClasses,
  getWareModel_getWareModel_wareClass,
  getWareModel_getWareModel_wareGroup,
  getWareTypes_getWareTypes
} from "@satek/resolvers";
import * as H from "history";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../Apollo";
import { Button } from "../../componentShare/button/Button";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Input } from "../../componentShare/Input/Input";
import { Loader } from "../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../componentShare/selectors/Selector";

interface Props {
  path: string;
  wareType?: getWareClass_getWareClass_wareType | null;
  wareClassesProps?: getWareGroup_getWareGroup_wareClasses[];
  wareClassProps?: getWareModel_getWareModel_wareClass | null;
  wareGroupProps?: getWareModel_getWareModel_wareGroup | null;
  id: string;
  history: H.History;
  defaultValue?: {
    name: string;
    enName: string;
  };
}
export const ComponentWare: React.FC<Props> = ({
  history,
  path,
  id,
  wareClassesProps,
  wareClassProps,
  defaultValue,
  wareGroupProps,
  wareType
}) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  let optionswareClassesProps;
  if (wareClassesProps) {
    optionswareClassesProps = wareClassesProps.reduce<SelectorOptions[]>(
      (options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      },
      []
    );
  }
  const [classWares, setClassWares] = useState<SelectorOptions[]>(
    optionswareClassesProps ? optionswareClassesProps : []
  );
  const wareTypeId = watch("wareTypeId");
  const wareClassId = watch("wareClassId");
  const wareClassIds = watch("wareClassIds");
  const wareGroupId = watch("wareGroupId");
  console.log(wareClassesProps, "wareClassesProps");
  useEffect(() => {
    register({ name: "wareTypeId" });
    register({ name: "wareClassId" });
    register({ name: "wareClassIds" });
    register({ name: "wareGroupId" });
  });
  const ParseGroupsWare: React.FC<{ data: getWareGroups_getWareGroups[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        className="selector"
        name="wareGroupId"
        label=" گروه کالا"
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        height="1rem"
        labelStyle={{ width: "4rem" }}
        placeholder=" گروه کالا"
        options={options}
        value={options.find(({ value }) => value === wareGroupId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareGroupId", option.value);
        }}
        defaultValue={options.find(({ value }) => value === wareGroupProps!.id)}
      />
    );
  };
  const ParseTypesWare: React.FC<{ data: getWareTypes_getWareTypes[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        className="selector"
        name="wareTypeId"
        label=" نوع کالا"
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        height="1rem"
        labelStyle={{ width: "4rem" }}
        placeholder=" نوع کالا"
        options={options}
        value={options.find(({ value }) => value === wareTypeId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareTypeId", option.value);
        }}
        defaultValue={options.find(({ value }) => value === wareType!.id)}
      />
    );
  };
  const ParseClassesWare: React.FC<{
    data: getWareClasses_getWareClasses[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        className="selector"
        name={path.includes("groupware") ? "wareClassIds" : "wareClassId"}
        label=" کلاس کالا"
        style={{
          width: path.includes("groupware") ? "40%" : "35%",
          display: "flex",
          margin: "0 0.5rem",
          alignItems: "center"
        }}
        height="1rem"
        labelStyle={{ width: "4rem" }}
        placeholder=" کلاس کالا"
        options={options}
        isMulti={path.includes("groupware")}
        value={
          path.includes("groupware")
            ? classWares
            : options.find(({ value }) => value === wareClassId)
        }
        onChange={(option: SelectorOptions[] & SelectorOptions) => {
          if (path.includes("groupware")) {
            setClassWares(option);
            let bb = option.reduce<string[]>((bb, b) => {
              bb.push(b.value);
              return bb;
            }, []);
            setValue("wareClassIds", bb);
          } else {
            setValue("wareClassId", option.value);
          }
        }}
        defaultValue={
          path.includes("groupware")
            ? classWares
            : options.find(({ value }) => value === wareClassProps!.id)
        }
      />
    );
  };
  const ResponseWaresTypes = useWareTypesQuery(
    { error: CustomError, loading: Loader, parsing: ParseTypesWare },
    {},
    client
  ).Response;
  const ResponseWaresGroups = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseGroupsWare },
    {},
    client
  ).Response;
  const ResponseWaresClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClassesWare },
    { wareTypeId: wareTypeId ? wareTypeId : "" },
    client
  ).Response;
  const {
    updateWareTypeMutate,
    result: updateWareType
  } = useUpdateWareTypeMutate({}, client);
  const {
    updateWareModelMutate,
    result: updateWareModel
  } = useUpdateWareModelMutate({}, client);
  const {
    updateWareClassMutate,
    result: updateWareClass
  } = useUpdateWareClassMutate({}, client);
  const {
    updateWareGroupMutate,
    result: updateWareGroup
  } = useUpdateWareGroupMutate({}, client);
  const onSubmit = handleSubmit(async variables => {
    variables.id = id;
    console.log(variables);
    variables = { variables };
    if (path.includes("typeware")) {
      delete variables.wareTypeId;
      delete variables.wareClassId;
      delete variables.wareGroupId;
      console.log(variables);
      await updateWareTypeMutate(variables);
    } else if (path.includes("classware")) {
      delete variables.wareClassId;
      delete variables.wareGroupId;
      if (variables.wareTypeId === undefined && wareType) {
        variables.wareTypeId = wareType.id;
      }
      await updateWareClassMutate(variables);
    } else if (path.includes("groupware")) {
      delete variables.wareGroupId;
      if (variables.wareTypeId === undefined && wareType) {
        variables.wareTypeId = wareType.id;
      }
      if (variables.wareClassId === undefined && wareClassProps) {
        variables.wareClassId = wareClassProps.id;
      }
      await updateWareGroupMutate(variables);
    } else if (path.includes("modelware")) {
      if (variables.wareTypeId === undefined && wareType) {
        variables.wareTypeId = wareType.id;
      }
      if (variables.wareClassId === undefined && wareClassProps) {
        variables.wareClassId = wareClassProps.id;
      }
      if (variables.wareGroupId === undefined && wareGroupProps) {
        variables.wareClassId = wareGroupProps.id;
      }
      await updateWareModelMutate(variables);
    }
    history.goBack();
  });
  return (
    <form className="modalware" onSubmit={onSubmit}>
      <div className="body-modalware">
        <div className="row-body-modalware">
          <Input
            titleStyle={{ width: "2rem" }}
            name="name"
            padding="0.1rem 0"
            style={{ width: "35%" }}
            size="medium"
            title="نام"
            defaultValue={defaultValue ? defaultValue.name : ""}
            register={register}
          />
          <Input
            register={register}
            name="enName"
            style={{ width: "40%" }}
            padding="0.1rem 0"
            size="medium"
            defaultValue={defaultValue ? defaultValue.enName : ""}
            title="نام انگلیسی"
          />
        </div>
        <div className="row-body-modalware">
          {path.includes("classware") && ResponseWaresTypes}
          {path.includes("groupware") && (
            <>
              {ResponseWaresTypes}
              {ResponseWaresClasses}
            </>
          )}
          {path.includes("modelware") && (
            <>
              {ResponseWaresTypes}
              {ResponseWaresClasses}
              {ResponseWaresGroups}
            </>
          )}
        </div>
      </div>
      <div className="btn-modalware">
        <Button
          margin="0.5rem"
          fontSize="0.8rem"
          padding="0.5rem 1rem"
          // isLoading={
          //   path.includes("typeware")
          //     ? result.loading
          //     : path.includes("classware")
          //     ? resultClass.loading
          //     : path.includes("groupware")
          //     ? resultGroup.loading
          //     : resultModel.loading
          // }
          text="افزودن"
          type="main"
        />
        <Button
          margin="0.5rem"
          fontSize="0.8rem"
          padding="0.5rem 1rem"
          // isLoading={
          //   path.includes("typeware")
          //     ? result.loading
          //     : path.includes("classware")
          //     ? resultClass.loading
          //     : path.includes("groupware")
          //     ? resultGroup.loading
          //     : resultModel.loading
          // }
          text="حذف"
          type="cancel"
        />
      </div>
    </form>
  );
};
