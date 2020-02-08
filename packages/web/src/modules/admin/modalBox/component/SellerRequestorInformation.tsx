import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { ItemBox } from "../../../componentShare/itemBox/ItemBox";

interface Props {
  margin?: string;
  padding?: string;
  text: string[];
  title: string[];
}
export const SellerRequestorInformation: React.FC<Props> = ({
  margin,
  padding,
  text,
  title
}) => {
  return (
    <Container margin={margin} padding={padding}>
      <div className="sellerRequestorInformation-admin">
        <div className="field-input-component-admin">
          <ItemBox margin="0" text={text[0]} title={title[0]} />
        </div>
        <div className="field-input-component-admin">
          <ItemBox margin="0" text={text[1]} title={title[1]} />
        </div>
      </div>
    </Container>
  );
};
