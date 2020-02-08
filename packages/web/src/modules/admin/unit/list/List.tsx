import { useMeQuery, useUnitsQuery } from "@satek/hooks";
import { getUnits_getUnits } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { Unit } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { UnitModalBox } from "../components/modalBox/ModalBox";

interface Props extends RouteComponentProps {}

export const UnitList: React.FC<Props> = ({ match: { path } }) => {
  const [Filter, setFilter] = useState({ document: "" });
  const [foundItem, setFoundItem] = useState("0");

  const Parse: React.FC<{ data: getUnits_getUnits[] }> = ({ data }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((unit: getUnits_getUnits) => (
          <Unit
            path={path}
            key={unit.id}
            unit={unit.name}
            hospital={unit.organization!.name}
            university={unit.university!.name}
            province={unit.state!.name}
            id={unit.id}
          />
        ))}
      </>
    );
  };

  const { Response, data } = useMeQuery(
    { error: CustomError, loading: Loader },
    client
  );

  const UnitsResponse = useUnitsQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {
      document: Filter.document,
      organizationId:
        data && data.me && data.me.userToSites && path.split("/")[1] !== "admin"
          ? data!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : null
    },
    client
  );

  useEffect(() => {}, [Filter]);

  return (
    <ContainerClient
      className="university_list"
      colorHeader="blue"
      textHeader="واحدها و بخش‌ها"
    >
      <SearchBar
        type="default"
        className="search_bar"
        buttonLinkTitle="افزودن واحد"
        placeHolder="نام واحد را وارد نمائید"
        linkTo={`/${path.split("/")[1]}/unit/addunit`}
        setFilter={setFilter}
      />
      <LineSeparator foundItem={foundItem} />
      <div className="universities">{data && UnitsResponse.Response}</div>
      <Route
        exact
        path={`/${path.split("/")[1]}/unit/updateunit/:id?`}
        component={UnitModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/unit/addunit`}
        component={UnitModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/unit/:id?/waregroup`}
        component={UnitModalBox}
      />
    </ContainerClient>
  );
};
