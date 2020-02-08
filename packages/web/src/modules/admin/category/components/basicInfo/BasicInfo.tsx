import { useCityUniversitiesQuery, useStateCitiesQuery, useUniversityOrganizationsQuery } from "@satek/hooks";
import { createCategoryVariables, getCategory_getCategory, getCityUniversities_getCity, getStateCities_getState, getUniversityOrganizations_getUniversity } from "@satek/resolvers";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { Loader } from "../../../../componentShare/loader/Loader";
import { Selector, SelectorOptions } from "../../../../componentShare/selectors/Selector";
import { StateParser } from "../../../user/components/parsers/StateParser";

interface Props {
  details?: getCategory_getCategory;
  isEditable: boolean;
  isHeadOfHospital: boolean;
}

export const CategoryBasicInfo: React.FC<Props> = ({
  details,
  isEditable,
  isHeadOfHospital
}) => {
  const { watch, setValue, register } = useFormContext<
    createCategoryVariables
  >();
  const stateId = watch!("stateId");
  const cityId = watch!("cityId");
  const universityId = watch!("universityId");
  const organizationId = watch!("organizationId");
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
            setValue!("organizationId", "");
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
          onChange={(option: SelectorOptions) => {
            setValue!("organizationId", "");
            setValue!("universityId", option.value);
          }}
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
  // ---------------------------------
  // ---------------------------------
  const ParseUniversityOrganizations: React.FC<{
    data: getUniversityOrganizations_getUniversity;
  }> = ({ data }) => {
    if (data.organizations) {
      let options = data.organizations.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );

      return (
        <Selector
          className="selector"
          name="organizationId"
          label="بیمارستان"
          placeholder="انتخاب بیمارستان"
          options={options}
          value={options.find(({ value }) => value === organizationId)}
          onChange={(option: SelectorOptions) => {
            let organization = data.organizations!.find(
              value => value.id === option.value
            );
            setValue!("organizationId", option.value);
          }}
          defaultValue={
            details && {
              value: details.organization!.id,
              label: details.organization!.name
            }
          }
        />
      );
    }

    return null;
  };
  const ResponseUniversityOrganizations = useUniversityOrganizationsQuery(
    {
      error: CustomError,
      loading: Loader,
      parsing: ParseUniversityOrganizations
    },
    { id: universityId ? universityId : "" },
    client
  );

  // ---------------------------------
  // ---------------------------------
  useEffect(() => {
    register({ name: "cityId" });
    register({ name: "stateId" });
    register({ name: "universityId" });
    register({ name: "organizationId" });
    register({ name: "name" });
    register({ name: "enName" });
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
        title="نام واحد"
        onChange={e => setValue!("name", e.target.value)}
      />
      <Input
        className="input"
        classNameTitle="title"
        defaultValue={details ? details.name : ""}
        register={register}
        size="medium"
        name="enName"
        title="Category Name"
        onChange={e => setValue!("enName", e.target.value)}
      />
      {!isHeadOfHospital && (
        <StateParser
          type="createUnit"
          defaultValue={details && details.state}
        />
      )}
      {!isHeadOfHospital && stateId && ResponseStateCities.Response}
      {!isHeadOfHospital &&
        stateId &&
        cityId &&
        ResponseCityUniversities.Response}
      {universityId && ResponseUniversityOrganizations.Response}
    </Container>
  );
};
