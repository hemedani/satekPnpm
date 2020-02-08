import { useMeQuery } from "@satek/hooks";
import { getAllowedWaresDetailsUser_getUser_allowedWares, getWares_getWares } from "@satek/resolvers";
import React, { useState } from "react";
import { client } from "../../../Apollo";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";
interface Props {
  isHighly: boolean;
  isFavorite?: boolean | null;
  callbackFromParent: (id: string) => void;
  details?: getAllowedWaresDetailsUser_getUser_allowedWares | getWares_getWares;
}
export const DetailGoodsClient: React.FC<Props> = ({
  details,
  isHighly,
  isFavorite,
  callbackFromParent
}) => {
  const [selFavorite, setSelFavorite] = useState<boolean>(
    isFavorite ? isFavorite : false
  );
  
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;

  const clickFavorite = () => {
    console.log("is details &&", details!.id);
    callbackFromParent(details!.id);
  };
  // console.log(path, "path path");
  // function clickFavorite(variables: string) {
  //   setSelFavorite(false);
  //   callbackFromParent(variables);
  // }
  return (
    <div className="DetailGoods-client">
      <div className="fringeColor-DetailGoods-client"></div>

      <div className="container-goods-DetailGoods-client">
        <div className="firstCol-goods-DetailGoods-client">
          <div className="firstRow-goods-DetailGoods-client">
            <span className="ic_barcode icon-DetailGoods"></span>
            <p className="title-goods-DetailGoods-client">نام کالا</p>
            <p className="name-goods-DetailGoods-client">
              {details && details.name}
            </p>
            {/* {selFavorite ? (
                
              ) : (
                <span
                  onClick={() => setSelFavorite(true)}
                  className="ic_heart"
                ></span>
              )}{userLoaderUpdate ? <Loader /> : */}
            <span
              onClick={clickFavorite}
              className={isFavorite ? "ic_full_heart red_ic_heart" : "ic_heart"}
            ></span>
          </div>
          <div className="secondRow-goods-DetailGoods-client">
            <p className="nameEnglish-goods-DetailGoods-client">
              {details && details.enName}
            </p>
          </div>
        </div>
        <div className="secondCol-goods-DetailGoods-client">
          <div className="firstRow-goods-DetailGoods-client">
            <span className="ic_shopping_bag icon-DetailGoods"></span>
            <p className="title-goods-DetailGoods-client">گروه کالا</p>
            <p className="name-goods-DetailGoods-client">
              {/* {details && details.wareGroup!.wareClasses!.name} */}
            </p>
          </div>
          <div className="secondRow-goods-DetailGoods-client">
            <span className="ic_flag icon-DetailGoods"></span>
            <p className="title-goods-DetailGoods-client">کشور سازنده</p>
            <p className="name-goods-DetailGoods-client">
              {details && details.manufacturer!.country}
            </p>
          </div>
        </div>
        <div className="thirdCol-goods-DetailGoods-client">
          <div className="firstRow-goods-DetailGoods-client">
            <span className="ic_shopping_bag_set icon-DetailGoods"></span>
            <p className="title-goods-DetailGoods-client">زیر گروه کالا</p>
            <p className="name-goods-DetailGoods-client">
              {details && details.wareGroup!.name}
            </p>
          </div>
          <div className="secondRow-goods-DetailGoods-client">
            <span className="ic_contract icon-DetailGoods"></span>
            <a
              href={`./SubmitNewRequest/${details && details.id}`}
              className="newRequest-goods-DetailGoods-client"
            >
              سفارش این کالا
            </a>
          </div>
        </div>
      </div>
      {isHighly && (
        <p className="textHighly-goods-DetailGoods-client">
          این کالا در لیست کالاهای پرمصرف شما قرار دارد
        </p>
      )}
    </div>
  );
};
