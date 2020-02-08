import { useCityUniversitiesQuery, useStateCitiesQuery } from "@satek/hooks";
import { getCityUniversities_getCity, getOrganizationSimple_getOrganization, getStateCities_getState, updateOrganizationVariables } from "@satek/resolvers";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { Loader } from "../../../../componentShare/loader/Loader";
import { Selector, SelectorOptions } from "../../../../componentShare/selectors/Selector";
import { Textarea } from "../../../../componentShare/Textarea/Textarea";
import { StateParser } from "../../../user/components/parsers/StateParser";

interface Props {
  details?: getOrganizationSimple_getOrganization;
  isEditable: boolean;
}

export const HospitalBasicInfo: React.FC<Props> = ({ details, isEditable }) => {
  const { watch, setValue, register } = useFormContext<
    updateOrganizationVariables
  >();
  const stateId = watch!("stateId");
  const cityId = watch!("cityId");
  const universityId = watch!("universityId");

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
            setValue!("universityId", "");
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
  //---------------------------------
  const ParseCityUniversities: React.FC<{
    data: getCityUniversities_getCity;
  }> = ({ data }) => {
    if (data.universities) {
      let options = data.universities.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );
      return (
        <Selector
          className="selector"
          name="universityId"
          label="دانشگاه"
          placeholder="انتخاب دانشگاه"
          options={options}
          value={options.find(({ value }) => value === universityId)}
          onChange={(option: SelectorOptions) =>
            setValue!("universityId", option.value)
          }
          defaultValue={
            details && {
              value: details.university!.id,
              label: details.university!.name
            }
          }
        />
      );
    }
    return null;
  };

  const ResponseCityUniversities = useCityUniversitiesQuery(
    { error: CustomError, loading: Loader, parsing: ParseCityUniversities },
    { id: cityId ? cityId : details && details.city ? details.city.id : "" },
    client
  );

  useEffect(() => {
    register({ name: "cityId" });
    register({ name: "stateId" });
    register({ name: "universityId" });
    register({ name: "name" });
    register({ name: "contact" });
    register({ name: "address" });
  });

  return (
    <Container title="اطلاعات اولیه" className="hospital_modal_box_basic_info">
      <Input
        className="input"
        classNameTitle="title"
        defaultValue={details ? details.name : ""}
        register={register}
        size="medium"
        name="name"
        title="نام بیمارستان"
        onChange={e => setValue!("name", e.target.value)}
      />

      <Input
        className="input"
        classNameTitle="title"
        register={register}
        defaultValue={details ? details.contact! : ""}
        size="medium"
        name="contact"
        title="راه ارتباطی"
        onChange={e => setValue!("contact", e.target.value)}
      />
      <StateParser
        type="updateOrganization"
        defaultValue={details && details.state}
      />
      {stateId && ResponseStateCities.Response}
      {stateId && cityId && ResponseCityUniversities.Response}

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
