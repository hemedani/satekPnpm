import { useGetStuffsForStoreQuery, useMeQuery } from "@satek/hooks";
import { getStuffsStore_getStore_stuffs, StuffSort } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { client } from "../../../Apollo";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../componentShare/loader/Loader";
import { ConvertDateToShamsi } from "../../function/ConvertDate";
import { ModalAddStuff } from "../modalBox/modalAddStuff/ModalAddStuff";
import { ModalUpdateStuff } from "../modalBox/modalAddStuff/ModalUpdateStuff";
import { ModalTimedSalesSettings } from "../modalBox/modalTimedSalesSettings/ModalTimedSalesSettings";
import { DetailGoodsMyProductList } from "./component/DetailGoodsMyProductList";
import { SearchMyProductList } from "./component/SearchMyProductList";

export const MyProductList: React.FC = () => {
  
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const [page, setPage] = useState(1);
  const [nameWare, setNameWare] = useState();
  const [selectFilter, setSelectFilter] = useState<number>(0);
  const [selectManufacturer, setSelectManufacturer] = useState<string>();
  const [selectWareClass, setSelectWareClass] = useState<string>();
  const [selectWareGroup, setSelectWareGroup] = useState<string>();

  const ParseStuff: React.FC<{ data: getStuffsStore_getStore_stuffs[] }> = ({
    data
  }) => {
    return (
      <>
        {data.map((stuff, index) => (
          <DetailGoodsMyProductList
            key={stuff.id}
            nameGoods={stuff.ware!.name}
            nameEnGoods={stuff.ware!.enName}
            numberInventory={stuff.inventoryNo}
            nameManufacturer={stuff.ware!.manufacturername}
            // nameWareClass={stuff.ware!.wareGroup!.wareClass!.name}
            nameWareClass=""
            link={`/seller/myproductlist/editstuff/${stuff.id}`}
            price={stuff.price}
            expiration={ConvertDateToShamsi(stuff.expiration.split("T")[0])!}
          />
        ))}
      </>
    );
  };

  const { Response } = useGetStuffsForStoreQuery(
    { error: CustomError, loading: Loader, parsing: ParseStuff },
    {
      storeId: meId ? meId.me!.userToSites![0].site!.id : "",
      wareDocument: nameWare ? nameWare : "",
      manufacturerId: selectManufacturer,
      sort:
        selectFilter === 0
          ? StuffSort.Price
          : selectFilter === 1
          ? StuffSort.inventoryNo
          : StuffSort.createdAt
    },
    client
  );
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  function handleScroll(event: any) {
    if (
      event.target.scrollHeight - event.target.clientHeight ===
      event.target.scrollTop
    ) {
      setPage(page + 1);
    }
  }
  return (
    <ContainerClient colorHeader="blue" textHeader="لیست کالا های من">
      <div>
        <div className="search-myProductList-seller">
          <SearchMyProductList
            selectFilter={selectFilter}
            setSelectFilter={setSelectFilter}
            setNameWare={setNameWare}
            setSelectWareGroup={setSelectWareGroup}
            setSelectWareClass={setSelectWareClass}
            setSelectManufacturer={setSelectManufacturer}
          />
        </div>
      </div>
      <LineSeparator />
      <div
        onScroll={handleScroll}
        ref={scroller => {
          scroller = scroller;
        }}
        className="detailGoodsClient-DeliveryGoods"
      >
        {meId && Response}
      </div>
      <Route
        exact
        path="/seller/myproductlist/addstuff"
        render={props => <ModalAddStuff {...props} />}
      />
      <Route
        exact
        path="/seller/myproductlist/editstuff/:id?"
        render={props => <ModalUpdateStuff {...props} />}
      />
      <Route
        exact
        path="/seller/myproductlist/timedsalessettings"
        render={props => <ModalTimedSalesSettings {...props} />}
      />
    </ContainerClient>
  );
};
