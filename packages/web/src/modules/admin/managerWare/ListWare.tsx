// import { useWaresQuery } from "@satek/hooks";
import { getWares_getWares } from "@satek/resolvers";
import React, { useState } from "react";
import { Route } from "react-router";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Good } from "../../componentShare/rectangleItems/RectangleItems";
import { SearchGoodsClient } from "../../componentShare/RequestableGoods/SearchGoodsClient";
import { ModalAddWare } from "../modalBox/modalAddWare/ModalAddWare";

export const ListWare: React.FC = () => {
  const [foundItem, setFoundItem] = useState("0");
  console.log("hi...im in list ware...");
  const Parse: React.FC<{
    data: getWares_getWares[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data.map((details: getWares_getWares) => {
          return (
            // <DetailGoodsClient
            //   key={details.id}
            //   details={details}
            //   isHighly={true}
            // />

            <Good
              nameFa={details.name}
              nameEn={details!.enName!}
              maximumCost={String(details.price)}
              company={details.manufacturername}
              type={details.wareGroup!.name}
              key={details.id}
              id={details.id}
            />
          );
        })}
      </React.Fragment>
    );
  };

  // const ResponseWares = useWaresQuery(
  //   { error: CustomError, loading: Loader, parsing: Parse },
  //   {},
  //   client
  // ).Response;
  return (
    <ContainerClient colorHeader="blue" textHeader="لیست کالاهای سامانه">
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          <SearchGoodsClient
            button={{
              text: "تعریف کالا",
              to: `/admin/listware/modaladdware`
            }}
            vertical={true}
          />
        </div>
        <LineSeparator foundItem={foundItem} />
      </div>
      <div className="detailGoodsClient-DeliveryGoods grid-goods">
        {/* {ResponseWares} */}
      </div>
      <Route
        exact
        path="/admin/listware/modaladdware/:id?"
        render={props => <ModalAddWare {...props} />}
      />
    </ContainerClient>
  );
};
