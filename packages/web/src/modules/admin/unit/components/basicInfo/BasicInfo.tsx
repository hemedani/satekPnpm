import { useCityUniversitiesQuery, useOrganizationCategoriesQuery, useStateCitiesQuery, useUniversityOrganizationsQuery } from "@satek/hooks";
import { createUnitVariables, getCityUniversities_getCity, getOrganizationCategories_getOrganization, getStateCities_getState, getUnit_getUnit, getUniversityOrganizations_getUniversity } from "@satek/resolvers";
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
  details?: getUnit_getUnit;
  isEditable: boolean;
  isHeadOfHospital: boolean;
}

export const UnitBasicInfo: React.FC<Props> = ({
  details,
  isEditable,
  isHeadOfHospital
}) => {
  const { watch, setValue, register } = useFormContext<createUnitVariables>();
  const stateId = watch!("stateId");
  const cityId = watch!("cityId");
  const universityId = watch!("universityId");
  const organizationId = watch!("organizationId");
  const categoryId = watch!("categoryId");
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
            setValue!("categoryId", "");
            setValue!("address", "");
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
            setValue!("categoryId", "");
            setValue!("address", "");
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
            setValue!("categoryId", "");
            setValue!("organizationId", option.value);
            setValue!("address", organization!.address);
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
  const ParseOrganizationCategories: React.FC<{
    data: getOrganizationCategories_getOrganization;
  }> = ({ data }) => {
    if (data.categories) {
      let options = data.categories.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );

      return (
        <Selector
          className="selector"
          name="categoryId"
          label="یخش"
          placeholder="انتخاب بخش"
          options={options}
          value={options.find(({ value }) => value === categoryId)}
          onChange={(option: SelectorOptions) => {
            setValue!("categoryId", option.value);
          }}
          defaultValue={
            details && {
              value: details.category!.id,
              label: details.category!.name
            }
          }
        />
      );
    }
    return null;
  };
  const ResponseOrganizationCategories = useOrganizationCategoriesQuery(
    {
      error: CustomError,
      loading: Loader,
      parsing: ParseOrganizationCategories
    },
    { id: organizationId ? organizationId : "" },
    client
  );

  // ---------------------------------
  // ---------------------------------
  useEffect(() => {
    register({ name: "cityId" });
    register({ name: "stateId" });
    register({ name: "universityId" });
    register({ name: "organizationId" });
    register({ name: "categoryId" });
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
        title="نام واحد"
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
      {universityId &&
        organizationId &&
        ResponseOrganizationCategories.Response}
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
