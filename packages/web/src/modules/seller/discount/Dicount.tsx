import React from "react";
import { Button } from "../../componentShare/button/Button";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { Footer } from "../../componentShare/footer/Footer";
import { Input } from "../../componentShare/Input/Input";
import { Selector } from "../../componentShare/selectors/Selector";

export const Discount: React.FC = () => {
  // const [state, setState] = useState(0);

  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="تخفیف ها"
      footer={
        <Footer
          items={[
            <Button
              text="انصراف"
              type="cancel"
              width="8rem"
              padding="0.5rem 0.8rem"
            />,
            <Button
              text="تایید"
              type="main"
              width="8rem"
              padding="0.5rem 0.8rem"
              className="center"
            />
          ]}
        />
      }
    >
      <div className="discount-container-main">
        {/* commented stuff will add AFTER DEMO VERSION*/}

        {/* <SelectBoxRegister
          nameFields={[
            "تخفیف فروش نقدی",
            "تخفیف آزاد فروش ویژه",
            "تخفیف بابت فروش عمده",
            "تخفیف تاریخ انقضای نزدیک"
          ]}
          select={state}
          change={setState}
        /> */}

        {/* FIXME: Mahdi Hoseini <30sep>: Container defaul style should fix */}
        <Container className="input-container" title="جزییات اعمال تخفیف">
          <div className="discount-box">
            <div className="discount-input-box">
              <Selector
                name="startDate"
                label="زمان مانده از انقضا"
                options={[]}
                placeholder=" "
                className="input"
                labelStyle={{width: "auto", marginLeft: "0.8rem"}}
                width="16rem"
              />

              {/* <Selector
              name="finishDate"
              label="تاریخ پایان"
              options={[]}
              placeholder=" "
              className="input"
            /> */}

              <Input title="میزان تخفیف" size="medium" postFix="درصد" />
            </div>
            <div className="discount-info-box">
              <p>
                میزان درصد تخفیف برای کالاهای با تاریخ انقضای نزدیک را در این
                بخش تعیین کنید. این نوع تخفیف برای همه کالاها در زمان مانده‌ی
                مشخص شده اعمال خواهد شد.
              </p>
            </div>
          </div>

          {/* <div className="discount-input-box">
            <InputCheckbox
              text="همزمان با سایر تخفیف‌ها فعال شود"
              fontFamily="light"
            />
          </div> */}

          {/* textbox text had chaged. "با سایر تخفیف ها (مثل تخفیف بابت فروش عمده) همزمان فعال باشد" */}
        </Container>

        {/* <Container className="input-container">
          <div className="result-box">
            <InputCheckbox text="تخفیف برای کالا‌های منتخب من انتخاب شود (انتخاب کالاهای منتخب)" />

            <LineSeparator text=" " color="gray" />

            <div className="search-searchMyProductList-seller">
              <Selector
                style={{ width: "70%", display: "flex", alignItems: "center" }}
                label="جستجوی نام کالا"
                name="historustart"
                placeholder=""
                labelStyle={{ width: "unset", marginLeft: "1.3rem" }}
                options={[]}
                />
              <Button
                fontSize="0.9rem"
                text="جستجو"
                padding="0 0.8rem"
                type="main"
              />
            </div>
          </div>
        </Container> */}
      </div>
    </ContainerClient>
  );
};
