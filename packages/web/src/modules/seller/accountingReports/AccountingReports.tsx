import { useMeQuery, useStoreStatisticsQuery } from "@satek/hooks";
import { getStoreStatistics_getStore } from "@satek/resolvers";
import React from "react";
import { client } from "../../../Apollo";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import { ItemAccountingReports } from "./component/ItemAccountingReports";

export const AccountingReports: React.FC = () => {
  const Parse: React.FC<{ data: getStoreStatistics_getStore }> = ({ data }) => {
    return (
      <>
        {" "}
        <div className="row-accountingReports-seller">
          <ItemAccountingReports
            number={data.totalSoldNum}
            money={false}
            text="تعداد محصولات فروخته شده"
          />
          <ItemAccountingReports
            number={data.totalSoldAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            money={true}
            text="مبلغ کل محصولات فروخته شده"
          />
        </div>
        <div className="row-accountingReports-seller">
          <ItemAccountingReports
            number={data.totalPaid
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            money={true}
            text="مجموع مبلغ واریز شده"
          />
          <ItemAccountingReports
            number={data.totalNotPaid
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            money={true}
            text="مجموع مبلغ تسویه نشده"
          />
        </div>
      </>
    );
  };
  
  const meId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { Response } = useStoreStatisticsQuery(
    { error: CustomError, loading: Loader, parsing: Parse },

    { id: meId ? meId.me!.userToSites![0].site!.id : "" },

    client
  );
  return (
    <ContainerClient colorHeader="blue" textHeader="حسابداری و گزارشات">
      <div className="top-Hospital-admin">
        <div className="Search-accountingReports-admin">
          {/* <SearchAccountingReports /> */}
        </div>
      </div>
      <div className="bottom-accountingReports-seller">
        <div className="container-accountingReports-seller">{Response}</div>
      </div>
    </ContainerClient>
  );
};
