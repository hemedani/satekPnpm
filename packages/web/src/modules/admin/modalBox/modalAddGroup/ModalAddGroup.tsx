import { useCreateWareClassMutate, useWareClassQuery } from "@satek/hooks";
import {
  createWareClassVariables,
  getWareClass_getWareClass
} from "@satek/resolvers";
import React from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../../Apollo";
import ImageIcon from "../../../../image/Client/mountains.jpg";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Input } from "../../../componentShare/Input/Input";
import { Loader } from "../../../componentShare/loader/Loader";
import { ModalBox } from "../../../componentShare/modalBox/ModalBox";

interface Props extends RouteComponentProps {}
export const ModalAddGroup: React.FC<Props> = ({
  history,
  match: { params }
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<
    createWareClassVariables
  >();

  const { createWareClassMutate } = useCreateWareClassMutate({}, client);
  // const { updateWareClassMutate } = useUpdateWareClassMutate({}, client);

  const { classId }: any = params;
  console.log(classId, "class id is ...");
  console.log(params, "class id is ...");
  const Parse: React.FC<{ data: getWareClass_getWareClass }> = ({ data }) => {
    return null;
  };
  let { id } = useParams();

  const wareClass = useWareClassQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { id: id ? id : "" },
    client
  ).data;
  const wareClassDetails = wareClass && wareClass.getWareClass;
  const onSubmit = handleSubmit(async variables => {
    let val;
    if (id === "") {
      const val = {
        ...variables
        // wareType: WareType.Medical
      };
      try {
        const { data, errors } = await createWareClassMutate({
          variables: val
        });
        history.goBack();
        console.log(data, "result...");
      } catch (err) {
        console.log(JSON.stringify(err), "error is...");
      }
    } else {
      const val = {
        ...variables,
        id: id!
        // wareType: WareType.Medical
      };

      try {
        // const { data, errors } = await updateWareClassMutate({
        //   variables: val
        // });
        // console.log(data, "update ware group result");
        history.goBack();
      } catch (err) {
        console.log(val, "<===vari");

        console.log(JSON.stringify(err), "error in update ware group");
      }
    }
  });

  console.log(wareClassDetails, "wareClasses...");
  return (
    <ModalBox
      history={history}
      headerIcon="ic_info_square"
      headerName="مشاهده درخواست"
      display="flex"
    >
      <form className="modalAddWare" onSubmit={onSubmit}>
        <div className="modalViewPermissions">
          <div className="body-modalViewPermissions">
            <div className="part-left-modaladdsubgroup">
              <Container height="90%" title="انتخاب عکس زیرگروه">
                <div className="box-image-icon-modaladdsubgroup">
                  <img
                    src={ImageIcon}
                    alt="NotFound"
                    className="image-icon-modaladdsubgroup"
                  />
                </div>
                <div className="box-button-image-icon-modaladdsubgroup">
                  <Button
                    fontSize="0.8rem"
                    padding="0.5rem 1rem"
                    text="انتخاب عکس"
                    type="yellowBtn"
                  />
                  <Button
                    margin="0 0.5rem"
                    fontSize="0.8rem"
                    padding="0.5rem 1rem"
                    text="بارگزاری عکس"
                    type="disable"
                  />
                </div>
              </Container>
            </div>
            <div className="part-right-modaladdsubgroup">
              <div className="field-modaladdsubgroup">
                <p className="title-modaladdsubgroup">نام گروه</p>
                <Input
                  register={register}
                  size="medium"
                  name="name"
                  title=""
                  defaultValue={
                    id && wareClassDetails ? wareClassDetails.name : ""
                  }
                  // defaultValue={wareGroupDetail ? wareGroupDetail.name : ""}
                />
              </div>
              <div className="field-modaladdsubgroup">
                <p className="title-modaladdsubgroup">نام انگلیسی</p>
                <Input
                  register={register}
                  size="medium"
                  name="enName"
                  title=""
                  defaultValue={
                    id && wareClassDetails ? wareClassDetails.enName : ""
                  }

                  // defaultValue={wareGroupDetail ? wareGroupDetail.enName : ""}
                />
              </div>
            </div>
          </div>
          <div className="box-bottom-modalAddWare">
            <div className="box-button-modalAddWare">
              <Button
                fontSize="0.8rem"
                width="7rem"
                padding="0.1rem"
                type="cancel"
                onClick={() => history.goBack()}
                text="بازگشت"
              />
              <Button
                justifyContent="center"
                fontSize="0.8rem"
                margin="0 1rem"
                width="7rem"
                type="main"
                text={id === "" ? "افزودن" : "اصلاح"}
              />
            </div>
          </div>
        </div>
      </form>
    </ModalBox>
  );
};
