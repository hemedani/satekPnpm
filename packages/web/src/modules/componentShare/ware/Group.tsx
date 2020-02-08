import React from "react";
import { Button } from "../button/Button";
interface Props {
  image?: string;
  name: string;
  typeware?: string;
  en: string;
  path: string;
  id?: string;
  classId?: string;
  pathEditBtn?: string;
}

export const GridWare: React.FC<Props> = ({
  image,
  name,
  typeware,
  en,
  path,
  id,
  pathEditBtn,
  classId
}) => {
  return (
    <div className="gridware-admin">
      <div className="detail-gridware-admin">
        <div className="row-detail-gridware-admin">
          <p className="name-detail-gridware-admin">{name}</p>
          <p className="sub-name-detail-gridware-admin">{en}</p>
        </div>
        <div className="row-detail-gridware-admin">
          <p className="tag-name-detail-gridware-admin">{typeware}</p>
        </div>
      </div>
      {console.log(`${path}/modaleditware/${id}`)}
      <div className="btn-gridware-admin">
        <Button
          icon="ic_edit"
          type="main"
          width="5.5rem"
          text="ویرایش"
          fontSize=".7rem"
          margin="0.3rem 0"
          padding=".4rem 1rem"
          to={pathEditBtn ? pathEditBtn : `${path}/modaleditware/${id}`}
        />
        <Button
          type="redCancel"
          text="حذف"
          width="5.5rem"
          fontSize=".7rem"
          padding=".4rem 1rem"
          to={`${path}/modalisconfidence/${id}`}
        />
      </div>
    </div>
  );
};
