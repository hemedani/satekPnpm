import { useCategoriesQuery, useMeQuery } from "@satek/hooks";
import { getCategories_getCategories } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { Category } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { CategoryModalBox } from "../components/modalBox/ModalBox";

interface Props extends RouteComponentProps {}

export const CategoryList: React.FC<Props> = ({ match: { path } }) => {
  const [Filter, setFilter] = useState({ document: "" });
  const [foundItem, setFoundItem] = useState("0");

  const Parse: React.FC<{ data: getCategories_getCategories[] }> = ({
    data
  }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((category: getCategories_getCategories) => (
          <Category
            path={path}
            key={category.id}
            category={category.name}
            hospital={category.organization!.name}
            university={category.university!.name}
            province={category.state!.name}
            city={category.city!.name}
            id={category.id}
          />
        ))}
      </>
    );
  };

  const { Response, data } = useMeQuery(
    { error: CustomError, loading: Loader },
    client
  );

  const CategoriesResponse = useCategoriesQuery(
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
      textHeader="بخش‌ها"
    >
      <SearchBar
        type="default"
        className="search_bar"
        buttonLinkTitle="افزودن بخش"
        placeHolder="نام بخش را وارد نمائید"
        linkTo={`/${path.split("/")[1]}/category/addcategory`}
        setFilter={setFilter}
      />
      <LineSeparator foundItem={foundItem} />
      <div className="universities">{data && CategoriesResponse.Response}</div>
      <Route
        exact
        path={`/${path.split("/")[1]}/category/updatecategory/:id?`}
        component={CategoryModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/category/addcategory`}
        component={CategoryModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/category/:id?/waregroup`}
        component={CategoryModalBox}
      />
    </ContainerClient>
  );
};
