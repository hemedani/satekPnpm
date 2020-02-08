import React, { useState } from "react";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { Paragraph } from "../../../componentShare/paragraph/Paragraph";
import { NumberInventory } from "./NumberInventory";

interface Props {
  nameGoods: string | null;
  nameEnGoods: string | null;
  numberInventory: number | null;
  price: number | null;
  nameWareClass: string | null;
  nameManufacturer: string | null;
  expiration: string | null;
  link?: string;
}
export const DetailGoodsMyProductList: React.FC<Props> = ({
  nameGoods,
  nameEnGoods,
  numberInventory,
  nameManufacturer,
  nameWareClass,
  price,
  expiration,
  link
}) => {
  const [selectFilter, setSelectFilter] = useState<number>(0);
  return (
    <Container
      margin="0.8rem 0 0 0.1rem"
      width="100%"
      childStyle={{ boxShadow: "0 0 0.15rem #a3a3a3" }}
    >
      <div className="detailGoodsMyProductList-seller">
        <div className="nameBox-detailGoodsMyProductList-seller">
          <div className="rowNameBox-detailGoodsMyProductList-seller">
            <Paragraph
              width="5rem"
              margin="0"
              color="#a3a3a3"
              fontSize="0.8rem"
              text="نام کالا"
            />
            <Paragraph margin="0 0 0.7rem 0" text={nameGoods} />
          </div>
          <div className="rowNameBox-detailGoodsMyProductList-seller">
            <Paragraph
              margin="0"
              width="5rem"
              color="#a3a3a3"
              fontSize="0.8rem"
              text="نام انگلیسی"
            />
            <Paragraph
              margin="0"
              color="#a3a3a3"
              fontSize="0.6rem"
              text={nameEnGoods}
            />
          </div>
          <div className="footer-nameBox-detailGoodsMyProductList-seller">
            <Paragraph
              fontSize="0.7rem"
              color="#a3a3a3"
              margin="1rem 0 0 2.5rem"
              text={nameWareClass}
            />
            <Paragraph
              fontSize="0.7rem"
              color="#a3a3a3"
              margin="1rem 2.5rem 0"
              text={nameManufacturer}
            />
            <Paragraph
              fontSize="0.7rem"
              color="#a3a3a3"
              margin="1rem 0 0 2.5rem"
              text={expiration}
            />
          </div>
        </div>
        <div className="priceBox-detailGoodsMyProductList-seller">
          <div className="rowPriceBox-detailGoodsMyProductList-seller">
            <div className="part-priceBox-detailGoodsMyProductList-seller">
              <div className="box-paragraph-detailGoodsMyProductList-seller">
                <Paragraph
                  style={{ display: "flex", alignItems: "center" }}
                  fontSize="0.8rem"
                  text="قیمت"
                  margin="0"
                />

                <Paragraph
                  style={{ whiteSpace: "nowrap" }}
                  margin="0.4rem"
                  fontFamily="IRANSANS"
                  fontSize="0.6rem"
                  text="(با ارزش افزوده)"
                />
              </div>
              <p className="containerPriceBox-detailGoodsMyProductList-seller">
                {price}
              </p>
            </div>
            <Paragraph
              margin="0 .2rem 0 0"
              color="#a3a3a3"
              fontSize="0.7rem"
              text="تومان"
            />
          </div>
          <div className="rowPriceBox-detailGoodsMyProductList-seller">
            <div className="part-priceBox-detailGoodsMyProductList-seller">
              <Paragraph
                fontSize="0.8rem"
                style={{ whiteSpace: "nowrap" }}
                margin="0"
                text="تعداد موجودی"
              />
              <NumberInventory value={numberInventory!} />
            </div>
          </div>
        </div>

        <div className="buttonBox-detailGoodsMyProductList-seller">
          <Button
            fontSize="0.7rem"
            text="ویرایش بیشتر"
            type="main"
            to={link}
            padding="0.5rem 0.8rem"
          />
        </div>
      </div>
    </Container>
  );
};
