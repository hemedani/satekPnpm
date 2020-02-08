import cx from "classnames";
import * as React from "react";
import { Input } from "../../componentShare/Input/Input";
import { Button } from "../button/Button";
import { Selector } from "../selectors/Selector";
interface Props {
  vertical: boolean;
  hasSubGroup?: boolean;
  button?: {
    text: string;
    to?: string;
  };
  hasNotification?: boolean;
}
export const SearchGoodsClient: React.FC<Props> = ({
  hasSubGroup = true,
  vertical,
  button,
  hasNotification
}) => {
  return (
    <div className={cx("SearchGoods-client", { vertical: vertical })}>
      {hasNotification && (
        <div className="notification-searchGoods">
          <span className="ic_info_circle"></span>
          <p className="text-notification-searchGoods">
            کالا های مجاز برای درخواست توسط مدیریت انتخاب شده است، در صورتی که
            کالای مورد نظر در این لیست وجود ندارد، لطفا فرم افزودن کالا را تکمیل
            نمایید
          </p>
          <Button
            text="فرم افزودن کالا به لیست مجاز"
            type="okay"
            fontSize="0.7rem"
            padding="0.3rem 1rem"
            margin="0 0.5rem"
          />
        </div>
      )}
      <div className="boxes-SearchGoods-client">
        <div className="searchNameGoods-SearchGoods-client">
          <p className="title-SearchGoods-client">جستجو نام کالا</p>
          <Input
            title=""
            padding="0.3rem 0"
            style={{ width: "100%" }}
            size="medium"
            name="subgroup"
          />
        </div>
        <div className="groupGoods-SearchGoods-client">
          <p className="title-SearchGoods-client">گروه کالا</p>
          <Selector
            style={{ width: "100%" }}
            options={[]}
            placeholder=""
            name="subgroup"
          />
        </div>
        <div className="subgroupGoods-SearchGoods-client">
          {hasSubGroup && (
            <>
              <p className="title-SearchGoods-client">زیر گروه کالا</p>
              <Selector
                style={{ width: "100%" }}
                options={[]}
                placeholder=""
                name="subgroup"
              />
            </>
          )}
        </div>
      </div>
      {/* <div className="box-button-SearchGoods-client">
        <Button text="جستجو" type="main" padding="0.5rem 1.3rem" />
      </div> */}
      {button &&
        (button.to ? (
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
        ) : (
          <Button
            text={button.text}
            type="main"
            justifyContent="center"
            width="8rem"
            fontSize="0.8rem"
            margin="0 2rem 0 0"
            padding="0.6rem 1.5rem"
          />
        ))}
    </div>
  );
};
