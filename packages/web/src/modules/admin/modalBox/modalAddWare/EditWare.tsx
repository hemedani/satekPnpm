import {
  useManufacturersQuery,
  useUpdateWareMutate,
  useWareClassesQuery,
  useWareGroupsQuery,
  useWareModelsQuery,
  useWareQuery,
  useWareTypesQuery
} from "@satek/hooks";
import {
  getManufacturers_getManufacturers,
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups,
  getWareModels_getWareModels,
  getWareTypes_getWareTypes,
  getWare_getWare,
  updateWareVariables
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
export const EditWare: React.FC<Props> = ({ history, match: { params } }) => {
  const { id }: any = params;

  const ParseWare: React.FC<{ data: getWare_getWare }> = ({
    data: dataWare
  }) => {
    const { register, handleSubmit, watch, setValue } = useForm<
      updateWareVariables
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

    const { updateWareMutate, result: resultUpdateWare } = useUpdateWareMutate(
      {},
      client
    );

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
          defaultValue={options.find(
            ({ value }) => value === dataWare!.manufacturer!.id
          )}
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
          defaultValue={options.find(
            ({ value }) => value === dataWare!.wareClass!.id
          )}
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
          defaultValue={options.find(
            ({ value }) => value === dataWare!.wareType!.id
          )}
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
          defaultValue={options.find(
            ({ value }) => value === dataWare!.wareGroup!.id
          )}
        />
      );
    };
    const ParseModelsWare: React.FC<{
      data: getWareModels_getWareModels[];
    }> = ({ data }) => {
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
          defaultValue={options.find(
            ({ value }) => value === dataWare!.wareModel!.id
          )}
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

      variables.wareTypeId === undefined &&
        (variables.wareTypeId = dataWare!.wareType!.id);
      variables.wareClassId === undefined &&
        (variables.wareClassId = dataWare!.wareClass!.id);
      variables.wareGroupId === undefined &&
        (variables.wareGroupId = dataWare!.wareGroup!.id);
      variables.wareModelId === undefined &&
        (variables.wareModelId = dataWare!.wareModel!.id);
      val = {
        ...variables,
        umdns: Number(variables.umdns),
        gtin: Number(variables.gtin),
        price: Number(variables.price),
        id: id
      };
      try {
        console.log(val, "val");
        const { data, errors } = await updateWareMutate({ variables: val });
        history.goBack();
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });
    return (
      <form className="modalAddWare" onSubmit={onSubmit}>
        <div className="body-modalAddWare">
          <Container title="مشخصات کالا" margin="0.5rem 0">
            <div className="row-detailware">
              <Input
                register={register}
                size="medium"
                name="name"
                defaultValue={dataWare.name}
                titleStyle={{ color: "black" }}
                title="نام فارسی"
              />
              <div className="field-detailware">
                <Input
                  register={register}
                  padding="0"
                  size="medium"
                  defaultValue={dataWare.enName!}
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
                  defaultValue={String(dataWare.umdns!)}
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
                {ResponseWaresClasses}
                {/* {wareClass.value && ResponseGroup.Response} */}
              </div>
            </div>
            <div className="row-detailware">
              <div className="row-field-ware-modaladdware">
                {ResponseWaresGroups}
              </div>
              <div className="row-field-ware-modaladdware">
                {ResponseWaresModels}
              </div>
              <div className="row-field-ware-modaladdware">
                <p className="title-detailware">IRC </p>
                <Input
                  padding="0"
                  height="1.7rem"
                  register={register}
                  size="medium"
                  defaultValue={dataWare.irc!}
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
                  defaultValue={String(dataWare.gtin!)}
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
                defaultValue={String(dataWare.price!)}
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
              isLoading={resultUpdateWare.loading}
              mainType={"button"}
              text="بازگشت"
              onClick={() => history.goBack()}
            />
            <Button
              justifyContent="center"
              fontSize="0.8rem"
              margin="0 1rem"
              width="7rem"
              isLoading={resultUpdateWare.loading}
              type="main"
              mainType="submit"
              text={id !== undefined ? "اصلاح" : "افزودن"}
            />
          </div>
        </div>
      </form>
    );
  };
  const ResponseWares = useWareQuery(
    { error: CustomError, loading: Loader, parsing: ParseWare },
    { id: id ? id : "" },
    client
  ).Response;

  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="مشاهده درخواست"
      modalBoxSize="medium"
      display="flex"
    >
      {ResponseWares}
    </ModalBox>
  );
};
