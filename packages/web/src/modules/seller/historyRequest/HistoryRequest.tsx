import React from "react";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { SearchHistoryRequest } from "./component/SearchHistoryRequest";

export const HistoryRequest: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader="تاریخچه درخواست">
      <div>
        <div className="search-myProductList-seller">
          <SearchHistoryRequest />
        </div>
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        {/* <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        />
        <SituationGoodsClient
          lastSituation="checking detector"
          colorButton="blue"
          typeButton="Tracking"
          buttonName="مشاهده درخواست"
          detail={["امیرحسین سیف - بیمارستان شهید بهشتی همدان(09183152645)"]}
        /> */}
      </div>
    </ContainerClient>
  );
};
