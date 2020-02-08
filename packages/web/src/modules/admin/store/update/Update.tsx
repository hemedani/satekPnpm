import { useMeQuery } from "@satek/hooks";
import React from "react";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { UpdateBtnsSection } from "./components/BtnsSection";

interface Props extends RouteComponentProps {}

export const StoreUpdate: React.FC<Props> = ({ match: { path } }) => {
  
  const ResponseMe = useMeQuery(
    { error: CustomError, loading: Loader },
    client
  );

  return (
    <div>
      <UpdateBtnsSection />
    </div>
  );
};
