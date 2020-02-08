import React from "react";

export const WaitingConfirmation = () => {
  return (
    <div className="WaitingConfirmation-client">
      <div className="nameGoods-WaitingConfirmation-client">
        <p className="title-WaitingConfirmation-client">نام کالا</p>
        <p className="text-nameGoods-WaitingConfirmation-client">
          سرنگ 10 سی سی سوپا
        </p>
        <p className="number-nameGoods-WaitingConfirmation-client">
          (12345678912)
        </p>
      </div>
      <div className="number-WaitingConfirmation-client">
        <p className="title-WaitingConfirmation-client">تعداد/مقدار</p>
        <p className="text-number-WaitingConfirmation-client">4بسته</p>
      </div>
      <div className="history-WaitingConfirmation-client">
        <p className="title-WaitingConfirmation-client">تاریخ نیاز</p>
        <p className="text-history-WaitingConfirmation-client">1398/05/12</p>
      </div>
      <div className="editDelete-WaitingConfirmation-client">
        <span>$</span>
        <p className="text-edit-WaitingConfirmation-client">ویرایش</p>
      </div>
      <div className="editDelete-WaitingConfirmation-client">
        <span>$</span>
        <p className="text-delete-WaitingConfirmation-client">پاک کردن</p>
      </div>
    </div>
  );
};
