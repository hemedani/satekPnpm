import React from "react";
import { Container } from "../../../../componentShare/container/Container";
export const CostWare: React.FC = () => {
  return (
    <Container>
      <div className="row-costware">
        <div className="part-costware">
          <p className="title-detailware">قیمت برای مراکز درمانی</p>
          <input className="input-detailware" />
        </div>
        <div className="part-costware part-left-costware">
          <p className="title-detailware">قیمت برای مصرف کننده</p>
          <input className="input-detailware" />
        </div>
      </div>
    </Container>
  );
};
