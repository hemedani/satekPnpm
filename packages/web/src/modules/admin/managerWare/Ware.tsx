import {
  useWareClassesQuery,
  useWareGroupsQuery,
  useWareModelsQuery,
  useWaresQuery,
  useWareTypesQuery
} from "@satek/hooks";
import {
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups,
  getWareModels_getWareModels,
  getWares_getWares,
  getWareTypes_getWareTypes
} from "@satek/resolvers";
import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../Apollo";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../componentShare/loader/Loader";
import { GridWare } from "../../componentShare/ware/Group";
import { EditWare } from "../modalBox/modalAddWare/EditWare";
import { ModalAddWare } from "../modalBox/modalAddWare/ModalAddWare";
import { ModalEditWare } from "./ModalEditWare";
import { ModalIsConfidence } from "./ModalIsConfidence";
import { ModalWare } from "./ModalWare";
import { SearchWare } from "./SearchWare";

interface Props extends RouteComponentProps {}
export const Ware: React.FC<Props> = ({ match: { path } }) => {
  const [foundItem, setFoundItem] = useState("0");
  const ParseWareTypes: React.FC<{
    data: getWareTypes_getWareTypes[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data &&
          data.map((details: getWareTypes_getWareTypes) => {
            return (
              <GridWare
                key={details.id}
                path={path}
                id={details.id}
                en={details.enName}
                name={details.name}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const ParseWareClasses: React.FC<{
    data: getWareClasses_getWareClasses[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data &&
          data.map((details: getWareClasses_getWareClasses) => {
            return (
              <GridWare
                key={details.id}
                path={path}
                id={details.id}
                typeware={details.wareType ? details.wareType.name : ""}
                en={details.enName}
                name={details.name}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const ParseWareGroups: React.FC<{
    data: getWareGroups_getWareGroups[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data &&
          data.map((details: getWareGroups_getWareGroups) => {
            return (
              <GridWare
                key={details.id}
                path={path}
                id={details.id}
                // typeware={details.wareType ? details.wareType.name : ""}
                en={details.enName}
                name={details.name}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const ParseWareModels: React.FC<{
    data: getWareModels_getWareModels[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data &&
          data.map((details: getWareModels_getWareModels) => {
            return (
              <GridWare
                key={details.id}
                path={path}
                id={details.id}
                // typeware={details.wareType ? details.wareType.name : ""}
                en={details.enName ? details.enName : ""}
                name={details.name}
              />
            );
          })}
      </React.Fragment>
    );
  };
  const ParseWare: React.FC<{
    data: getWares_getWares[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data &&
          data.map((details: getWares_getWares) => {
            return (
              <GridWare
                key={details.id}
                path={path}
                id={details.id}
                pathEditBtn={`${path}/editware/${details.id}`}
                // typeware={details.wareType ? details.wareType.name : ""}
                en={details.enName ? details.enName : ""}
                name={details.name}
              />
            );
          })}
      </React.Fragment>
    );
  };

  const ResponseWaresTypes = useWareTypesQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareTypes },
    {},
    client
  ).Response;
  const ResponseWaresClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareClasses },
    {},
    client
  ).Response;
  const ResponseWaresGroups = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareGroups },
    {},
    client
  ).Response;
  const ResponseWaresModels = useWareModelsQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareModels },
    {},
    client
  ).Response;
  const ResponseWares = useWaresQuery(
    { error: CustomError, loading: Loader, parsing: ParseWare },
    {},
    client
  ).Response;
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader={
        path.includes("typeware")
          ? "لیست نوع کالا های سامانه"
          : path.includes("classware")
          ? "لیست کلاس های سامانه"
          : path.includes("groupware")
          ? "لیست گروه های سامانه"
          : path.includes("modelware")
          ? "لیست مدل های سامانه"
          : "لیست کالاهای سامانه"
      }
    >
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          {/* <SearchGoodsClient
            button={{
              text: "تعریف کالا",
              to: `/admin/listware/modaladdware`
            }}
            vertical={true}
          /> */}
          <SearchWare
            path={path}
            button={
              path.includes("typeware")
                ? { text: "افزودن نوع کالا", to: `${path}/modalware` }
                : path.includes("classware")
                ? { text: "افزودن کلاس کالا", to: `${path}/modalware` }
                : path.includes("modelware")
                ? { text: "افزودن مدل کالا", to: `${path}/modalware` }
                : path.includes("groupware")
                ? { text: "افزودن گروه کالا", to: `${path}/modalware` }
                : { text: "افزودن کالا", to: `${path}/modaladdware` }
            }
          />
        </div>
        <LineSeparator foundItem={foundItem} />
      </div>
      <div className="detailGoodsClient-DeliveryGoods grid-goods">
        {path.includes("typeware") && ResponseWaresTypes}
        {path.includes("classware") && ResponseWaresClasses}
        {path.includes("groupware") && ResponseWaresGroups}
        {path.includes("modelware") && ResponseWaresModels}
        {path.split("/")[2] === "ware" && ResponseWares}
      </div>
      <Route
        exact
        path={`${path}/modalware`}
        render={props => <ModalWare {...props} />}
      />
      <Route
        exact
        path={`${path}/modaleditware/:id`}
        render={props => <ModalEditWare {...props} />}
      />
      <Route
        exact
        path={`${path}/modaladdware/:id?`}
        render={props => <ModalAddWare {...props} />}
      />
      <Route
        exact
        path={`${path}/editware/:id`}
        render={props => <EditWare {...props} />}
      />
      <Route
        exact
        path={`${path}/modalisconfidence/:id?`}
        render={props => (
          <ModalIsConfidence
            nameButton="تایید"
            textCancel="انصراف"
            textHeader="هشدار"
            messageAccept="آیا از حذف این فیلد مطمن هستید"
            messageNotification="در صورت کیلیک روی گزینه تایید فیلد مورد نظر حذف می شود در غیر اینصورت روی گزینه انصراف کیلیک کنید"
            {...props}
          />
        )}
      />
    </ContainerClient>
  );
};
