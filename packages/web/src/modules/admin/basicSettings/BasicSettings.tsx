import React from "react";
import { Route } from "react-router-dom";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { Selector } from "../../componentShare/selectors/Selector";
import { Textarea } from "../../componentShare/Textarea/Textarea";
import { CityList } from "./city/list/List";
import { BasicSettingModalBox } from "./components/modalBox/ModalBox";
import { StatesBox } from "./state/list/List";

export const BasicSettings = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تنظیمات اولیه">
      <div className="basic-setting-cnt">
        <div className="grade-top">
          <div className="top">
            <Container
              title="توضیحات سئو"
              className="right"
              childStyle={{ overflow: "hidden" }}
            >
              <Textarea
                style={{ flex: "1" }}
                titleStyle={{ marginBottom: ".5rem" }}
                isBordered="false"
              />
            </Container>
            <Container
              title="لوگو سایت"
              className="left"
              childStyle={{ padding: "0" }}
            >
              {/* <LogoSelector imageHeight="5rem" imageWidth="5rem" /> */}
            </Container>
          </div>
          <div className="bottom">
            <StatesBox className="right" />
            <CityList className="left" />
          </div>
        </div>
        <div className="grade-bottom">
          <Selector
            isMulti
            labelStyle={{ width: "9rem" }}
            className="selector"
            name="a"
            label="موارد پرداخت مدت دار"
            options={[]}
            placeholder="موارد مورد نظر خود را انتخاب نمائید"
          />
          <Selector
            isMulti
            labelStyle={{ width: "9rem" }}
            className="selector"
            name="b"
            label="محدوده‌های فروش"
            options={[]}
            placeholder="موارد مورد نظر خود را انتخاب نمائید"
          />
          <Selector
            isMulti
            labelStyle={{ width: "9rem" }}
            name="c"
            className="selector"
            label="شیفت‌های زمانی"
            options={[]}
            placeholder="موارد مورد نظر خود را انتخاب نمائید"
          />
        </div>
      </div>
      <Route
        exact
        path="/admin/basicsettings/addcity"
        component={BasicSettingModalBox}
      />
      <Route
        exact
        path="/admin/basicsettings/addstate"
        component={BasicSettingModalBox}
      />
    </ContainerClient>
  );
};
