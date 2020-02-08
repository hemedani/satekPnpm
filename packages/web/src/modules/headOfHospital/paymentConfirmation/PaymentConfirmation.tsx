import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";

export const PaymentConfirmation: React.FC = () => {
  // const ParseOrders: React.FC<{
  //   data: getOrganizationOrders_getOrganization;
  // }> = ({ data }) => {
  //   // console.log(data, "<====this is data here");
  //   if (data.orders) {
  //     return (
  //       <React.Fragment>
  //         {data.orders.map(order => (
  //           <SituationGoodsClient
  //             lastSituation="checking detector"
  //             colorButton="blue"
  //             typeButton="Paying"
  //             buttonName="جزییات درخواست"
  //             data={order}
  //             key={order.id}
  //             detail={[
  //               "طب پردازان غرب(09183152645)",
  //               "امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"
  //             ]}
  //           />
  //         ))}
  //       </React.Fragment>
  //     );
  //   }
  //   return null;
  // };

  // const { Response } = useOrganizationOrdersQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseOrders },
  //   { id: fOrganizationId },
  //   client
  // );

  return (
    <ContainerClient colorHeader="blue" textHeader="تایید پرداخت ها">
      <div className="detailGoodsClient-DeliveryGoods">{null}</div>
    </ContainerClient>
  );
};
