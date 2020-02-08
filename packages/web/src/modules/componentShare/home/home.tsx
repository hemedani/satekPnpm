import {
  UseGetTotalOrderQuery,
  useMeQuery,
  useCategoriesHeadOfHospitalQuery
} from "@satek/hooks";
import {
  GetCategoriesHeadOfHospital_getCategories,
  getTotalOrder_getStore
} from "@satek/resolvers";
import React from "react";
import { client } from "../../../Apollo";
import { ContainerClient } from "../containerClient/ContainerClient";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";
import { HomeItems } from "./component/HomeItems";
import { sellerHomeItem } from "./dataItemsHome/DataItemHome";
import { Route } from "react-router";
export interface dataHomeSubRequest {
  name: string;
  numRequest: number;
  subName: string;
  path: string;
}
export interface dataHome {
  name: string;
  id?: string;
  isImportant: boolean;
  isRequest: boolean;
  numRequest?: number;
  subName?: string;
  icon?: string;
  path?: string;
  subRequest?: dataHomeSubRequest[];
}
interface Props {
  sideId?: string;
  path?: string;
  data: dataHome[];
  nameUser?: string;

  storeSubdue?: number;
}

export const Home: React.FC<Props> = ({
  nameUser,
  storeSubdue,
  path,
  data
}) => {
  const ParseDataSeller: React.FC<{ data: getTotalOrder_getStore }> = ({
    data
  }) => {
    console.log(sideId, path, data);
    console.log("sideId, path");
    if (path) {
      console.log(data, "data");
      if (path.includes("seller")) {
        sellerHomeItem[0].numRequest = data.totalFastDelivery;
        sellerHomeItem[1].numRequest = data.totalNewOrder;
        sellerHomeItem[2].numRequest = data.totalNotCompleted;
      }
    }

    return (
      <>
        <HomeItems storeSubdue={storeSubdue} data={sellerHomeItem} />{" "}
      </>
    );
  };
  const ParseDataHospital: React.FC<{
    data: GetCategoriesHeadOfHospital_getCategories[];
  }> = ({ data }) => {
    console.log(sideId, path, data);
    console.log("sideId, path");
    let headHospitalHomeItem: dataHome[] = [
      {
        name: "درخواست های فوری",
        isImportant: true,
        isRequest: true,
        numRequest: 5,
        subName: "درخواست"
      }
    ];
    if (path) {
      console.log(data, "data");
      if (path.includes("hospital")) {
        data.map(category => {
          headHospitalHomeItem.push({
            name: category.name,
            isImportant: false,
            isRequest: true,
            id: category.id,
            numRequest: category.orderStatistic
              ? category.orderStatistic.pendingInOrgHeadNumber!
              : 0
          });
        });
      }
    }
    headHospitalHomeItem.push({
      name: "تایید نهایی پرداخت ها",
      isImportant: false,
      isRequest: false,
      numRequest: 0,
      path: "/headofhospital/paymentconfirmation",
      icon: "ic_shopping_bag"
    });
    return (
      <>
        <HomeItems
          nameUser={nameUser}
          path={path}
          data={headHospitalHomeItem}
        />
      </>
    );
  };
  const sideId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const hospital = useCategoriesHeadOfHospitalQuery(
    { error: CustomError, loading: Loader, parsing: ParseDataHospital },
    {
      organizationId:
        sideId &&
        sideId.me &&
        sideId.me.userToSites &&
        sideId.me.userToSites[0] &&
        sideId.me.userToSites[0].site
          ? sideId.me.userToSites[0].site.id
          : ""
    },
    client
  );

  const { Response } = UseGetTotalOrderQuery(
    { error: CustomError, loading: Loader, parsing: ParseDataSeller },
    {
      id:
        sideId &&
        sideId.me &&
        sideId.me.userToSites &&
        sideId.me.userToSites[0] &&
        sideId.me.userToSites[0].site
          ? sideId.me.userToSites[0].site.id
          : ""
    },
    client
  );

  return (
    <ContainerClient
      withoutHeader={true}
      colorHeader="blue"
      textHeader=""
      backGround={true}
    >
      {path && path.includes("seller") ? (
        sideId && Response
      ) : path && path.includes("hospital") ? (
        sideId && hospital.Response
      ) : (
        <HomeItems storeSubdue={storeSubdue} data={data} />
      )}
    </ContainerClient>
  );
};
