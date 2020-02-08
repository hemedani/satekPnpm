import React from "react";
import { FilterCheckRequest } from "../../componentShare/checkRequestGoods/FilterCheckRequest";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const CheckRequestGoods = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="درخواست‌های ثبت نام">
      <div className="detail-checkRequestGoods-depManger">
        {/* <DetailGoodsAndApplicant historyCost={true} /> */}
      </div>
      <div className="filter-checkRequestGoods-depManger">
        <FilterCheckRequest type="allFilter" />
      </div>
      <div className="listStores-checkRequestGoods-depManger">
        <Container
          width="100%"
          height="95%"
          childStyle={{ height: "95%" }}
          title="لیست فروشندگان و جزییات فروش"
        >
          <div className="DetailStore-checkRequestGoods-depManger">
            {/* <DetailStore />
            <DetailStore />
            <DetailStore /> */}
          </div>
        </Container>
      </div>
    </ContainerClient>
  );
};
