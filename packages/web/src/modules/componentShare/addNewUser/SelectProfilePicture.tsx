import React from "react";
import Logo from "../../../image/Client/mountains.jpg";
import { Container } from "../container/Container";

export const SelectProfilePicture = () => {
  return (
    <Container title="انتخاب عکس کاربری">
      <div className="boxImage-admin">
        <img className="imageUser-admin" src={Logo} alt="NotFound" />
      </div>
      <div className="boxButton-SelectPicture-admin">
        <button className="buttonSelectLogo-SelectPicture-admin">
          انتخاب عکس
        </button>
        <button className="buttonLoadSystem-SelectPicture-admin">
          بارگزاری روی سامانه
        </button>
      </div>
    </Container>
  );
};
