import React from "react";
import { Button } from "../../componentShare/button/Button";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { Selector } from "../../componentShare/selectors/Selector";
import { ItemAccountingReports } from "../../seller/accountingReports/component/ItemAccountingReports";

export const Statistics: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="آمار و گزارش ها">
      <div className="statistics">
        <Container childStyle={{ alignItems: "center" }} width="85%">
          <div className="container-search-statistics">
            <div className="row-search-statistics">
              <Selector
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 0.5rem",
                  width: "100%",
                  margin: "0.7rem 0"
                }}
                labelStyle={{ paddingLeft: "0.5rem" }}
                label="جستجوی کالا"
                options={[]}
                placeholder=""
                name="datefrom"
              />
            </div>
            <div className="row-search-statistics">
              <div className="row-part-search-statistics">
                <Selector
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%"
                  }}
                  labelStyle={{ paddingLeft: "0.5rem", width: "3rem" }}
                  label="از تاریخ"
                  options={[]}
                  placeholder=""
                  name="datefrom"
                />
              </div>
              <div className="row-part-search-statistics">
                <Selector
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%"
                  }}
                  labelStyle={{ paddingLeft: "0.5rem", width: "3rem" }}
                  label="تا تاریخ"
                  options={[]}
                  placeholder=""
                  name="dateUntil"
                />
              </div>
            </div>
            <div className="row-search-statistics">
              <div className="row-part-search-statistics">
                <Selector
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%"
                  }}
                  labelStyle={{ paddingLeft: "0.5rem", width: "3rem" }}
                  label="استان"
                  options={[]}
                  placeholder=""
                  name="state"
                />
              </div>
              <div className="row-part-search-statistics">
                <Selector
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%"
                  }}
                  labelStyle={{ paddingLeft: "0.5rem", width: "3rem" }}
                  label="شهرستان"
                  options={[]}
                  placeholder=""
                  name="city"
                />
              </div>
            </div>
            <div className="row-button-search-statistics">
              <Button
                padding="0.5rem 1rem"
                type="main"
                fontSize="0.8rem"
                text="مشاهده گزارش میزان فروش"
              />
              <Button
                padding="0.5rem 1rem"
                fontSize="0.8rem"
                type="main"
                text="مشاهده گزارش میزان موجودی"
              />
            </div>
          </div>
        </Container>
        <div className="report-statistics">
          <ItemAccountingReports number={256} money={false} text="تعداد فروش" />
          <ItemAccountingReports
            number={256}
            money={false}
            text="مبلغ کل فروش"
          />
        </div>
        <div className="box-button-report-statistics">
          ‌
          <Button
            padding="0.3rem 0.5rem"
            text="دانلود لیست کامل جزییات گزارش"
            type="okay"
          />
        </div>
      </div>
    </ContainerClient>
  );
};
