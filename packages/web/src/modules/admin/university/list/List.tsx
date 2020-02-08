import { useUniversitiesQuery } from "@satek/hooks";
import { getUniversities_getUniversities } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { University } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { UniversityModalBox } from "../components/modalBox/ModalBox";

export const UniversityList: React.FC = () => {
  const [Filter, setFilter] = useState({ document: "" });
  const [foundItem, setFoundItem] = useState("0");

  const Parse: React.FC<{ data: getUniversities_getUniversities[] }> = ({
    data
  }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((university: getUniversities_getUniversities) => (
          <University
            key={university.id}
            id={university.id}
            university={university.name}
            province={university.state!.name}
          />
        ))}
      </>
    );
  };

  const { Response } = useUniversitiesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    Filter,
    client
  );

  useEffect(() => {}, [Filter.document]);

  return (
    <ContainerClient
      className="university_list"
      colorHeader="blue"
      textHeader="دانشگاه‌ها"
    >
      <SearchBar
        type="default"
        className="search_bar"
        buttonLinkTitle="افزودن دانشگاه"
        placeHolder="نام دانشگاه را وارد نمائید"
        linkTo="/admin/university/adduniversity"
        setFilter={setFilter}
      />
      <LineSeparator foundItem={foundItem} />
      <div className="universities">{Response}</div>
      <Route
        exact
        path={`/admin/university/updateuniversity/:id?`}
        component={UniversityModalBox}
      />
      <Route
        exact
        path={`/admin/university/adduniversity`}
        component={UniversityModalBox}
      />
    </ContainerClient>
  );
};
