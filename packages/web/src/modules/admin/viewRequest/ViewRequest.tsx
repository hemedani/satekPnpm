import { useMeQuery, useOrdersQuery } from "@satek/hooks";
import {
  CheckByStockclerkStatusInput,
  CheckBySupplierStatusInput,
  CommentByFinanceStatusInput,
  ExpertCommentStatusInput,
  getOrders_getOrders_items,
  OrderStatus,
  OrderSort
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps, useParams } from "react-router";
import { client } from "../../../Apollo";
import PathToStatus from "../../../PathToStatus";
import { ModalDelivery } from "../../client/modelbox/ModalDelivery";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBoxSubmit } from "../../componentShare/modalBox/modalboxSubmit/ModalBoxSubmit";
import { ProductRequestHistory } from "../../componentShare/searchProductRequestHistory/SearchProductRequestHistory";
import { SituationGoodsClient } from "../../componentShare/situationGoodsClient/SituationGoodsClient";
import { ModalViewRequest } from "../../seller/modalBox/modalViewRequest/ModalViewRequest";
import { SearchNewRequest } from "../../seller/newRequests/component/SearchNewRequest";
import { ModalDetailsRequest } from "../modalBox/modalDetailsRequest/ModalDetailsRequest";
import { ConvertDateToMiladi } from "../../function/ConvertDate";
import { SortOrder } from "../../function/SortOrder";
import { IsFastDelivery } from "../../function/IsFastDelivery";
// import { ModalBoxInquiry } from "../../componentShare/modalBox/modalboxInquiry/ModalBoxInquiry";

interface Props extends RouteComponentProps {}

