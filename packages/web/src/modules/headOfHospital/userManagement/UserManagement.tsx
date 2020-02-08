import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { SearchBar } from "../../componentShare/searchBar/SearchBar";

export const UserManagement: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="مدیریت کاربران">
      <div className="user-management-cnt">
        <div className="search-bar">
          <SearchBar
            type="default"
            buttonLinkTitle="افزودن کاربر جدید"
            placeHolder="در بین نام کاربر، شماره تماس، نام بیمارستان، شهر، نقش و ... جستجو کنید"
            linkTo="/headofhospital/addUnit"
          />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        <div className="section">
          {/* <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          />
          <User
            name="محمد رضا"
            familyName="محمدی"
            phone="۰۹۳۳۶۴۷۹۳۷۴"
            unitedState="واحد آزمایشگاه"
            hospital="بیمارستان و مرکز آموزشی شهید بهشتی همدان"
          /> */}
        </div>
      </div>
    </ContainerClient>
  );
};
