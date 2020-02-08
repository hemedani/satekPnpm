import React from "react";
import { Button } from "../../componentShare/button/Button";
import { Input } from "../../componentShare/Input/Input";
interface Props {
  path: string;
  button?: {
    text: string;
    to?: string;
  };
}

export const SearchWare: React.FC<Props> = ({ button, path }) => {
  return (
    <div className="searchware">
      {/* <div className="input-searchware"> */}
      <Input
        size="medium"
        style={{ width: "33%" }}
        titleStyle={{ color: "black", width: "6rem" }}
        title={
          path.includes("typeware")
            ? "جستجو نوع کالا"
            : path.includes("classware")
            ? "جستجو کلاس کالا"
            : path.includes("groupware")
            ? "جستجو گروه کالا"
            : path.includes("modelware")
            ? "جستجو مدل کالا"
            : "جستجو  کالا"
        }
      />

      {button &&
        (button.to ? (
          <Button
            text={button.text}
            to={button.to}
            type="main"
            justifyContent="center"
            width="9rem"
            fontSize="0.8rem"
            margin="0 2rem 0 0"
            padding="0.6rem 1.5rem"
          />
        ) : (
          <Button
            text={button.text}
            type="main"
            justifyContent="center"
            width="9rem"
            fontSize="0.8rem"
            margin="0 2rem 0 0"
            padding="0.6rem 1.5rem"
          />
        ))}
      {/* </div> */}
    </div>
  );
};