export const ViewRequest: React.FC<Props> = ({ match: { path }, history }) => {
  const { idfilter } = useParams();
  const [modalData, setModalData] = useState<getOrders_getOrders_items>();
  const [nameWare, setNameWare] = useState<string>("");
  const [situation, setSituation] = useState<OrderStatus>();
  const [unit, setUnit] = useState(idfilter ? idfilter : "");
  const [codeTracking, setCodeTracking] = useState<string>("");
  const [codeWare, setCodeWare] = useState<string>();
  const [historySubmit, setHistorySubmit] = useState({
    from: null,
    to: null
  });
  const [foundItem, setFoundItem] = useState("");
  const [selectFastDelivery, setSelectFastDelivery] = useState(0);

  const [selectSort, setSelectSort] = useState<number>(0);
  const [selectFilter, setSelectFilter] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [lengthTake, setLengthTake] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const ParseAllOrders: React.FC<{ data: getOrders_getOrders_items[] }> = ({
    data
  }) => {
    const [orderId, setOrderId] = useState();
    // console.log(data, "<===data received admin new", path);
    setFoundItem(String(data.length));

    return (
      <React.Fragment>
        {data &&
          data !== [] &&
          data.map(order => (
            <SituationGoodsClient
              name="request"
              history={history}
              lastSituation="checking detector"
              colorButton="blue"
              setOrderId={setOrderId}
              typeButton="Tracking"
              buttonName="جزییات درخواست"
              data={order}
              path={path}
              key={order.id}
              detail={
                path.includes("client")
                  ? null
                  : path.includes("departmentmanager/viewrequest")
                  ? [
                      order.requestorUser!.name +
                        " - " +
                        order.organization!.name,
                      ""
                    ]
                  : path.includes("headofhospital/viewrequest")
                  ? [order.requestorUser!.name + " - " + order.unit!.name, ""]
                  : [
                      "",
                      ""
                      // "طب پردازان غرب(09183152645)",
                      // "امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"
                    ]
              }
            />
          ))}
        <Route
          exact
          path={`${path}/acceptorghead/:id`}
          render={props => (
            <ModalBoxSubmit
              nameButton="ثبت نهایی درخواست"
              messageAccept="از ثبت درخواست خود مطمئن هستید؟"
              selectFastDelivery={selectFastDelivery}
              selectSort={selectSort}
              unit={unit}
              messageNotification=""
              textHeader="ثبت تایید درخواست"
              textCancel="بازگشت"
              {...props}
              path={`${path}/acceptorghead/${orderId}`}
            />
          )}
        />
        <Route
          exact
          path={`${path}/rejectorghead/:id`}
          render={props => (
            <ModalBoxSubmit
              nameButton="تایید نهایی"
              cancel={true}
              textHeader="ثبت رد درخواست"
              selectFastDelivery={selectFastDelivery}
              unit={unit}
              selectSort={selectSort}
              messageAccept="از رد درخواست خود مطمئن هستید؟"
              messageNotification=""
              textCancel="بازگشت"
              path={`${path}/rejectorghead`}
              {...props}
            />
          )}
        />
      </React.Fragment>
    );
  };

  // const ParseOrders: React.FC<{
  //   data: getUnitOrders_getUnit_orders[] | null;
  // }> = ({ data }) => {
  //   console.log(data, "<===data received unit & organ");

  //   return (
  //     <React.Fragment>
  //       {data!.map(order => (
  //         <SituationGoodsClient
  //           lastSituation="checking detector"
  //           colorButton="blue"
  //           typeButton="Tracking"
  //           buttonName="جزییات درخواست"
  //           data={order}
  //           key={order.id}
  //           path={path}
  //           detail={[
  //             "طب پردازان غرب(09183152645)",
  //             "امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"
  //           ]}
  //         />
  //       ))}
  //     </React.Fragment>
  //   );
  // };

  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;

  const role =
    meSiteId &&
    meSiteId.me &&
    meSiteId.me.userToSites &&
    meSiteId.me.userToSites[0].role;
  const { Response, fetchMore } = useOrdersQuery(
    { error: CustomError, loading: Loader, parsing: ParseAllOrders },
    {
      wareDocument: nameWare ? nameWare : "",
      trackingcode: codeTracking ? codeTracking : "",
      irc: codeWare ? codeWare : "",
      organizationId:
        (path.includes("hospital") || path.includes("expert")) &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) =>
                t.role === "OrganizationHead" ||
                t.role.includes("FinanceHead") ||
                t.role.includes("Stockclerk") ||
                t.role.includes("Supplier") ||
                t.role.includes("Expert")
            )[0].site!.id
          : "",
      sort: path.includes("/headofhospital/viewrequest")
        ? SortOrder(selectSort)
        : null,
      commentByExpertStatusInput:
        role && role.includes("Expert")
          ? path.includes("historyrequest")
            ? ExpertCommentStatusInput.bothSentAndResponded
            : ExpertCommentStatusInput.sentNoResponse
          : null,
      commentByFinanceStatusInput:
        role && role.includes("FinanceHead")
          ? path.includes("historyrequest")
            ? CommentByFinanceStatusInput.bothSentAndResponded
            : CommentByFinanceStatusInput.sentNoResponse
          : null,
      checkBySupplierStatusInput:
        role && role.includes("Supplier")
          ? path.includes("historyrequest")
            ? CheckBySupplierStatusInput.bothRespondedAndNoResponse
            : CheckBySupplierStatusInput.NoResponse
          : null,
      checkByStockclerkStatusInput:
        role && role.includes("Stockclerk")
          ? path.includes("historyrequest")
            ? CheckByStockclerkStatusInput.bothRespondedAndNoResponse
            : CheckByStockclerkStatusInput.NoResponse
          : null,
      unitId: path.includes("manager")
        ? meSiteId &&
          meSiteId.me &&
          meSiteId.me.userToSites &&
          meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) => t.role === "UnitHead"
          )[0].site!.id
        : path.includes("client") &&
          meSiteId &&
          meSiteId.me &&
          meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) => t.role === "UnitEmployee"
          )[0].site!.id
        : unit !== ""
        ? unit
        : "",
      storeId:
        path.includes("seller") &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "StoreHead"
            )[0].site!.id
          : "",

      fastDelivery: path.includes("/headofhospital/viewrequest")
        ? IsFastDelivery(selectFastDelivery)
        : null,
      statuses: situation
        ? [situation!]
        : PathToStatus(path)
        ? PathToStatus(path)
        : null,
      startDate: ConvertDateToMiladi(historySubmit.from),
      endDate: ConvertDateToMiladi(historySubmit.to)
    },
    client
  );
  console.log(
    path.includes("/headofhospital/viewrequest")
      ? IsFastDelivery(selectFastDelivery)
      : null,
    "janman"
  );
  function handleScroll(event: any) {
    if (
      event.target.scrollHeight - event.target.clientHeight ===
        event.target.scrollTop &&
      event.target.scrollTop !== 0
    ) {
      // if (!lengthTake) {
      //   event.target.scrollTop = event.target.scrollTop - 600;
      //   setPage(page + 1);
      //   const ehsa = fetchMore({
      //     variables: {
      //       page: page + 1
      //     },
      //     updateQuery: (prev: any, { fetchMoreResult, rest }: any) => {
      //       if (!fetchMoreResult) return prev;
      //       console.log("object ehsna", {
      //         ...prev.getOrders,
      //         fetchMoreResult,
      //         // Add the new matches data to the end of the old matches data.
      //         items: [
      //           ...prev.getOrders.items,
      //           ...fetchMoreResult.getOrders.items
      //         ]
      //       });
      //       if (fetchMoreResult.getOrders.items.length < 25) {
      //         setLengthTake(true);
      //       }
      //       return {
      //         getOrders: {
      //           items: [
      //             ...prev.getOrders.items,
      //             ...fetchMoreResult.getOrders.items
      //           ],
      //           __typename: "OrdersResponse"
      //         }
      //       };
      //     }
      //   });
      //   console.log(ehsa, "qwertyuiop[]");
      // }
    }
    // console.log(
    //   event.target.scrollHeight - event.target.clientHeight <
    //     event.target.scrollTop + 100,
    //   event.target.scrollHeight,
    //   event.target.scrollTop + 100,
    //   event.target.clientHeight
    // );
  }
  // console.log(
  //   meSiteId && meSiteId.me && meSiteId.me.userToSites
  //     ? meSiteId!.me!.userToSites!.filter(
  //         (t: { role: string }) => t.role === "OrganizationHead"
  //       )[0].site!.id
  //     : "",
  //   "<====role",
  //   "path====>",
  //   path
  // );
  // const OrganizationOrders = useOrganizationOrdersQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseOrders },
  //   {
  //     id:
  //       path.includes("hospital") &&
  //       meSiteId &&
  //       meSiteId.me &&
  //       meSiteId.me.userToSites
  //         ? meSiteId!.me!.userToSites!.filter(
  //             (t: { role: string }) => t.role === "OrganizationHead"
  //           )[0].site!.id
  //         : ""
  //   },
  //   client
  // ).Response;

  // const UnitOrders = useUnitOrdersQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseOrders },
  //   {
  //     id:
  //       path.includes("manager") &&
  //       meSiteId &&
  //       meSiteId.me &&
  //       meSiteId.me.userToSites
  //         ? meSiteId!.me!.userToSites!.filter(
  //             (t: { role: string }) => t.role === "UnitHead"
  //           )[0].site!.id
  //         : ""
  //   },
  //   client
  // ).Response;
  useEffect(() => {
    document.title = ``;
  });
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader={
        path.includes("viewrequest")
          ? "بررسی درخواست ها"
          : path.includes("historyrequest")
          ? "تاریخچه درخواست های شما"
          : ""
      }
    >
      {!path.includes("departmentmanager/viewrequest") &&
        !path.includes("headofhospital/historyrequest") &&
        !path.includes("seller/newrequests") &&
        !path.includes("/headofhospital/viewrequest") &&
        !path.includes("client/deliverygoods") && (
          <div className="top-ViewRequest-admin">
            <div className="Search-ViewRequest-admin">
              <ProductRequestHistory
                type="admin"
                codeTracking={setCodeTracking}
                nameWare={setNameWare}
                codeWare={setCodeWare}
                setHistorySubmit={setHistorySubmit}
                historySubmit={historySubmit}
                situation={setSituation}
                searchWithCode={
                  !path.includes("departmentmanager/historyrequest")
                }
              />
            </div>
            <LineSeparator foundItem={foundItem} />
          </div>
        )}
      {path.includes("client/deliverygoods") && (
        <div className="top-ViewRequest-admin">
          <div className="Search-ViewRequest-admin">
            <ProductRequestHistory
              type="client"
              codeTracking={setCodeTracking}
              nameWare={setNameWare}
              codeWare={setCodeWare}
              setHistorySubmit={setHistorySubmit}
              historySubmit={historySubmit}
              searchWithCode={!path.includes("client/deliverygoods")}
            />
          </div>
          <LineSeparator foundItem={foundItem} />
        </div>
      )}
      {path.includes("seller/newrequests") && (
        <div className="top-ViewRequest-admin">
          <div className="Search-ViewRequest-admin">
            <SearchNewRequest
              selectFilter={selectFilter}
              setSelectFilter={setSelectFilter}
            />
          </div>
          <LineSeparator foundItem={foundItem} />
        </div>
      )}
      {path.includes("/headofhospital/viewrequest") && (
        <div className="top-ViewRequest-admin">
          <div className="Search-ViewRequest-admin">
            <ProductRequestHistory
              type="viewHospital"
              codeTracking={setCodeTracking}
              nameWare={setNameWare}
              setSelectSort={setSelectSort}
              selectSort={selectSort}
              codeWare={setCodeWare}
              setHistorySubmit={setHistorySubmit}
              historySubmit={historySubmit}
              unit={setUnit}
              unitValue={unit}
              path={path}
              setSelectFastDelivery={setSelectFastDelivery}
              selectFastDelivery={selectFastDelivery}
              situation={setSituation}
              searchWithCode={false}
            />
          </div>
          <LineSeparator foundItem={foundItem} />
        </div>
      )}
      {path.includes("/headofhospital/historyrequest") && (
        <div className="top-ViewRequest-admin">
          <div className="Search-ViewRequest-admin">
            <ProductRequestHistory
              type="admin"
              history={true}
              codeTracking={setCodeTracking}
              nameWare={setNameWare}
              codeWare={setCodeWare}
              setHistorySubmit={setHistorySubmit}
              historySubmit={historySubmit}
              unit={setUnit}
              path={path}
              situation={setSituation}
              searchWithCode={!path.includes("/headofhospital/historyrequest")}
            />
          </div>
          <LineSeparator foundItem={foundItem} />
        </div>
      )}
      <div onScroll={handleScroll} className="detailGoodsClient-DeliveryGoods">
        {meSiteId && meSiteId.me && meSiteId.me.userToSites && Response}
      </div>
      <Route
        path={`${path}/modalviewrequest/:id`}
        render={props => <ModalViewRequest {...props} />}
      />
      <Route
        exact
        path={`${path}/detailrequest/:id`}
        render={(asb: any) => {
          return <ModalDetailsRequest {...asb} />;
        }}
      />
      <Route
        exact
        path={`${path}/modaldeliveryaccept/:id`}
        render={props => <ModalDelivery {...props} />}
      />
      <Route
        exact
        path={`${path}/modaldeliveryreject/:id`}
        render={props => <ModalDelivery {...props} />}
      />
    </ContainerClient>
  );
};
