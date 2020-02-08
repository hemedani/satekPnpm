import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { CityCreate } from "../../city/create/Create";
import { StateCreate } from "../../state/create/Create";

interface Props extends RouteComponentProps {}

export const BasicSettingModalBox: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  let { id } = useParams();
  const headerName = (id: string | undefined, path: string) => {
    if (id) {
      if (path.includes("addcity")) {
        return { title: "ویرایش شهر", state: 1 };
      }
      if (path.includes("addstate")) {
        return {
          title: "ویرایش استان",
          state: 2
        };
      }
    } else {
      if (path.includes("addcity")) {
        return {
          title: "افزودن شهر",
          state: 3
        };
      }
      if (path.includes("addstate")) {
        return {
          title: "افزودن استان",
          state: 4
        };
      }
    }
  };
  let response = headerName(id, path)!;
  return (
    <ModalBox
      modalBoxSize="medium"
      display="flex"
      history={history}
      headerName={response.title}
    >
      {response.state === 3 && (
        <CityCreate isEditable={false} history={history} path={path} />
      )}
      {response.state === 4 && (
        <StateCreate isEditable={false} history={history} path={path} />
      )}
    </ModalBox>
  );
};
