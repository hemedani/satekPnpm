import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { BarcodeScanner } from "../../../componentShare/barcode/BarcodeScanner";
import { Button } from "../../../componentShare/button/Button";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";
import { InfoWare } from "./component/InfoWare";

interface Props extends RouteComponentProps {}
export const ModalBarcode: React.FC<Props> = ({ history }) => {
  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (result) {
      setLoading(true);
      console.log("main raftam" + result);
      fetch(`http://localhost:5000/irancode/getall/${result}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch(e => console.log(e));
    }
  }, [result]);
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="اطلاعات کالا"
      display="flex"
    >
      {console.log(data, "isdata")}
      <div className="container-modalbarcode">
        <BarcodeScanner
          result={result}
          camera={camera}
          setCamera={setCamera}
          setResult={setResult}
        />
        {result && loading ? (
          <Loader type="Circle" />
        ) : (
          <InfoWare data={data!} />
        )}
        <p className={result ? "display-none-modalbarcode" : ""}>
          لطفا کالای مورد نظر را مقابل بارکدخوان قرار دهید
        </p>
        <div className="boxbtn-modalbarcode">
          <Button
            fontSize="0.8rem"
            margin="0.5rem 0.5rem"
            type="gray"
            text="بازگشت"
            mainType="submit"
            padding="0.5rem 1rem"
          />
        </div>
      </div>
    </ModalBox>
  );
};
