import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import React from "react";
interface Props {
  result: any;
  setResult: (value: any) => void;
  setCamera: (value: boolean) => void;
  camera: boolean;
}
export const BarcodeScanner: React.FC<Props> = ({
  result,
  setCamera,
  setResult,
  camera
}) => {
  // const onDetected = (result: any) => {
  // };
  let selectedDeviceId: any;
  if (camera) {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(selectedDeviceId, "video", (result, err) => {
        if (result) {
          setResult(result.getText());
          console.log(result.getText());
          codeReader.reset();
          setCamera(false);
          console.log(result);
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err, "err2");
        }
      })
      .catch(err => {
        codeReader.reset();
        console.error(err, "err1");
      });
  }

  return (
    <>
      <div
        style={camera ? { display: "flex" } : { display: "none" }}
        className="container-barcodeReader"
      >
        <video id="video" width="250" height="200"></video>
      </div>
    </>
  );
};
