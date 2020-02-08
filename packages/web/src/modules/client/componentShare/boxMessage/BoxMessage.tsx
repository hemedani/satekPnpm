import cx from "classnames";
import React from "react";

interface Props {
  hasAnswer: boolean;
  color: string;
  hasImag?: string;
  sendBy?: string;
  answer?: boolean;
}
export const BoxMessage: React.FC<Props> = props => {
  return (
    <div
      style={{ marginRight: props.answer ? "8rem" : "" }}
      className="boxMessage-clientAdmin"
    >
      <div
        className={cx(
          "head-boxMessage-clientAdmin",
          `head-boxMessage-${props.color}-clientAdmin`
        )}
      >
        <div className="detailSpecifications-head-boxMessage-clientAdmin">
          <p className="text-head-boxMessage-clientAdmin">رضا ایمانی</p>
          <p className="text-head-boxMessage-clientAdmin">/</p>
          <p className="textPost-head-boxMessage-clientAdmin">
            مقام تشخیص بیمارستان شهید بهشتی
          </p>
          <p className="dot-head-boxMessage-clientAdmin">.</p>
          <p className="textNumberRequest-head-boxMessage-clientAdmin">
            213431
          </p>
        </div>
        <div className="detailTime-head-boxMessage-clientAdmin">
          <p className="textTimeDate-head-boxMessage-clientAdmin">12:30</p>
          <p className="textTimeDate-head-boxMessage-clientAdmin">1397/11/12</p>
        </div>
      </div>
      <div
        className={
          props.hasImag !== undefined
            ? "withImage-body-boxMessage-clientAdmin"
            : "withoutImage-body-boxMessage-clientAdmin"
        }
      >
        {props.sendBy && (
          <div className="fieldEdit-boxMessage-clientAdmin">
            <div className="sendBy-boxMessage-clientAdmin">
              <p className="title-boxMessage-clientAdmin">ارسال شده توسط: </p>
              <p className="nameSendBy-boxMessage-clientAdmin">
                {props.sendBy}(ادمین وبسایت)
              </p>
            </div>
            <div className="editDelete-boxMessage-clientAdmin">
              <p className="edit-boxMessage-clientAdmin">
                <span>!</span> ویرایش
              </p>
              <p className="delete-boxMessage-clientAdmin">
                <span>X</span> حذف
              </p>
            </div>
          </div>
        )}
        <div className="message-body-boxMessage-clientAdmin">
          {props.hasImag !== undefined ? (
            <div className="box-image-message-body-boxMessage-clientAdmin">
              <img
                className="image-message-body-boxMessage-clientAdmin"
                alt="NotFound"
                src={props.hasImag}
              />
            </div>
          ) : null}
          <p
            className={
              props.hasImag !== undefined
                ? "withImage-textMessage-body-boxMessage-clientAdmin"
                : "withoutImage-textMessage-body-boxMessage-clientAdmin"
            }
          >
            با سلام به دلیل موجه نبودن دلیل برای درخواست کالای گرفتن با درخواست
            شما موفقیت نشدابتدا محقق باید جهت بندی مناسب و کاملا دقیق در مورد
            تهیه کیت مورد نظر خود داشته باشد. نحوه انتخاب کیت به این صورت است که
            محقق ابتدا باید تمامی اطلاعات لازم را در حیطه کاری خودش به دست
            بیاورد. او باید بداند که برای هر مرحله و هر پله از کار خود دقیقا چه
            نوع کیتی می خواهد.
          </p>
        </div>
        {props.hasAnswer && (
          <div className="details-body-boxMessage-clientAdmin">
            <div className="applying-body-boxMessage-clientAdmin">
              <p className="aboutApplying-body-boxMessage-clientAdmin">
                درباره ی درخواست sdasdcv
              </p>
              <p className="seeApplying-body-boxMessage-clientAdmin">
                مشاهده درخواست
              </p>
            </div>
            <div className="boxAnswer-body-boxMessage-clientAdmin">
              <p className="answer-body-boxMessage-clientAdmin">پاسخ دادن</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
