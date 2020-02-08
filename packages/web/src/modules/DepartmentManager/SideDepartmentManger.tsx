import React from "react";
import { Avatar } from "../componentShare/avatar/Avatar";
interface Props {
  imageURL: string;
}

export const SideDepartmentManger: React.FC<Props> = props => {
  return (
    <div className="side-client">
      <div className="listsAndProfileDetail-side-client">
        <Avatar
          imageURL={props.imageURL}
          fullName="مرتضی حسینی"
          level="واحد خون/آزمایشگاه بیمارستان شهید بهشتی"
        />

        <div>
          <ul className="field-side-client">
            <li>خانه</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">درخواست ها</li>
            <li>
              <span className="icon-house"></span>بررسی درخواست ها
            </li>
            <li>تاریخجه پرداخت ها</li>
            <li>ثبت درخواست جدید</li>
            <li>آمار و گزارشات</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">کارمندان</li>
            <li>مدیریت کارمندان</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">ارتباطات سامانه</li>
            <li>کالاهای قابل درخواست</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">ارتباطات سامانه</li>
            <li>
              <span>##</span>پیام های کاربران
            </li>
            <li>اطلاعیه های سامانه</li>
            <li>راهنمای استفاده از سامانه</li>
          </ul>
        </div>
      </div>
      <div className="footer-side-client">
        <p className="textUp-footer-side-client">
          برای استفاده از سایت نیاز به کمک دارید؟
        </p>
        <p className="textDown-footer-side-client">
          ارسال پیام به راهنمای سایت
        </p>
      </div>
    </div>
  );
};
