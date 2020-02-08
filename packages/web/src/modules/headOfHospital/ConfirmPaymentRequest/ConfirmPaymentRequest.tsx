import React from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "../../componentShare/button/Button";
import { DetailGoodsAndApplicant } from "../../componentShare/checkRequestGoods/DetailGoodsAndApplicant";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

interface Props extends RouteComponentProps {}

export const ConfirmPaymentRequest: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  return (
    <ContainerClient colorHeader="blue" textHeader="درخواست‌های ثبت نام">
      <div className="detail-checkRequestGoods-depManger">
        <DetailGoodsAndApplicant confirmPayment={true} historyCost={true} />
      </div>
      <div className="filter-checkRequestGoods-depManger">
        {/* <FilterCheckRequest path={path} history type="justShowDetail" /> */}
      </div>
      <div className="informationSeller-checkRequestGoods-headHospital">
        {/* <SellerInformationPayment /> */}
      </div>
      {/* <div className="opinion-checkRequestGoods-depManger">
        <Container
          padding="0 0 0 0"
          height="100%"
          title="نظر کارشناس امور مالی"
        >
          <textarea className="textareaOpinion-checkRequestGoods-headHospital"></textarea>
        </Container>
      </div> */}
      <div className="boxButton-checkRequestGoods-headHospital">
        <div className="containerButton-checkRequestGoods-headHospital">
          <Button
            margin="0 0 0 0.7rem"
            type="accept"
            width="40%"
            text="تایید درخواست"
          />
          <Button
            type="cancel"
            margin="0 0.7rem 0 0"
            width="40%"
            text="رد درخواست"
          />
        </div>
      </div>
    </ContainerClient>
  );
};
