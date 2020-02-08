import {
  useWareClassQuery,
  useWareGroupQuery,
  useWareModelQuery,
  useWareTypeQuery
} from "@satek/hooks";
import {
  getWareClass_getWareClass,
  getWareGroup_getWareGroup,
  getWareModel_getWareModel,
  getWareType_getWareType
} from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../Apollo";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import { ModalBox } from "../../componentShare/modalBox/ModalBox";
import { ComponentWare } from "./ComponentWare";

interface Props extends RouteComponentProps {}

export const ModalEditWare: React.FC<Props> = ({
  match: { path },
  history
}) => {
  const { id } = useParams();

  const ParseModelWare: React.FC<{ data: getWareModel_getWareModel }> = ({
    data
  }) => {
    return (
      <ComponentWare
        history={history}
        path={path}
        wareType={data.wareType}
        wareClassProps={data.wareClass}
        wareGroupProps={data.wareGroup}
        id={id ? id : ""}
        defaultValue={{ name: data.name, enName: data.enName }}
      />
    );
  };
  const ParseClassWare: React.FC<{ data: getWareClass_getWareClass }> = ({
    data
  }) => {
    return (
      <ComponentWare
        history={history}
        wareType={data.wareType}
        path={path}
        id={id ? id : ""}
        defaultValue={{ name: data.name, enName: data.enName }}
      />
    );
  };
  const ParseGroupWare: React.FC<{ data: getWareGroup_getWareGroup }> = ({
    data
  }) => {
    console.log(data.wareClasses, "wareClasses");
    return (
      <ComponentWare
        history={history}
        wareType={data.wareType!}
        wareClassesProps={data.wareClasses}
        path={path}
        id={id ? id : ""}
        defaultValue={{ name: data.name, enName: data.enName }}
      />
    );
  };
  const ParseTypeWare: React.FC<{ data: getWareType_getWareType }> = ({
    data
  }) => {
    return (
      <ComponentWare
        history={history}
        path={path}
        id={id ? id : ""}
        defaultValue={{ name: data.name, enName: data.enName }}
      />
    );
  };
  const ResponseWareType = useWareTypeQuery(
    { error: CustomError, loading: Loader, parsing: ParseTypeWare },
    { id: path.includes("typeware") ? (id ? id : "") : "" },
    client
  ).Response;
  const ResponseWareGroup = useWareGroupQuery(
    { error: CustomError, loading: Loader, parsing: ParseGroupWare },
    { id: path.includes("groupware") ? (id ? id : "") : "" },
    client
  ).Response;
  const ResponseWareClass = useWareClassQuery(
    { error: CustomError, loading: Loader, parsing: ParseClassWare },
    { id: path.includes("classware") ? (id ? id : "") : "" },
    client
  ).Response;
  const ResponseWareModel = useWareModelQuery(
    { error: CustomError, loading: Loader, parsing: ParseModelWare },
    { id: path.includes("modelware") ? (id ? id : "") : "" },
    client
  ).Response;
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="افزودن نوع کالا"
      display="flex"
    >
      {path.includes("typeware") && ResponseWareType}
      {path.includes("classware") && ResponseWareClass}
      {path.includes("groupware") && ResponseWareGroup}
      {path.includes("modelware") && ResponseWareModel}
    </ModalBox>
  );
};
