import React from "react";

interface Props {
  name: string;
  onClick?(props: any): any;
}

export const LabelGeneral: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div className="label-general-cnt">
      <p className="name">{name}</p>
      <p className="delete" onClick={onClick}>
        حذف
      </p>
    </div>
  );
};
