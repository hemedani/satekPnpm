import { getOrderForSeller_getOrder } from "@satek/resolvers";
import React from "react";
import { Container } from "../../../../componentShare/container/Container";
interface Props {
  data?: getOrderForSeller_getOrder;
}

export const DetailInfoGoodSeller: React.FC<Props> = ({ data }) => {
  // console.log(data, "<======infoGoodSeller");

  return (
    <Container>
      <div className="row-modaldetailGoodSeller">
        <div className="part-right-modaldetailGoodSeller">
          <div className="name-good-modaldetailGoodSeller">
            <h3 className="name-goods-modalAddStuff">
              {data && data.ware && data.ware.name}
            </h3>
            <p className="barcode-goods-modaldetailGoodSeller">
              {/* (1356989658912563) */}
            </p>
          </div>
          <p className="name-en-modaldetailGoodSeller">
            {data && data.ware && data.ware.enName}
          </p>
        </div>
        <div className="part-left-modaldetailGoodSeller">
          {data && data.stuff && data.stuff.barcode ? (
            <div />
          ) : (
            <h3 className="text-header-not-barcode-modaldetailGoodSeller">
              بارکد موجود نیست
            </h3>
          )}

          {/* <img src={BarCode} className="image-barcode-modaldetailGoodSeller" /> */}
        </div>
      </div>
      <div className="row-modaldetailGoodSeller">
        <div className="part-right-good-modaldetailGoodSeller">
          <div className="filed-part-modaldetailGoodSeller margin-modaldetailGoodSeller">
            <p className="title-modaldetailGoodSeller">دسته بندی </p>
            <p className="text-modaldetailGoodSeller">
              {data && data.wareGroup && data.wareGroup.name}
            </p>
          </div>
          <div className="filed-part-modaldetailGoodSeller">
            <p className="title-modaldetailGoodSeller">کشور سازنده</p>
            <p className="text-modaldetailGoodSeller">
              {data &&
                data.ware &&
                data.ware.manufacturer &&
                data.ware.manufacturer.country}
            </p>
          </div>
        </div>
        <div className="part-left-good-modaldetailGoodSeller">
          <p className="title-modaldetailGoodSeller margin-modaldetailGoodSeller">
            کد ثبت شده کالا:
          </p>
          <p className="title-modaldetailGoodSeller">{data && data.id}</p>
        </div>
      </div>
    </Container>
  );
};
