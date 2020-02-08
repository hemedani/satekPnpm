import { useWareGroupWaresQuery } from "@satek/hooks";
import { getWareGroupWares_getWareGroup } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { OtherWares } from "../../checkRequestGoods/OtherWares";
import { CustomError } from "../../customError/CustomError";
import { Loader } from "../../loader/Loader";
import { ModalBox } from "../ModalBox";
interface Props extends RouteComponentProps {
  path?: string;
  orderId: string;
  wareGroupId?: string;
}
export const ModalBoxOtherWares: React.FC<Props> = ({
  history,

  path,
  orderId,
  wareGroupId
}) => {
  const WareGroupWares: React.FC<{
    data: getWareGroupWares_getWareGroup;
  }> = ({ data }) => {
    if (data.wares) {
      return (
        <React.Fragment>
          {data.wares.map(ware => (
            <OtherWares
              key={ware.id}
              name={ware && ware.name}
              wareId={ware.id}
              orderId={orderId}
            />
          ))}
        </React.Fragment>
      );
    }
    return null;
  };

  
  const { Response } = useWareGroupWaresQuery(
    { error: CustomError, loading: Loader, parsing: WareGroupWares },
    { id: wareGroupId ? wareGroupId : "" },
    client
  );

  return (
    <ModalBox history={history} headerName={"لیست برندهای دیگر"} display="flex">
      <div className="container-modalBoxOtherWares">
        {Response}{" "}
        {/* <Button
            text={nameButton}
            type="main"
            className="btn-ModalBoxSubmit"
            justifyContent="center"
            fontSize="0.9rem"
            padding="0.5rem 1rem"
            mainType="submit"
          />
          <p className="textCancel-ModalBoxSubmit">{textCancel}</p> */}
      </div>
    </ModalBox>
  );
};
