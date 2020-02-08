import {
  useCreateWareClassMutate,
  useCreateWareGroupMutate,
  useCreateWareModelMutate,
  useCreateWareTypeMutate,
  useWareClassesQuery,
  useWareGroupsQuery,
  useWareTypesQuery
} from "@satek/hooks";
import {
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups,
  getWareTypes_getWareTypes
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { client } from "../../../Apollo";
import { Button } from "../../componentShare/button/Button";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Input } from "../../componentShare/Input/Input";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBox } from "../../componentShare/modalBox/ModalBox";
import {
  Selector,
  SelectorOptions
} from "../../componentShare/selectors/Selector";

interface Props extends RouteComponentProps {}
export const ModalWare: React.FC<Props> = ({ match: { path }, history }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const wareTypeId = watch("wareTypeId");
  const wareClassIds = watch("wareClassIds") as string[];
  const wareClassId = watch("wareClassId");
  const wareGroupId = watch("wareGroupId");
  useEffect(() => {
    register({ name: "wareTypeId" });
    register({ name: "wareClassIds" });
    register({ name: "wareClassId" });
    register({ name: "wareGroupId" });
  });
  const onSubmit = handleSubmit(async variables => {
    variables = { variables };
    console.log(variables, "variablesvariables");

    if (path.includes("typeware")) {
      delete variables.wareTypeId;
      delete variables.wareClassIds;
      delete variables.wareGroupId;
      console.log(variables);
      await createWareTypeMutate(variables);
    } else if (path.includes("classware")) {
      delete variables.wareClassIds;
      delete variables.wareGroupId;
      await createWareClassMutate(variables);
    } else if (path.includes("groupware")) {
      delete variables.wareGroupId;

      await createWareGroupMutate(variables);
    } else if (path.includes("modelware")) {
      await createWareModelMutate(variables);
    } else {
    }

    console.log(variables, "okok");
    history.goBack();
  });

  const [classWares, setClassWares] = useState<SelectorOptions[]>();

  const ParseTypeWare: React.FC<{ data: getWareTypes_getWareTypes[] }> = ({
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
        label="انتخاب نوع کالا"
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        height="1rem"
        labelStyle={{ width: "6rem" }}
        placeholder="انتخاب نوع کالا"
        options={options}
        value={options.find(({ value }) => value === wareTypeId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareTypeId", option.value);
        }}
        // defaultValue={options.find(
        //   ({ value }) => value === data.storeDetails!.ceoCity!.id
        // )}
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
        label="انتخاب کلاس کالا"
        style={{
          width: path.includes("groupware") ? "40%" : "35%",
          display: "flex",
          alignItems: "center"
        }}
        height="1rem"
        labelStyle={{ width: "6rem" }}
        placeholder="انتخاب کلاس کالا"
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
        // defaultValue={options.find(
        //   ({ value }) => value === data.storeDetails!.ceoCity!.id
        // )}
      />
    );
  };
  const ParseGroupsWare: React.FC<{
    data: getWareGroups_getWareGroups[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        className="selector"
        name="wareGroupId"
        label="انتخاب گروه کالا"
        style={{ width: "35%", display: "flex", alignItems: "center" }}
        height="1rem"
        labelStyle={{ width: "6rem" }}
        placeholder="انتخاب گروه کالا"
        options={options}
        value={options.find(({ value }) => value === wareGroupId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareGroupId", option.value);
        }}
        // defaultValue={options.find(
        //   ({ value }) => value === data.storeDetails!.ceoCity!.id
        // )}
      />
    );
  };
  const { createWareTypeMutate, result } = useCreateWareTypeMutate({}, client);
  const {
    createWareClassMutate,
    result: resultClass
  } = useCreateWareClassMutate({}, client);
  const ResponseWaresTypes = useWareTypesQuery(
    { error: CustomError, loading: Loader, parsing: ParseTypeWare },
    {},
    client
  ).Response;

  const {
    createWareGroupMutate,
    result: resultGroup
  } = useCreateWareGroupMutate({}, client);
  const {
    createWareModelMutate,
    result: resultModel
  } = useCreateWareModelMutate({}, client);

  const ResponseWaresGroups = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseGroupsWare },
    { wareClassId: wareClassId ? wareClassId : "" },
    client
  ).Response;

  const ResponseWaresClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClassesWare },
    { wareTypeId: wareTypeId ? wareTypeId : "" },
    client
  ).Response;
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="افزودن نوع کالا"
      display="flex"
    >
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
              register={register}
            />
            <Input
              register={register}
              name="enName"
              style={{ width: "35%" }}
              padding="0.1rem 0"
              size="medium"
              title="نام انگلیسی"
            />
          </div>
          <div className="row-body-modalware">
            {path.includes("classware") && ResponseWaresTypes}
            {path.includes("groupware") && (
              <>
                {ResponseWaresTypes}
                {wareTypeId && ResponseWaresClasses}
              </>
            )}
            {path.includes("modelware") && (
              <>
                {ResponseWaresTypes}
                {wareTypeId && ResponseWaresClasses}
                {wareClassId && ResponseWaresGroups}
              </>
            )}
          </div>
        </div>
        <div className="btn-modalware">
          <Button
            margin="0.5rem"
            fontSize="0.8rem"
            padding="0.5rem 1rem"
            isLoading={
              path.includes("typeware")
                ? result.loading
                : path.includes("classware")
                ? resultClass.loading
                : path.includes("groupware")
                ? resultGroup.loading
                : resultModel.loading
            }
            text="افزودن"
            type="main"
          />
          <Button
            margin="0.5rem"
            fontSize="0.8rem"
            padding="0.5rem 1rem"
            isLoading={
              path.includes("typeware")
                ? result.loading
                : path.includes("classware")
                ? resultClass.loading
                : path.includes("groupware")
                ? resultGroup.loading
                : resultModel.loading
            }
            text="حذف"
            type="cancel"
          />
        </div>
      </form>
    </ModalBox>
  );
};
