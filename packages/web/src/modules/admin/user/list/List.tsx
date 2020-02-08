import { useMeQuery, useUsersQuery } from "@satek/hooks";
import { getUsers_getUsers_items } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { User } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { UserModalBox } from "../components/modalBox/ModalBox";

interface Props extends RouteComponentProps {}

export const UserList: React.FC<Props> = ({ match: { path } }) => {
  const [Filter, setFilter] = useState({ document: "" });
  const [foundItem, setFoundItem] = useState("0");

  const meSiteId = useMeQuery({ error: CustomError, loading: Loader }, client)
    .data;

  const Parse: React.FC<{ data: getUsers_getUsers_items[] }> = ({ data }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((user: getUsers_getUsers_items) => (
          <User
            key={user.id}
            name={user.firstName}
            familyName={user.lastName}
            phone={user.phoneNumber}
            unitedState={
              user.userToSites![0].site
                ? user.userToSites![0].site.name
                : "نامشخص"
            }
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
            id={user.id}
            path={path}
          />
        ))}
      </>
    );
  };

  const { Response } = useUsersQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {
      document: Filter.document,
      organizationId:
        path.includes("hospital") &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : null,
      unitId:
        path.includes("manager") &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "UnitHead"
            )[0].site!.id
          : null
    },
    client
  );

  useEffect(() => {}, [Filter.document]);

  return (
    <ContainerClient
      className="users-cnt"
      colorHeader="blue"
      textHeader="مدیریت کاربران"
    >
      <div className="header">
        <SearchBar
          type="default"
          className="search-bar"
          buttonLinkTitle="افزودن کاربر"
          placeHolder="در بین نام کاربر، شماره تماس، نام بیمارستان، شهر، نقش و ... جستجو کنید"
          linkTo={`/${path.split("/")[1]}/user/adduser`}
          setFilter={setFilter}
        />
        <LineSeparator foundItem={foundItem} />
      </div>
      <div className="detailGoodsClient-DeliveryGoods grid-goods">
        {Response}
      </div>

      <Route
        exact
        path={`/${path.split("/")[1]}/user/updateuser/:id?`}
        component={UserModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/user/adduser`}
        component={UserModalBox}
      />
      <Route
        exact
        path={`/${path.split("/")[1]}/user/:id?/ware`}
        component={UserModalBox}
      />
    </ContainerClient>
  );
};
