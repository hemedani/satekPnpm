import * as React from "react";
import { Button } from "../../../componentShare/button/Button";
import { Selector } from "../../../componentShare/selectors/Selector";
interface Props {
  button?: {
    text: string;
    to: string;
  };
}
export const SearchOffer: React.FC<Props> = ({ button }) => {
  return (
    <div className="SearchGoods-client">
      <div className="boxes-SearchOffer-client">
        <div className="searchNameGoods-SearchOffer-client">
          <p className="title-SearchGoods-client">جستجو در تخفیف ها</p>
          <Selector
            style={{ width: "100%" }}
            options={[]}
            placeholder=""
            name="subgroup"
          />
        </div>
      </div>
      {/* <div className="box-button-SearchGoods-client">
        <Button text="جستجو" type="main" padding="0.5rem 1.3rem" />
      </div> */}
      {button && (
        <Button
          text={button.text}
          to={button.to}
          type="main"
          justifyContent="center"
          width="8rem"
          fontSize="0.8rem"
          margin="0 2rem 0 0"
          padding="0.6rem 1.5rem"
        />
      )}
    </div>
  );
};
