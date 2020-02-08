import {
  useCityUniversitiesQuery,
  useCreateUserToSiteMutate,
  useMeQuery,
  useOrganizationUnitsQuery,
  useStateCitiesQuery,
  useUniversityOrganizationsQuery
} from "@satek/hooks";
import {
  createUserToSiteVariables,
  getCityUniversities_getCity,
  getOrganizationUnits_getOrganization,
  getStateCities_getState,
  getUniversityOrganizations_getUniversity,
  UserRole
} from "@satek/resolvers";
import classNames from "classnames";
import H from "history";
import React, { useEffect, useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import Role from "../../../../../Roles";
import { Button } from "../../../../componentShare/button/Button";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../../componentShare/selectors/Selector";
import { unitRoles, whichRole } from "../../components/enums/Enums";
import { StateParser } from "../../components/parsers/StateParser";

interface Props {
  type: "Admin" | "OrganizationHead" | "UnitHead";
  history: H.History;
  id: string;
}

interface SelectorOptionsRole {
  label: string;
  value: UserRole;
}

export const CreateToSite: React.FC<Props> = ({ type, history, id }) => {
  const [CityId, setCityId] = useState<string | null>();
  const [StateId, setStateId] = useState<string | null>();
  const [UniversityId, setUniversityId] = useState<string | null>();
  const [OrganizationId, setOrganizationId] = useState<string | null>();
  const [UnitId, setUnitId] = useState<string | null>();

  const methods = useForm<createUserToSiteVariables>();
  const role = methods.watch("role") as UserRole;

  const { createUserToSiteMutate } = useCreateUserToSiteMutate({}, client);
  //----------
  const meSiteId = useMeQuery({ error: CustomError, loading: Loader }, client)
    .data;
  //----------
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
          methods.setValue("role", UserRole[option.value]);
          methods.setValue("userId", id);
        }}
      />
    );
  };
  //----------
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
          labelStyle={{ width: "3rem" }}
          placeholder="انتخاب شهر"
          width="12rem"
          options={options}
          value={options.find(({ value }) => value === CityId)}
          onChange={(option: SelectorOptions) => {
            setUniversityId(null);
            setOrganizationId(null);
            setUnitId(null);
            setCityId(option.value);
          }}
        />
      );
    }
    return null;
  };

  const StateCitiesResponse = useStateCitiesQuery(
    { error: CustomError, loading: Loader, parsing: ParseStateCities },
    { id: StateId ? StateId : "" },
    client
  );
  //----------
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
          className={classNames("selector", UniversityId ? "have-margin" : "")}
          name="universityId"
          label="دانشگاه"
          placeholder="انتخاب دانشگاه"
          options={options}
          value={options.find(({ value }) => value === UniversityId)}
          onChange={(option: SelectorOptions) => {
            methods.setValue("siteId", option.value);
            setUniversityId(option.value);
            if (role === UserRole.UniversityHead) {
              setOrganizationId(null);
              setUnitId(null);
              setUniversityId(option.value);
              methods.setValue("siteId", option.value);
            }
          }}
        />
      );
    }
    return null;
  };
  const ResponseCityUniversities = useCityUniversitiesQuery(
    { error: CustomError, loading: Loader, parsing: ParseCityUniversities },
    { id: CityId ? CityId : "" },
    client
  );
  //----------
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
          value={options.find(({ value }) => value === OrganizationId)}
          onChange={(option: SelectorOptions) => {
            setUnitId(null);
            if (!unitRoles.includes(role!)) {
              methods.setValue("siteId", option.value);
            }
            setOrganizationId(option.value);
          }}
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
    { id: UniversityId ? UniversityId : "" },
    client
  );
  //----------
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
          value={options.find(({ value }) => value === UnitId)}
          onChange={(option: SelectorOptions) => {
            if (unitRoles.includes(role!)) {
              methods.setValue("siteId", option.value);
            }
            setUnitId(option.value);
          }}
        />
      );
    }
    return null;
  };

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
          : OrganizationId!
    },
    client
  );
  //----------
  const onSubmit = methods.handleSubmit(async variables => {
    let val = variables;
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
      const result = await createUserToSiteMutate({ variables: val });
      if (val.role === UserRole.UnitHead) {
        val.role = UserRole.UnitEmployee;
        const result = await createUserToSiteMutate({ variables: val });
      }
    } catch (err) {}
    history.goBack();
  });

  useEffect(() => {
    methods.register({ name: "role" });
    methods.register({ name: "siteId" });
    methods.register({ name: "userId" });
  }, [methods]);

  return (
    <FormContext {...methods}>
      <form className="form" onSubmit={onSubmit}>
        <ParseRoles />
        {type === "Admin" && (
          <StateParser
            type="createUserToSite"
            useStateProps={{
              setCityId,
              setOrganizationId,
              setStateId,
              StateId,
              setUnitId,
              setUniversityId
            }}
          />
        )}
        {type === "Admin" && StateId && StateCitiesResponse.Response}
        {type === "Admin" &&
          StateId &&
          CityId &&
          ResponseCityUniversities.Response}
        {type === "Admin" &&
          StateId &&
          CityId &&
          UniversityId &&
          ResponseUniversityOrganizations.Response}
        {type === "OrganizationHead"
          ? meSiteId && ResponseOrganizationUnits.Response
          : type === "Admin" && OrganizationId
          ? ResponseOrganizationUnits.Response
          : null}
        <Button text="تائید اطلاعات" type="accept" />
      </form>
    </FormContext>
  );
};
