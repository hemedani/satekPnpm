import React from "react";
interface Props {
  nameDetail: string;
}
export const DetailNameAllowedGoods: React.FC<Props> = props => {
  return (
    <div className="boxDetail-admin">
      <p className="nameDetail-admin">{props.nameDetail}</p>
      <p className="deleteDetail-admin">
        <span>!</span>حذف
      </p>
    </div>
  );
};
