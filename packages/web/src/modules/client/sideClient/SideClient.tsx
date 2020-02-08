import React from "react";
interface Props {
  imageURL: string;
}

export const SideClient: React.FC<Props> = props => {
  return (
    <div className="side-client">
      <div className="listsAndProfileDetail-side-client">
        <div className="boxImage-profile-side-client">
          <img
            className="image-profile-side-client"
            src={props.imageURL}
            alt="NotFound"
          />
        </div>
        <div className="box-text-profile-client">
          <div className="text-profile-client">
            <h4 className="namePersonal-profile-client">امیرحسین سیف</h4>
            <p className="post-text-profile-client">
              واحد خون/آزمایشگاه بیمارستان شهید بهشتی
            </p>
          </div>
        </div>
        <div>
          <ul className="field-side-client">
            <li>داشبورد</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">درخواست ها</li>
            <li>
              <span className="ic_hospital"></span>ثبت درخواست جدید
            </li>
            <li>تاریخچه درخواست ها</li>
            <li>تحویل گرفتن کالا</li>
          </ul>
          <ul className="field-side-client">
            <li className="header-field-side-client">کالاها</li>
            <li>کالاهای قابل درخواست</li>
            <li>کالاهای پراستفاده من</li>
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
