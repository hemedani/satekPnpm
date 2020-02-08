import {
  useCityUniversitiesQuery,
  useCreateUserToSiteMutate,
  useMeQuery,
  useOrganizationUnitsQuery,
  useStateCitiesQuery,
  useStatesQuery,
  useUniversityOrganizationsQuery
} from "@satek/hooks";
import {
  createUserToSiteVariables,
  getCityUniversities_getCity,
  getOrganizationUnits_getOrganization,
  getStateCities_getState,
  getStates_getStates,
  getUniversityOrganizations_getUniversity,
  UserRole
} from "@satek/resolvers";
import classNames from "classnames";
import { History } from "history";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../../Apollo";
import Role from "../../../../Roles";
import { CustomError } from "../../customError/CustomError";
import { Loader } from "../../loader/Loader";
import { Selector, SelectorOptions } from "../../selectors/Selector";
import { ModalBox } from "../ModalBox";

const allRoles = [
  "Master",
  "Admin",
  "DiagnosisPosition",
  "OrganizationHead",
  "FinanceHead",
  "FinanceEmployee",
  "Expert",
  "UnitHead",
  "UnitEmployee",
  "UniversityHead",
  "StoreHead",
  "Normal"
];
const headRoles = [
  "Admin",
  "DiagnosisPosition",
  "FinanceHead",
  "FinanceEmployee",
  "Expert",
  "UnitHead",
  "UnitEmployee",
  "Normal"
];
const unitHeadRoles = ["UnitEmployee", "Normal"];
const hospitalRoles = [""];
const unitRoles = ["UnitHead", "UnitEmployee"];
interface Props {
  type: "Admin" | "OrganizationHead" | "UnitHead";
  history?: History;
  id: string;
  siteIdCallBack(props: string): void;
}
interface SelectorOptionsRole {
  label: string;
  value: UserRole;
}
export const ModalBoxSelectLocationServiceUser: React.FC<Props> = ({
  type,
  history,
  id,
  siteIdCallBack
}) => {
  function whichRole(role: string) {
    switch (role) {
      case "Admin":
        return allRoles;
      case "OrganizationHead":
        return headRoles;
      case "UnitHead":
        return unitHeadRoles;
      default:
        return unitHeadRoles;
    }
  }

  const { register, handleSubmit, watch, setValue } = useForm<
    createUserToSiteVariables
  >();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [university, setUniversity] = useState<string>();
  const [organization, setOrganization] = useState<string>();
  const [unit, setUnit] = useState<string>();
  const [servicePlace, setServicePlace] = useState<string>();
  const role = watch("role") as UserRole;
  console.log(type, "type is...");

  const { createUserToSiteMutate } = useCreateUserToSiteMutate({}, client);

  const onSubmit = handleSubmit(async variables => {
    let val = variables;
    console.log(variables, "variables ");
    // if (
    //   type === "OrganizationHead" &&
    //   meSiteId &&
    //   meSiteId.me &&
    //   meSiteId.me.userToSites
    // ) {
    //   val = {
    //     ...variables,
    //     siteId: meSiteId!.me!.userToSites!.filter(
    //       (t: { role: string }) => t.role === "OrganizationHead"
    //     )[0].site!.id
    //   };
    // } else
    if (
      type === "UnitHead" &&
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites
    ) {
      val = {
        ...variables,
        siteId: meSiteId!.me!.userToSites!.filter(
          (t: { role: string }) => t.role === "UnitHead"
        )[0].site!.id
      };
    }
    try {
      console.log(val, "val is...");
      const result = await createUserToSiteMutate({ variables: val });
      if (val.role === UserRole.UnitHead) {
        val.role = UserRole.UnitEmployee;
        const result = await createUserToSiteMutate({ variables: val });
      }
      console.log(result, "result is...");
    } catch (err) {
      console.log(JSON.stringify(err), "error");
    }
  });

  useEffect(() => {
    register({ name: "role" });
    register({ name: "siteId" });
    register({ name: "userId" });
  }, [register]);

  const ParseRoles: React.FC = ({}) => {
    let options = whichRole(type)!.reduce<SelectorOptions[]>(
      (options, option) => {
        options.push({ label: Role(option), value: option });
        return options;
      },
      []
    );

    return (
      <Selector
        name="role"
        label="نقش کاربری"
        placeholder="انتخاب نقش کاربری"
        style={{ display: "flex", alignItems: "center" }}
        width="12rem"
        options={options}
        value={options.find(({ value }) => value === role)}
        onChange={(option: SelectorOptionsRole) => {
          setValue("role", UserRole[option.value]);
          setValue("userId", id);
        }}
      />
    );
  };
  const Parse: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        className="selector"
        name="stateId"
        label="استان"
        placeholder="انتخاب استان"
        width="12rem"
        style={{ marginLeft: "1rem" }}
        options={options}
        value={options.find(({ value }) => value === state)}
        onChange={(option: SelectorOptions) => {
          setState(option.value);
        }}
      />
    );
  };
  const StateCitiesFiled: React.FC<{ data: getStateCities_getState }> = ({
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
          labelStyle={{ width: "3rem" }}
          placeholder="انتخاب شهر"
          width="12rem"
          options={options}
          value={options.find(({ value }) => value === city)}
          onChange={(option: SelectorOptions) => setCity(option.value)}
        />
      );
    }

    return null;
  };

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
          className={classNames("selector", university ? "have-margin" : "")}
          name="universityId"
          label="دانشگاه"
          placeholder="انتخاب دانشگاه"
          options={options}
          value={options.find(({ value }) => value === university)}
          onChange={(option: SelectorOptions) => {
            setValue("siteId", option.value);
            setUniversity(option.value);
            if (role === UserRole.UniversityHead) {
              setValue("siteId", option.value);
              setServicePlace(option.label);
            }
          }}
        />
      );
    }

    return null;
  };
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
          value={options.find(({ value }) => value === organization)}
          onChange={(option: SelectorOptions) => {
            let organization = data.organizations!.find(
              value => value.id === option.value
            );

            if (!unitRoles.includes(role!)) {
              setValue("siteId", option.value);
              setServicePlace(option.label);
            }
            setOrganization(option.value);
          }}
        />
      );
    }

    return null;
  };
  const ParseOrganizationUnits: React.FC<{
    data: getOrganizationUnits_getOrganization;
  }> = ({ data }) => {
    if (data.categories && data.categories[0].units) {
      let options = data.categories[0].units.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );

      return (
        <Selector
          className="selector"
          name="unitId"
          label="واحد"
          placeholder="انتخاب واحد"
          options={options}
          value={options.find(({ value }) => value === unit)}
          onChange={(option: SelectorOptions) => {
            setUnit(option.value);
            if (unitRoles.includes(role!)) {
              setValue("siteId", option.value);
              setServicePlace(option.label);
            }
          }}
        />
      );
    }

    return null;
  };

  const { Response } = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {},
    client
  );
  const StateResp = useStateCitiesQuery(
    { error: CustomError, loading: Loader, parsing: StateCitiesFiled },
    { id: state ? state : "" },
    client
  );
  const ResponseCityUniversities = useCityUniversitiesQuery(
    { error: CustomError, loading: Loader, parsing: ParseCityUniversities },
    { id: city ? city : "" },
    client
  );
  const ResponseUniversityOrganizations = useUniversityOrganizationsQuery(
    {
      error: CustomError,
      loading: Loader,
      parsing: ParseUniversityOrganizations
    },
    { id: university ? university : "" },
    client
  );
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const ResponseOrganizationUnits = useOrganizationUnitsQuery(
    {
      error: CustomError,
      loading: Loader,
      parsing: ParseOrganizationUnits
    },
    {
      id:
        type === "OrganizationHead" &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : organization!
    },
    client
  );

  return (
    <ModalBox
      headerIcon="ic_cross"
      modalBoxSize="large"
      history={history}
      headerName="انتخاب محل خدمت برای کاربر"
      display="flex"
    >
      <form className="form" onSubmit={onSubmit}>
        <div className="body-modalBox-selectLocationServiceUser-admin">
          <div className="container-SelectLocation-admin">
            <div className="field-input-component-admin">
              <p className="point-modalBox-component-admin">
                <span>!</span>برای انتخاب محل خدمت قسمت های زیر را به ترتیب
                تکمیل نمایید
              </p>
            </div>
            <div className="field-input-component-admin">
              <div className="field-input-right-component-admin">
                <ParseRoles />
              </div>
              <div className="field-input-left-component-admin"></div>
            </div>

            <React.Fragment>
              <div className="field-input-component-admin">
                <div className="field-input-right-component-admin">
                  {type === "Admin" && Response}
                </div>
                {type === "Admin" && state && StateResp.Response}
              </div>
              <div className="field-input-component-admin">
                <div className="field-input-right-component-admin">
                  <div className="field-input-left-component-admin">
                    {type === "Admin" &&
                      city &&
                      ResponseCityUniversities.Response}
                  </div>
                </div>
                <div className="field-input-right-component-admin">
                  {type === "Admin" &&
                    university &&
                    ResponseUniversityOrganizations.Response}
                </div>
              </div>

              <div className="field-input-component-admin">
                <div className="field-input-right-component-admin">
                  {type === "OrganizationHead"
                    ? meSiteId && ResponseOrganizationUnits.Response
                    : type === "Admin" && organization
                    ? ResponseOrganizationUnits.Response
                    : null}
                </div>
                <div className="field-input-left-component-admin">
                  <Selector
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center"
                    }}
                    label="نام زیر واحد"
                    name="subUnit"
                    placeholder=""
                    options={[]}
                  />
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        <div className="boxButton-modalBox-selectLocationServiceUser-admin">
          <div className="container-add-modalBox-selectLocationServiceUser-admin">
            <button className="button-add-modalBox-selectLocationServiceUser-admin">
              افزودن دانشگاه
            </button>
            <button className="button-add-modalBox-selectLocationServiceUser-admin">
              افزودن بیمارستان
            </button>
            <button className="button-add-modalBox-selectLocationServiceUser-admin">
              افزودن واحد/بخش
            </button>
          </div>
          <div className="container-submit-modalBox-selectLocationServiceUser-admin">
            <button className="button-modalBox-selectLocationServiceUser-admin">
              تایید اطلاعات
            </button>
            <p className="textCancel-modalBox-selectLocationServiceUser-admin">
              انصراف
            </p>
          </div>
        </div>
      </form>
    </ModalBox>
  );
};
