import React from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";

interface Props extends RouteComponentProps {}
export const ModalTimedSalesSettings: React.FC<Props> = ({ history }) => {
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="تنظیمات فروش مدت دار"
      modalBoxSize="medium"
      display="flex"
    >
      <div className="modaltimedsalessettings">
        <div className="body-modaltimedsalessettings">
          <Container
            margin="2rem 0 0 0"
            width="90%"
            title="درصد افزایش قیمت کالا برای پرداخت مدت دار"
          >
            <div className="up-modaltimedsalessettings">
              <div className="row-modaltimedsalessettings">
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">دو ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">سه ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">چهار ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">پنج ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
              </div>
              <div className="row-modaltimedsalessettings">
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">شش ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">هفت ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">هشت ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">نه ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
              </div>
              <div className="row-modaltimedsalessettings">
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">ده ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">یازده ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">دوازده ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings"></div>
              </div>
            </div>
            <div className="down-modaltimedsalessettings">
              <div className="row-modaltimedsalessettings">
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">18 ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings">
                  <p className="title-modaltimedsalessettings">24 ماهه</p>
                  <input className="input-modaltimedsalessettings" />
                  <p className="text-modaltimedsalessettings">درصد</p>
                </div>
                <div className="row-field-modaltimedsalessettings"></div>
                <div className="row-field-modaltimedsalessettings"></div>
              </div>
            </div>
          </Container>
        </div>
        <div className="box-bottom-modaltimedsalessettings">
          <div className="box-button-modaltimedsalessettings">
            <Button
              fontSize="0.8rem"
              width="7rem"
              margin="0 1rem"
              type="main"
              justifyContent="center"
              text="ثبت تغییرات"
            />
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
