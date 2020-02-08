import React from "react";
import { useParams } from "react-router";
import { Button } from "../../../../componentShare/button/Button";
import { Container } from "../../../../componentShare/container/Container";

interface FieldProps {
  to: string;
  text: string;
}

const Field: React.FC<FieldProps> = ({ to, text }) => {
  return (
    <div className="field">
      <p className="text">{text}</p>
      <Button to={to} className="btn" type="main" text="ویرایش" />
    </div>
  );
};

export const UpdateBtnsSection: React.FC = () => {
  let { id } = useParams();

  return (
    <Container title="ویرایش اطلاعات هویتی" className="update_btns_sections">
      <Field
        to={`/seller/settingstore/editstores/${id}`}
        text="اطلاعات شرکت / فروشگاه"
      />
    </Container>
  );
};
