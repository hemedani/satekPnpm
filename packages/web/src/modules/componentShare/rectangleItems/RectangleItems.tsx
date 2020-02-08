import classNames from "classnames";
import React from "react";
import { RandomNumber } from "../../function/RandomNumber";
import { Button } from "../button/Button";
import { CategoryProps, GoodProps, HospitalProps, StoreProps, UnitProps, UniversityProps, UserProps } from "./RectangleItemsTypes";

export const University: React.FC<UniversityProps> = ({
  image,
  university,
  province,
  id
}) => {
  return (
    <div className="rectangle_item_cnt">
      <div className="section_with_image">
        <img
          src={require("../../../image/admin/imageLogo/" +
            RandomNumber(3) +
            ".jpg")}
          className="img"
          alt=""
        />
        <div className="details">
          <div className="header_one">{university}</div>
          <div className="header_two">{province}</div>
        </div>
      </div>
      <div className="btns">
        <Button
          className="btn"
          icon="ic_edit"
          to={`/admin/university/updateuniversity/${id}`}
          type="main"
          text="ویرایش"
        />
      </div>
    </div>
  );
};

export const Hospital: React.FC<HospitalProps> = ({
  university,
  image,
  province,
  hospital,
  id
}) => {
  return (
    <div className="rectangle_item_cnt">
      <div className="section_with_image">
        <img className="img" src={image} alt="" />
        <div className="details">
          <div className="header_one">{hospital}</div>
          <div className="header_two">
            <div className={classNames("icon", "ic_hospital")} />
            {university}
            <div className="left">{province}</div>
          </div>
        </div>
      </div>
      <div className="btns">
        <Button
          className="btn"
          icon="ic_edit"
          type="main"
          text="ویرایش"
          to={`/admin/hospital/updatehospital/${id}`}
        />
      </div>
    </div>
  );
};

export const Category: React.FC<CategoryProps> = ({
  path,
  category,
  hospital,
  university,
  province,
  city,
  id
}) => {
  return (
    <div className="rectangle_item_cnt">
      <div className="section_with_image">
        <div className="details">
          <div className="header_one">{category}</div>
          <div className="header_two">
            <div className="icon" />
            {hospital}
          </div>
          <div className="header_three">
            <div className="icon" />
            {university}
            <div>{province}</div>
          </div>
        </div>
      </div>
      <div className="btns">
        <Button
          className="btn"
          icon="ic_edit"
          type="main"
          text="ویرایش"
          to={`${path}/updatecategory/${id}`}
        ></Button>
      </div>
    </div>
  );
};

export const Unit: React.FC<UnitProps> = ({
  university,
  image,
  province,
  hospital,
  unit,
  id,
  path
}) => {
  return (
    <div className="rectangle_item_cnt">
      <div className="section_with_image">
        <img className="img" src={image} alt="" />
        <div className="details">
          <div className="header_one">{unit}</div>
          <div className="header_two">
            <div className="icon" />
            {hospital}
          </div>
          <div className="header_three">
            <div className="icon" />
            {university}
            <div>{province}</div>
          </div>
        </div>
      </div>
      <div className="btns">
        <Button
          className="btn"
          type="main"
          text="زیرگروه کالایی"
          to={`${path}/${id}/waregroup`}
        ></Button>
        <Button
          className="btn"
          icon="ic_edit"
          type="main"
          text="ویرایش"
          to={`${path}/updateunit/${id}`}
        ></Button>
      </div>
    </div>
  );
};

export const Store: React.FC<StoreProps> = ({
  name,
  storeName,
  phone,
  province,
  city,
  id,
  path
}) => {
  return (
    <div className="rectangle_item_cnt">
      <div className="section_with_image">
        <img src="" className="img" alt="" />
        <div className="details">
          <div className="header_one">{storeName}</div>
          <div className="header_two">
            {name}({phone})
          </div>
          <div className="header_three">
            <div>شهر {city}</div>
            <div>استان {province}</div>
          </div>
        </div>
      </div>
      <div className="btns">
        <Button
          className="btn"
          icon="ic_edit"
          to={`${path}/updatestore/${id}`}
          type="main"
          text="ویرایش"
        />
        <Button className="btn" to="" type="cancel" text="تعلیق" />
      </div>
    </div>
  );
};

export const Good: React.FC<GoodProps> = props => {
  return (
    <div className="rectangle_item_cnt good">
      <div className="details">
        <div className="header_one">{props.nameFa}</div>
        <div className="header_two">{props.nameEn}</div>
        <div className="header_three">
          <div className="icon" />
          {props.type}
          <div className="icon" />
          {props.company}
        </div>
      </div>
      <div className="btns">
        <div className="cost_box">
          <div className="pre_cost">سقف قیمت</div>
          <div className="cost">
            {props.maximumCost &&
              props.maximumCost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="past_cost">تومان</div>
        </div>
        <Button
          className="btn"
          type="main"
          text="ویرایش"
          to={`/admin/listware/modaladdware/${props.id}`}
        />
      </div>
    </div>
  );
};

export const User: React.FC<UserProps> = ({
  image,
  name,
  familyName,
  phone,
  hospital,
  unitedState,
  path,
  id
}) => {
  return (
    <div className="rectangle_item_cnt user">
      <div className="section_with_image">
        <img className="img" src={image} alt="" />
        <div className="details">
          <div className="header_one">
            {name} {familyName}
            <div className="ic_calender"></div>
          </div>
          <div className="header_two">{unitedState ? unitedState : ""}</div>
          <div className="header_three">{hospital}</div>
        </div>
      </div>

      <div className="btns">
        <div className="phone">
          <span className="text">شماره تماس</span>
          <span className="number">{phone}</span>
        </div>
        <Button
          className="btn"
          type="main"
          text="محل خدمت"
          to={`${path}/${id}/ware`}
        ></Button>
        <Button
          className="btn"
          type="main"
          text="ویرایش"
          to={`${path}/updateuser/${id}`}
        ></Button>
      </div>
    </div>
  );
};
