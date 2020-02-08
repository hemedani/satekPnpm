import { useStateCitiesQuery } from "@satek/hooks";
import {
  createUniversityVariables,
  getStateCities_getState,
  getUniversity_getUniversity
} from "@satek/resolvers";
import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { Loader } from "../../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../../componentShare/selectors/Selector";
import { Textarea } from "../../../../componentShare/Textarea/Textarea";
import { StateParser } from "../../../user/components/parsers/StateParser";

interface Props {
  details?: getUniversity_getUniversity;
  isEditable: boolean;
}

export const UniversityBasicInfo: React.FC<Props> = ({
  details,
  isEditable
}) => {
  const { watch, setValue, register } = useFormContext<
    createUniversityVariables
  >();
  const stateId = watch!("stateId");
  const cityId = watch!("cityId");
  //---------------------------------
  //---------------------------------
  const ParseStateCities: React.FC<{ data: getStateCities_getState }> = ({
    data
  }) => {
    if (data.cities) {
      let options = data.cities.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);
      return (
        <Selector
          className="selector"
          name="cityId"
          label="شهر"
          placeholder="انتخاب شهر"
          options={options}
          value={options.find(({ value }) => value === cityId)}
          onChange={(option: SelectorOptions) => {
            setValue!("cityId", option.value);
          }}
          defaultValue={
            details && { value: details.city!.id, label: details.city!.name }
          }
        />
      );
    }

    return null;
  };
  
  const ResponseStateCities = useStateCitiesQuery(
    { error: CustomError, loading: Loader, parsing: ParseStateCities },
    {
      id: stateId ? stateId : details && details.state ? details.state.id : ""
    },
    client
  );
  //---------------------------------
  useEffect(() => {
    register({ name: "cityId" });
    register({ name: "stateId" });
    register({ name: "name" });
    register({ name: "address" });
  });
  return (
    <Container
      title="اطلاعات اولیه"
      className="university_modal_box_basic_info"
    >
      <Input
        className="input"
        classNameTitle="title"
        defaultValue={details ? details.name : ""}
        register={register}
        size="medium"
        name="name"
        title="نام دانشگاه"
        onChange={e => setValue!("name", e.target.value)}
      />
      <StateParser
        type="createUniversity"
        defaultValue={details && details.state}
      />
      {stateId && ResponseStateCities.Response}
      <Textarea
        register={register}
        defaultValue={details && details.address ? details.address : ""}
        classNameTitle="title"
        title="آدرس"
        className="textarea"
        isBordered="true"
        name="address"
      />
    </Container>
  );
};
