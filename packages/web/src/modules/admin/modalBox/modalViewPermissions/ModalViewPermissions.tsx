import classNames from "classnames";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import Cartmeli from "../../../../image/admin/cartmeli.jpg";
import Eghtesadi from "../../../../image/admin/eghtesadi.jpg";
import Newspaper from "../../../../image/admin/newspaper.jpg";
import Personal from "../../../../image/admin/personal.jpg";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";

interface Props extends RouteComponentProps {}
export const ModalViewPermissions: React.FC<Props> = ({ history }) => {
  const [select, setSelect] = useState<number>(0);
  const imageSelect = [Eghtesadi, Newspaper, Cartmeli, Personal];
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="تنظیمات فروش مدت دار"
      modalBoxSize="large"
      display="flex"
    >
      <div className="modalViewPermissions">
        <div className="body-modalViewPermissions">
          <div className="part-left-modalViewPermissions">
            <Container height="100%">
              <div className="box-image-large-modalViewPermissions">
                <img
                  src={imageSelect[select]}
                  alt="NotFound"
                  className="image-large-modalViewPermissions"
                />
              </div>
            </Container>
          </div>
          <div className="part-right-modalViewPermissions">
            <div
              onClick={() => setSelect(0)}
              className={classNames("item-modalViewPermissions", {
                "border-modalViewPermissions": select == 0
              })}
            >
              <p className="title-modalViewPermissions">تصویر مجوز فعالیت</p>
              <div className="box-image-small-modalViewPermissions">
                <img
                  src={imageSelect[0]}
                  className="image-small-modalViewPermissions"
                />
              </div>
            </div>
            <div
              onClick={() => setSelect(1)}
              className={classNames("item-modalViewPermissions", {
                "border-modalViewPermissions": select == 1
              })}
            >
              <p className="title-modalViewPermissions">تصویر مجوز فعالیت</p>
              <div className="box-image-small-modalViewPermissions">
                <img
                  src={imageSelect[1]}
                  className="image-small-modalViewPermissions"
                />
              </div>
            </div>
            <div
              onClick={() => setSelect(2)}
              className={classNames("item-modalViewPermissions", {
                "border-modalViewPermissions": select == 2
              })}
            >
              <p className="title-modalViewPermissions">تصویر مجوز فعالیت</p>
              <div className="box-image-small-modalViewPermissions">
                <img
                  src={imageSelect[2]}
                  className="image-small-modalViewPermissions"
                />
              </div>
            </div>
            <div
              onClick={() => setSelect(3)}
              className={classNames("item-modalViewPermissions", {
                "border-modalViewPermissions": select == 3
              })}
            >
              <p className="title-modalViewPermissions">تصویر مجوز فعالیت</p>
              <div className="box-image-small-modalViewPermissions">
                <img
                  src={imageSelect[3]}
                  className="image-small-modalViewPermissions"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="box-bottom-modalViewPermissions">
          <div className="box-button-modaltimedsalessettings">
            <Button
              fontSize="0.8rem"
              width="7rem"
              type="cancel"
              text="بازگشت"
            />
          </div>
        </div>
      </div>
    </ModalBox>
  );
};
