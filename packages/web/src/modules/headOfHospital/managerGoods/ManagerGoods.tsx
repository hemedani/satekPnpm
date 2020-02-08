import { useAllowedWaresDetailsUserQuery, useFavoriteWaresDetailsUserQuery, useMeQuery, useUpdateFavoriteWaresForUserMutate } from "@satek/hooks";
import { getAllowedWaresDetailsUser_getUser, getAllowedWaresDetailsUser_getUser_allowedWares, getFavoriteWaresDetailsUser_getUser, getFavoriteWaresDetailsUser_getUser_favoriteWares } from "@satek/resolvers";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { client } from "../../../Apollo";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { DetailGoodsClient } from "../../componentShare/detailGoodsClient/DetailGoodsClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../componentShare/loader/Loader";
import { SearchGoodsClient } from "../../componentShare/RequestableGoods/SearchGoodsClient";

interface Props extends RouteComponentProps {}

export const ManagerGoods: React.FC<Props> = ({ match: { path } }) => {
  const [foundItem, setFoundItem] = useState("0");
  
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { UpdateFavoriteWareUserMutate } = useUpdateFavoriteWaresForUserMutate(
    { id: meSiteId ? meSiteId.me!.id : "" },
    client
  );
  const callBackFunction = async (id: string) => {
    if (data && data.getUser) {
      let val: string[] = [];

      if (data.getUser.favoriteWaresIds) {
        val = data.getUser.favoriteWaresIds;
        let index = val.indexOf(id);
        console.log(index, "index");

        if (index <= -1) {
          val.push(id);
        } else {
          val.splice(index, 1);
        }
      } else {
        val.push(id);
        console.log(id, "index id");
      }

      let variables = { favoriteWaresIds: val };

      const result = await UpdateFavoriteWareUserMutate({ variables });
    }
  };
  const Parse: React.FC<{
    data: getAllowedWaresDetailsUser_getUser;
  }> = ({ data }) => {
    setFoundItem(data ? String(data.allowedWares!.length) : "0");
    if (data.allowedWares) {
      console.log(data, "data.allowedWares");
      return (
        <React.Fragment>
          {data.allowedWares.map(
            (details: getAllowedWaresDetailsUser_getUser_allowedWares) => {
              return (
                <DetailGoodsClient
                  key={details.id}
                  details={details}
                  callbackFromParent={callBackFunction}
                  isHighly={false}
                  isFavorite={
                    data.favoriteWaresIds &&
                    data.favoriteWaresIds!.includes(details.id!)
                  }
                />
              );
            }
          )}
        </React.Fragment>
      );
    }
    return null;
  };
  const { Response, data } = useAllowedWaresDetailsUserQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    {
      id: meSiteId && meSiteId.me ? meSiteId.me.id : ""
    },
    client
  );

  const ParseFavorite: React.FC<{
    data: getFavoriteWaresDetailsUser_getUser;
  }> = ({ data }) => {
    console.log(data.favoriteWares, "!!!!!!!!!!!!~~~!!!!!!!!!");

    if (data.favoriteWares) {
      return (
        <React.Fragment>
          {data.favoriteWares.map(
            (details: getFavoriteWaresDetailsUser_getUser_favoriteWares) => {
              console.log("$#!@3", details.id);
              return (
                <DetailGoodsClient
                  key={details.id}
                  details={details}
                  callbackFromParent={callBackFunction}
                  isHighly={false}
                  isFavorite={true}
                />
              );
            }
          )}
        </React.Fragment>
      );
    }
    return null;
  };
  const ResponseFavoriteWares = useFavoriteWaresDetailsUserQuery(
    { error: CustomError, loading: Loader, parsing: ParseFavorite },
    {
      id: meSiteId && meSiteId.me ? meSiteId.me.id : ""
    },
    client
  ).Response;

  return (
    <ContainerClient colorHeader="blue" textHeader="کالا های قابل درخواست">
      {path.includes("highlyusedgoods") ? (
        <div className="box-title-managergoods">
          <span className="ic_info_circle"></span>
          <p className="title-managergoods">
            کالا های این لیست بر اساس انتخاب شما به عنوان کالای محبوب با نماد
            نمایش داده می شود
          </p>
        </div>
      ) : (
        <>
          <SearchGoodsClient hasNotification={false} vertical={true} />

          <LineSeparator foundItem={foundItem} />
        </>
      )}
      {console.log(path.includes("highlyusedgoods"))}
      <div className="detailGoodsClient-DeliveryGoods">
        {meSiteId && path.includes("highlyusedgoods")
          ? ResponseFavoriteWares
          : Response}
      </div>
    </ContainerClient>
  );
};
