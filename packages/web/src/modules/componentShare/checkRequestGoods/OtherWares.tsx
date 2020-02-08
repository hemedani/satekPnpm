import React from "react";
import { Button } from "../button/Button";

interface Props {
  wareId?: string;
  name?: string;
  orderId: string;
}

export const OtherWares: React.FC<Props> = ({ wareId, name, orderId }) => {
  //   const { updateOrderMutate } = UseUpdateOrderMutate(
  //     ApolloVar(path, PathToStatus(path!), meSiteId),
  //     client
  //   );

  //   const { updateOrderStuffStatusMutate } = useUpdateOrderStuffStatusMutate(
  //     ApolloVar(path, PathToStatus(path!), meSiteId),
  //     client
  //   );

  // console.log(data, "detailStore...");
  return (
    <div className="componentotherwares">
      <p className="title-componentotherwares">{name}</p>
      {/* <a
        href={`/departmentmanager/checkrequestgoods/${orderId}/${wareId}`}
        className="newRequest-goods-DetailGoods-client"
      >
        {name}
      </a> */}

      <Button
        fontSize="0.7rem"
        padding={"0.5rem 1rem"}
        text={"انتخاب کالا"}
        mainType="button"
        type="main"
        to={`/departmentmanager/checkrequestgoods/${orderId}/something/${wareId}`}
      />
    </div>
  );
};
