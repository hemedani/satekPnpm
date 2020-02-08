import { useCategoryQuery } from "@satek/hooks";
import { getCategory_getCategory } from "@satek/resolvers";
import React from "react";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { ModalBox } from "../../../../componentShare/modalBox/ModalBox";
import { CategoryCreate } from "../../create/Create";
import { CategoryUpdate } from "../../update/Update";

interface Props extends RouteComponentProps {}

export const CategoryModalBox: React.FC<Props> = ({
  history,
  match: { path }
}) => {
  let { id } = useParams();
  const headerName = (id: string | undefined, path: string) => {
    if (id) {
      return "ویرایش واحد";
    } else {
      return "افزودن واحد";
    }
  };

  const ParseCategory: React.FC<{
    data: getCategory_getCategory;
  }> = ({ data }) => {
    if (id) {
      return (
        <CategoryUpdate
          id={id}
          details={data}
          isEditable={true}
          history={history}
          path={path}
        />
      );
    } else return <></>;
  };

  
  const responseCategory = useCategoryQuery(
    { error: CustomError, loading: Loader, parsing: ParseCategory },
    { id: id ? id : "" },
    client
  );

  return (
    <ModalBox
      modalBoxSize="medium"
      display="flex"
      history={history}
      headerName={headerName(id, path)}
    >
      {responseCategory.Response!.props.data ? (
        responseCategory.Response
      ) : (
        <>
          <CategoryCreate isEditable={false} history={history} path={path} />
        </>
      )}
    </ModalBox>
  );
};
