import React from "react";
import { Container } from "../../componentShare/container/Container";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { Input } from "../../componentShare/Input/Input";
import { Selector } from "../../componentShare/selectors/Selector";
import { DocumentListItem } from "./component/DocumentListItem";

const testerStyle = {
  border: "3px solid gray"
};

export const UploadDouments: React.FC = () => {
  return (
    <ContainerClient colorHeader="blue" textHeader=" مرکز بارگذاری مدارک ">
      <div className="uploaddouments">
        <div style={{ width: "100%", height: "45%" }}>
          <Container
            title="بارگذاری سند/مدرک جدید"
            margin="0.5rem 0 0 0"
            width="100%"
            childStyle={{ boxShadow: "0 0 0.15rem #a3a3a3" }}
          >
            <div className="input-box-seller">
              <div className="text-input-box-seller">
                <Input
                  title="نام مدرک"
                  size="medium"
                  className="input-name-seller"
                />
                <Selector
                  name="docType"
                  label="نوع مدرک"
                  options={[]}
                  placeholder=" "
                  className="input-name-seller"
                />
                <div className="description-box-seller">
                  <p className="input-cnt">توضیحات</p>
                  <textarea />
                </div>
              </div>
              <div className="image-input-seller">UPLOAD SECTION</div>
            </div>
          </Container>
        </div>
        <div style={{ display: "flex", height: "50%" }}>
          <Container
            title="لیست فایل‌های آپلود شده شما"
            margin="1rem 0 1rem 0"
            width="100%"
            childStyle={{
              direction: "ltr",
              paddingRight: "0.5rem",
              boxShadow: "0 0 0.15rem #a3a3a3",
              overflowY: "auto"
            }}
          >
            <DocumentListItem
              documentName="قیمت کل با ارزش افزوده برای فروش دستگاه فشار خون"
              documentType="بخش نامه ها"
              description="لورم ایچاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. "
            />
            {/* TODO <29Sep2019> by Mahdi Hoseini: Defult text should be empty instead. didn't chaged because of possiability of conflict! */}

            <DocumentListItem
              documentName="قیمت کل با ارزش افزوده برای فروش دستگاه فشار خون"
              documentType="بخش نامه ها"
              description="لورم ایچاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. "
            />
          </Container>
        </div>
      </div>
    </ContainerClient>
  );
};
