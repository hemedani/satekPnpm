import { useOrganizationsQuery } from "@satek/hooks";
import { getOrganizations_getOrganizations } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { Hospital } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { HospitalModalBox } from "../components/modalBox/ModalBox";

export const HospitalList: React.FC = () => {
  const [Filter, setFilter] = useState({ document: "" });
  const [foundItem, setFoundItem] = useState("0");

  const Parse: React.FC<{ data: getOrganizations_getOrganizations[] }> = ({
    data
  }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((organization: getOrganizations_getOrganizations) => (
          <Hospital
            key={organization.id}
            province={organization.state ? organization.state.name : ""}
            university={
              organization.university ? organization.university.name : ""
            }
            hospital={organization.name}
            id={organization.id}
          />
        ))}
      </>
    );
  };

  
  const { Response } = useOrganizationsQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    Filter,
    client
  );
  useEffect(() => {}, [Filter.document]);
  return (
    <ContainerClient
      className="hospital_list"
      colorHeader="blue"
      textHeader="بیمارستان ها و ادارات"
    >
      <SearchBar
        type="default"
        className="search_bar"
        buttonLinkTitle="افزودن بیمارستان"
        placeHolder="نام بیمارستان را وارد نمائید"
        linkTo={`/admin/hospital/addhospital`}
        setFilter={setFilter}
      />
      <LineSeparator foundItem={foundItem} />
      <div className="hospitals">{Response}</div>
      <Route
        exact
        path={`/admin/hospital/updatehospital/:id?`}
        component={HospitalModalBox}
      />
      <Route
        exact
        path={`/admin/hospital/addhospital`}
        component={HospitalModalBox}
      />
    </ContainerClient>
  );
};
