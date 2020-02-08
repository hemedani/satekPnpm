import React from "react";
import { Container } from "../../../componentShare/container/Container";
import { HelpMessage } from "../../../componentShare/helpMessage/HelpMessage";
import { SendedHeadHospital } from "./SendedHeadHospital";

interface Props {
  width: string;
  height: string;
  comment?: string;
  textButton?: string;
  showBtn?: boolean;
  id?: string;
  title: string;
  role?: string;
  type: "send" | "receive" | "sended";
}
export const OpinionHeadHospital: React.FC<Props> = ({
  width,
  height,
  type,
  title,
  comment,
  textButton,
  role,
  id,
  showBtn
}) => {
  return (
    <Container width={width} height={height} title={title}>
      <div className="detailStore-opinionHeadHospital-headHospital">
        {type === "receive" && (
          <React.Fragment>
            <div className="upSpecifications-opinionHeadHospital-headHospital">
              <div className="specifications-opinionHeadHospital-headHospital">
                <p>آرش محمدی</p>
                <p>کارشناس تجهیزات پزشکی</p>
              </div>
              <div className="dataTime-opinionHeadHospital-headHospital">
                <p className="Time-opinionHeadHospital-headHospital">20:20</p>
                <p className="dataTime-opinionHeadHospital-headHospital">
                  1398/08/05
                </p>
              </div>
            </div>
            <div className="bottomText-opinionHeadHospital-headHospital">
              <p>{comment}</p>
            </div>
          </React.Fragment>
        )}
        {type === "send" && (
          <div className="sendedHeadHospital-opinionHeadHospital-headHospital">
            <HelpMessage
              id={id && id}
              path="headHospital"
              showBtn={showBtn}
              buttonText={
                textButton ? textButton : "ارسال درخواست برای تامین اعتبار"
              }
              title={
                showBtn
                  ? "هنوز نظری درباره این درخواست ثبت نشده است"
                  : "نظری درباره این درخواست ثبت نشده است"
              }
              description={
                showBtn
                  ? "در صورتی که برای بررسی درخواست به نظر تامین اعتبار نیاز دارید این گزینه را انتخاب نمایید"
                  : " "
              }
              size="medium"
              role={role}
            />
          </div>
        )}
        {type === "sended" && (
          <div className="sendedHeadHospital-opinionHeadHospital-headHospital">
            <SendedHeadHospital />
          </div>
        )}
      </div>
    </Container>
  );
};
