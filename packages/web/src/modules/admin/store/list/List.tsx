import { useStoresQuery } from "@satek/hooks";
import { getStores_getStores } from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { ContainerClient } from "../../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import { Store } from "../../../componentShare/rectangleItems/RectangleItems";
import { SearchBar } from "../../../componentShare/searchBar/SearchBar";
import { StateParser } from "../../user/components/parsers/StateParser";

interface Props extends RouteComponentProps {}

export const StoreList: React.FC<Props> = ({ match: { path } }) => {
  const [Filter, setFilter] = useState({
    document: "",
    cityId: "",
    stateId: ""
  });
  const [foundItem, setFoundItem] = useState("0");
  const [StateId, setStateId] = useState<string | null>();
  const [CityId, setCityId] = useState<string | null>();

  const ParseStores: React.FC<{ data: getStores_getStores[] }> = ({ data }) => {
    setFoundItem(String(data.length));
    return (
      <>
        {data.map((store: getStores_getStores) => (
          <Store
            path={path}
            key={store.id}
            storeName={store.name}
            name={store.ceoname}
            phone={String(
              store.storeDetails && store.storeDetails.mobileNumber
            )}
            province={store.state ? store.state.name : ""}
            city={store.city ? store.city.name : ""}
            id={store.id}
          />
        ))}
      </>
    );
  };

  
  const StoreResponse = useStoresQuery(
    { error: CustomError, loading: Loader, parsing: ParseStores },
    {
      document: Filter.document,
      cityId: Filter.cityId,
      stateId: StateId
    },
    client
  );

  useEffect(() => {}, [Filter]);

  return (
    <ContainerClient
      className="seller_list"
      colorHeader="blue"
      textHeader="ویرایش اطلاعات و مشاهده مدارک فروشندگان"
    >
      <SearchBar
        type="customize"
        className="search_bar"
        setFilter={setFilter}
        searchBarItems={[
          {
            name: "document",
            title: "جستجو",
            placeHolder: "جستجو نمائید",
            type: "input",
            className: "main_filter"
          },
          {
            name: "cityId",
            title: "شهر",
            placeHolder: "شهر مورد نظر را انتخاب کنید",
            type: "selector",
            options: [{ label: "همدان", value: "hamedan" }],
            className: "filter"
          }
        ]}
        placeHolder="در بین نام کاربر، شماره تماس، نام بیمارستان، شهر، نقش و ... جستجو کنید"
      >
        <StateParser
          type="search"
          useStateProps={{ StateId, setStateId }}
          className="filter"
        />
      </SearchBar>

      <LineSeparator foundItem={foundItem} />
      <div className="sellers">{StoreResponse.Response}</div>
    </ContainerClient>
  );
};
