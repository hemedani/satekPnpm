import React from "react";

interface Props {
  text: string;
  money: boolean;
  number: string | number;
}
export const ItemAccountingReports: React.FC<Props> = ({
  text,
  money,
  number
}) => {
  return (
    <div className="itemAccountingReports-seller">
      <p className="text-itemAccountingReports-seller">{text}</p>
      <p className="number-itemAccountingReports-seller">
        {number}
        {money && <p className="rial-itemAccountingReports-seller">ریال</p>}
      </p>
    </div>
  );
};
