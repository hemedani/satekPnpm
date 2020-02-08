import React from "react";
import { Button } from "../../componentShare/button/Button";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { Selector } from "../../componentShare/selectors/Selector";

export const AddOffer: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تخفیف">
      <div className="addoffer">
        <div className="body-addoffer">
          <Container
            width="95%"
            title="جزییات اعمال تخفیف تاریخ انقضای نزدیک برای همه کالاها"
          >
            <div className="field-inputs-item-addoffer">
              <div className="expiration-date-addoffer">
                <p className="title-addoffer">زمان مانده از انقضا</p>
                <Selector
                  style={{ margin: "0 1rem 0 0", width: "100%" }}
                  options={[]}
                  placeholder=""
                  name="subgroup"
                />
              </div>
              <div className="value-addoffer">
                <p className="title-addoffer">میزان تخفیف</p>
                <input className="input-addoffer" />
                <p className="title-small-addoffer">درصد</p>
              </div>
            </div>
            <div className="field-notification-item-addoffer">
              <span className="ic_info_circle icon-notification-addoffer"></span>
              <p>
                میزان درصد تخفیف برای کالاهای با تاریخ انقضای نزدیک را در این
                بخش تعیین کنید. این نوع تخفیف برای همه کالاها در زمان مانده ی
                مشخص شده اعمال خواهد شد
              </p>
            </div>
          </Container>
        </div>
        <div className="bottom-addoffer">
          <Button
            padding="0.5rem 1rem"
            justifyContent="center"
            width="7rem"
            text="تایید"
            type="main"
          />
          <Button text="انصراف" width="7rem" margin="0 1rem" type="cancel" />
        </div>
      </div>
    </ContainerClient>
  );
};
