import React from "react";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { ContainerComponent } from "../../componentShare/containerComponent/ContainerComponent";
export const ModalBoxViewSellerInformation = () => {
  return (
    <ModalBox
      modalBoxSize="medium"
      headerName="انتخاب محل خدمت برای کاربر"
      display="flex"
    >
      <div className="body-modalBox-ViewSellerInformation-admin">
        <div className="container-ViewSellerInformation-admin">
          <ContainerComponent title="اطلاعات مالی و مدارک">
            <div className="field-input-component-admin">
              <div className="field-input-right-component-admin">
                <div className="rowNameTitle-ViewSellerInformation-admin">
                  <p className="title-ViewSellerInformation-admin">
                    شماره کارت بانکی
                  </p>
                  <p className="name-ViewSellerInformation-admin">
                    ۲۱۴۳۴۲۳۴۲۳۴۲۳۴
                  </p>
                </div>
              </div>
              <div className="field-input-left-component-admin">
                <div className="rowNameTitle-ViewSellerInformation-admin">
                  <p className="title-ViewSellerInformation-admin">شماره شبا</p>
                  <p className="name-ViewSellerInformation-admin">
                    ۲۳۶۴۷۵۴۳۲۱۳۴۵۶۷
                  </p>
                </div>
              </div>
            </div>
            <div className="field-input-component-admin">
              <div className="field-input-right-component-admin">
                <div className="rowNameTitle-ViewSellerInformation-admin">
                  <p className="title-ViewSellerInformation-admin">
                    نام کامل صاحب حساب
                  </p>
                  <p className="name-ViewSellerInformation-admin">علی ایمانی</p>
                </div>
              </div>
              <div className="field-input-left-component-admin">
                <div className="rowNameTitle-ViewSellerInformation-admin">
                  <p className="title-ViewSellerInformation-admin">نام بانک</p>
                  <p className="name-ViewSellerInformation-admin">
                    بانک صادرات
                  </p>
                </div>
              </div>
            </div>
          </ContainerComponent>
          <ContainerComponent title="اطلاعات مالی و مدارک">
            <div className="field-input-component-admin">
              <div className="rowNameTitle-ViewSellerInformation-admin">
                <p className="title-ViewSellerInformation-admin">
                  تعهدات محدوده مکانی فروش
                </p>
                <p className="name-ViewSellerInformation-admin"></p>
              </div>
            </div>
            <div className="field-input-component-admin">
              <div className="rowNameTitle-ViewSellerInformation-admin">
                <p className="title-ViewSellerInformation-admin">
                  تعهدات زمانی تحویل تجمعی
                </p>
                <p className="name-ViewSellerInformation-admin"></p>
              </div>
            </div>
            <div className="field-input-component-admin">
              <div className="rowNameTitle-ViewSellerInformation-admin">
                <p className="title-ViewSellerInformation-admin">
                  امکان تامین درخواست فوری
                </p>
                <p className="name-ViewSellerInformation-admin"></p>
              </div>
            </div>
            <div className="field-input-component-admin">
              <div className="rowNameTitle-ViewSellerInformation-admin">
                <p className="title-ViewSellerInformation-admin">
                  بازه زمانی سرویس دهی
                </p>
                <p className="name-ViewSellerInformation-admin"></p>
              </div>
            </div>
          </ContainerComponent>
        </div>
      </div>
      <div className="boxButton-modalBox-ViewSellerInformation-admin">
        <div className="container-submit-modalBox-ViewSellerInformation-admin">
          <button className="button-modalBox-ViewSellerInformation-admin">
            تایید اطلاعات
          </button>
          <p className="textCancel-modalBox-selectLocationServiceUser-admin">
            انصراف
          </p>
        </div>
      </div>
    </ModalBox>
  );
};
