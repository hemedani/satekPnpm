import { useUploadImage } from "@satek/hooks";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import Logo from "../../../image/Client/mountains.jpg";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";

interface Props {
  imageWidth?: string;
  imageHeight?: string;
  name?: string;
}

export const LogoSelector: React.FC<Props> = ({
  imageWidth,
  imageHeight,
  name
}) => {
  const { setValue, register } = useFormContext();
  register({ name: name ? name : "logoUrl" });
  const { onDrop, img, err } = useUploadImage(setValue, "logoUrl");
  //@ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="logo-selector-cnt">
      <div {...getRootProps()} className="btns-cnt">
        {/*
 // @ts-ignore */}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>یک عکس به اینجا بکشید ...</p>
        ) : (
          <Button
            className="upload"
            mainType="button"
            type="main"
            text="بارگذاری"
            fontSize=".65rem"
            padding=".8rem 1rem"
            margin="0 0 0 .5rem"
          />
        )}
      </div>
      <div className="img-cnt">
        <img
          style={{
            width: imageWidth,
            height: imageHeight
          }}
          className="img"
          id="image"
          src={img ? `http://localhost:4000/files/images/${img}` : Logo}
        />
      </div>
      {err && <CustomError errMsg={err} />}
    </div>
  );
};
