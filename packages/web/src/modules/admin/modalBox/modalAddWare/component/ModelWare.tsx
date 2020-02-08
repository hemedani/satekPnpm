import React, { useState } from "react";
import { Button } from "../../../../componentShare/button/Button";
import { Selector } from "../../../../componentShare/selectors/Selector";
import { AddIRC } from "./AddIRC";

interface Props {
  color: string;
}
export const ModelWare: React.FC<Props> = ({ color }) => {
  const [IRCWare, setIRCWare] = useState(["IRC1"]);
  return (
    <div className="modelware">
      <div className={`side-${color}-modelware`}></div>
      <div className="body-modelware">
        <div className="row-detailware">
          <div className="field-modelGoods-modelware fix-row-detailware">
            <p className="title-detailware">مدل کالا</p>
            <input className="input-detailware" />
          </div>
          <div className="field-brand-modelware fix-row-detailware">
            <p className="title-detailware">برند</p>
            <Selector
              style={{ width: "100%" }}
              options={[]}
              height="1.7rem"
              name="country"
              placeholder=""
            />
          </div>
          <div className="field-company-modelware fix-row-detailware">
            <p className="title-detailware">شرکت نمایندگی</p>
            <Selector
              style={{ width: "100%" }}
              options={[]}
              height="1.7rem"
              name="country"
              placeholder=""
            />
          </div>
          <div className="field-id-modelware fix-row-detailware">
            <p className="title-detailware">شناسه نمایندگی</p>
            <input className="input-detailware" />
          </div>
        </div>
        <div className="row-modelware">
          <div className="field-country-modelware fix-row-detailware">
            <p className="title-detailware">کشور سازنده اصلی</p>
            <Selector
              style={{ width: "100%" }}
              options={[]}
              height="1.7rem"
              name="country"
              placeholder=""
            />
          </div>
          <div className="field-company-orginal-modelware fix-row-detailware">
            <p className="title-detailware">کمپانی سازنده اصلی</p>
            <Selector
              style={{ width: "100%" }}
              options={[]}
              height="1.7rem"
              name="country"
              placeholder=""
            />
          </div>
        </div>
        {IRCWare.map((IRC, index) => (
          <AddIRC key={index} />
        ))}
        <div className="box-button-detailware">
          <Button
            padding="0.5rem 0.5rem"
            type="okay"
            fontSize="0.7rem"
            margin="0.7rem 0 0.3rem 0"
            onClick={() => {
              setIRCWare([...IRCWare, "IRC" + (IRCWare.length + 1)]);
            }}
            text="افزودن IRC جدید برای مدل"
          />
        </div>
      </div>
    </div>
  );
};
