import { getOrderForSeller_getOrder } from "@satek/resolvers";
import React from "react";

interface Props {
  data?: getOrderForSeller_getOrder;
}

export const DetailDestinationHospital: React.FC<Props> = ({ data }) => {
  return (
    <div className="detailDestinationHospital">
      <div className="part-detailDestinationHospital">
        <p className="title-detailGoodSeller margin-modaldetailGoodSeller">
          مقصد
        </p>
        <p className="text-detailDestinationHospital">
          {data && data.organization && data.organization.name} -{" "}
          {data && data.unit && data.unit.name}
        </p>
      </div>
      <div className="part-detailDestinationHospital">
        <p className="title-detailGoodSeller margin-modaldetailGoodSeller">
          {data && data.requestorUser && data.requestorUser.name}
        </p>
        <p className="text-detailDestinationHospital">
          {data && data.requestorUser && data.requestorUser.phoneNumber}
        </p>
      </div>
    </div>
  );
};
