import {
  useCreateWareMutate,
  useManufacturersQuery,
  useUpdateWareMutate,
  useWareClassesQuery,
  useWareGroupsQuery,
  useWareModelsQuery,
  useWareTypesQuery
} from "@satek/hooks";
import {
  createWareVariables,
  getManufacturers_getManufacturers,
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups,
  getWareModels_getWareModels,
  getWareTypes_getWareTypes
} from "@satek/resolvers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Input } from "../../../componentShare/Input/Input";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";

interface Props extends RouteComponentProps {}
export const ModalAddWare: React.FC<Props> = ({
  history,
  match: { params }
}) => {
  const { id }: any = params;

  const { register, handleSubmit, watch, setValue } = useForm<
    createWareVariables
  >();
  const wareTypeId = watch("wareTypeId") as string;
  const wareClassId = watch("wareClassId") as string;
  const wareGroupId = watch("wareGroupId") as string;
  const wareModelId = watch("wareModelId") as string;
  const manufacturerId = watch("manufacturerId") as string;
  useEffect(() => {
    register({ name: "wareTypeId" });
    register({ name: "wareClassId" });
    register({ name: "wareGroupId" });
    register({ name: "wareModelId" });
    register({ name: "manufacturerId" });
  });

  const { createWareMutate, result: resultCreateWare } = useCreateWareMutate(
    {},
    client
  );
  const { updateWareMutate } = useUpdateWareMutate({}, client);

  const ParseManufacturer: React.FC<{
    data: getManufacturers_getManufacturers[];
  }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="manufacturerId"
        placeholder="انتخاب گروه کالایی"
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        label="کمپانی سازنده قانونی"
        labelStyle={{ color: "black", width: "7rem" }}
        options={options}
        value={options.find(({ value }) => value === manufacturerId)}
        onChange={(option: SelectorOptions) => {
          setValue("manufacturerId", option.value);
        }}
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
        name="wareClassId"
        placeholder="انتخاب کلاس کالایی"
        labelStyle={{ color: "black" }}
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        label="کلاس کالایی"
        options={options}
        value={options.find(({ value }) => value === wareClassId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareClassId", option.value);
        }}
      />
    );
  };
  const ParseTypeWare: React.FC<{ data: getWareTypes_getWareTypes[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareTypeId"
        placeholder="انتخاب نوع کالایی"
        labelStyle={{ color: "black" }}
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        label="نوع کالایی"
        options={options}
        value={options.find(({ value }) => value === wareTypeId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareTypeId", option.value);
        }}
      />
    );
  };
  const ParseGroupsWare: React.FC<{ data: getWareGroups_getWareGroups[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareGroupId"
        placeholder=""
        labelStyle={{ color: "black" }}
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        label="گروه کالایی"
        options={options}
        value={options.find(({ value }) => value === wareGroupId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareGroupId", option.value);
        }}
      />
    );
  };
  const ParseModelsWare: React.FC<{ data: getWareModels_getWareModels[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareModelId"
        placeholder=""
        labelStyle={{ color: "black" }}
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        label="مدل کالایی"
        options={options}
        value={options.find(({ value }) => value === wareModelId)}
        onChange={(option: SelectorOptions) => {
          setValue("wareModelId", option.value);
        }}
      />
    );
  };
  const ResponseManufacturer = useManufacturersQuery(
    { error: CustomError, loading: Loader, parsing: ParseManufacturer },
    {},
    client
  ).Response;
  const ResponseWaresClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClassesWare },
    { wareTypeId: wareTypeId ? wareTypeId : "" },
    client
  ).Response;
  const ResponseWaresTypes = useWareTypesQuery(
    { error: CustomError, loading: Loader, parsing: ParseTypeWare },
    {},
    client
  ).Response;
  const ResponseWaresGroups = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseGroupsWare },
    { wareClassId: wareClassId ? wareClassId : "" },
    client
  ).Response;
  const ResponseWaresModels = useWareModelsQuery(
    { error: CustomError, loading: Loader, parsing: ParseModelsWare },
    { wareGroupId: wareGroupId ? wareGroupId : "" },
    client
  ).Response;

  const onSubmit = handleSubmit(async variables => {
    let val;
    val = {
      ...variables,
      umdns: Number(variables.umdns),
      gtin: Number(variables.gtin),
      price: Number(variables.price)
    };

    try {
      const { data, errors } = await createWareMutate({ variables: val });
      history.goBack();
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  });

  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="مشاهده درخواست"
      modalBoxSize="medium"
      display="flex"
    >
      <form className="modalAddWare" onSubmit={onSubmit}>
        <div className="body-modalAddWare">
          <Container title="مشخصات کالا" margin="0.5rem 0">
            <div className="row-detailware">
              <Input
                register={register}
                size="medium"
                name="name"
                titleStyle={{ color: "black" }}
                title="نام فارسی"
              />
              <div className="field-detailware">
                <Input
                  register={register}
                  padding="0"
                  size="medium"
                  height="1.7rem"
                  titleStyle={{ color: "black" }}
                  name="enName"
                  title="نام انگلیسی"
                />
              </div>
            </div>
            <div className="row-detailware">
              <div className="row-field-ware-modaladdware">
                <Input
                  register={register}
                  size="medium"
                  padding="0"
                  height="1.7rem"
                  name="umdns"
                  titleStyle={{ color: "black" }}
                  title="UMDNS"
                />
              </div>
              <div className="row-field-ware-modaladdware">
                {ResponseWaresTypes}
              </div>
              <div className="row-field-ware-modaladdware">
                {wareTypeId && ResponseWaresClasses}
                {/* {wareClass.value && ResponseGroup.Response} */}
              </div>
            </div>
            <div className="row-detailware">
              <div className="row-field-ware-modaladdware">
                {wareTypeId && wareClassId && ResponseWaresGroups}
              </div>
              <div className="row-field-ware-modaladdware">
                {wareTypeId &&
                  wareClassId &&
                  wareGroupId &&
                  ResponseWaresModels}
              </div>
              <div className="row-field-ware-modaladdware">
                <p className="title-detailware">IRC </p>
                <Input
                  padding="0"
                  height="1.7rem"
                  register={register}
                  size="medium"
                  name="irc"
                  title=""
                />
              </div>
              {/* <div className="field-check-detailware fix-row-detailware">
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
              </div> */}
            </div>
            <div className="row-detailware">
              <div className="row-field-ware-modaladdware">
                <p className="title-detailware">GTIN </p>
                <Input
                  padding="0"
                  height="1.7rem"
                  register={register}
                  size="medium"
                  name="gtin"
                  title=""
                />
              </div>
              <div className="row-field-ware-modaladdware">
                {ResponseManufacturer}
              </div>
              <div className="row-field-ware-modaladdware"></div>
            </div>
          </Container>

          {/* <div className="row-modalAddWare">
            <p className="container-title">مدل های کالا</p>
            <Button
              type="main"
              onClick={() => {
                setModelWare([...modelWare, "model" + (modelWare.length + 1)]);
              }}
              fontSize="0.65rem"
              width="6rem"
              justifyContent="center"
              text="افزودن مدل کالا"
            />
          </div>

          {modelWare.map((model, index) => (
            <ModelWare
              key={index}
              color={index % 2 === 0 ? "violet" : "yellow"}
            />
          ))} */}
          {/* <CostWare /> */}
          <div className="row-costware">
            {/* <div className="part-costware">
              <p className="title-detailware">قیمت برای مراکز درمانی</p>
              <Input
                register={register}
                size="medium"
                name="price"
                title=""
                selectType={"number"}
              />{" "}
            </div> */}
            <div className="part-costware part-left-costware">
              <p className="title-detailware">قیمت برای مصرف کننده</p>
              <Input
                register={register}
                size="medium"
                name="price"
                title=""
                selectType={"number"}
              />{" "}
            </div>
          </div>
        </div>
        <div className="box-bottom-modalAddWare">
          <div className="box-button-modalAddWare">
            <Button
              fontSize="0.8rem"
              width="7rem"
              padding="0.1rem"
              type="redCancel"
              isLoading={resultCreateWare.loading}
              mainType={"button"}
              text="بازگشت"
              onClick={() => history.goBack()}
            />
            <Button
              justifyContent="center"
              fontSize="0.8rem"
              margin="0 1rem"
              width="7rem"
              isLoading={resultCreateWare.loading}
              type="main"
              mainType="submit"
              text={id !== undefined ? "اصلاح" : "افزودن"}
            />
          </div>
        </div>
      </form>
    </ModalBox>
  );
};
