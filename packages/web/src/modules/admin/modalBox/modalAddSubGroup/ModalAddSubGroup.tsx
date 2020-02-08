import {
  useCreateWareGroupMutate,
  useWareClassesQuery,
  useWareGroupsQuery
} from "@satek/hooks";
import {
  createWareGroupVariables,
  getWareClasses_getWareClasses,
  getWareGroups_getWareGroups
} from "@satek/resolvers";
import React, { useEffect } from "react";
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
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";

interface Props extends RouteComponentProps {}
export const ModalAddSubGroup: React.FC<Props> = ({
  history,
  match: { params }
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<
    createWareGroupVariables
  >();
  const Parse: React.FC<{ data: getWareGroups_getWareGroups }> = ({ data }) => {
    return null;
  };
  let { id } = useParams();

  // const wareGroup = useWareGroupQuery(
  //   { error: CustomError, loading: Loader, parsing: Parse },
  //   { id: id ? id : "" },
  //   client
  // ).data;
  // const wareGroupDetails = wareGroup && wareGroup.getWareGroup;
  //console.log(wareGroupDetails, "is it works...");
  const { createWareGroupMutate } = useCreateWareGroupMutate({}, client);
  // const { updateWareGroupMutate } = useUpdateWareGroupMutate({}, client);

  const { classId }: any = params;
  console.log(id, "id is ...");
  console.log(classId, "class id is ...");
  console.log(params, "class id is ...");
  const onSubmit = handleSubmit(async variables => {
    if (id === "") {
      try {
        const { data, errors } = await createWareGroupMutate({ variables });
        history.goBack();
        console.log(data, "result...");
      } catch (err) {
        console.log(err, "error is...");
      }
    } else {
      const val = {
        ...variables,
        id: id!
        // wareClassId:
        //   wareGroupDetails && wareGroupDetails.wareClasses
        //     ? wareGroupDetails.wareClasses.id
        //     : ""
      };

      try {
        //   const { data, errors } = await updateWareGroupMutate({
        //     variables: val
        //   });
        //   console.log(data, "update ware group result");
        history.goBack();
      } catch (err) {
        console.log(val, "<===vari");

        console.log(JSON.stringify(err), "error in update ware group");
      }
    }
  });
  const ParseGroup: React.FC<{
    data: getWareGroups_getWareGroups[];
  }> = ({ data }) => {
    return null;
  };
  const ParseClass: React.FC<{ data: getWareClasses_getWareClasses[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);
    return (
      <Selector
        style={{ width: "100%" }}
        height="1.7rem"
        name="wareClassId"
        placeholder=""
        options={options}
        // value={
        //   id && wareGroupDetails
        //     ? {
        //         label: wareGroupDetails
        //           ? wareGroupDetails.wareClasses!.name
        //           : "",

        //         value: wareGroupDetails ? wareGroupDetails.wareClasses!.id : ""
        //       }
        //     : options.find(({ value }) => value === wareClassId)
        // }
        onChange={(option: SelectorOptions) => {
          setValue("wareClassIds", [option.value]);
        }}
      />
    );
  };
  const ResponseWareGroups = useWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseGroup },
    {},
    client
  ).data;
  const ResponseWareClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClass },
    {},
    client
  ).Response;

  useEffect(() => {
    register({ name: "wareClassId" });
  });
  const wareClassId = watch("wareClassIds");
  // console.log(
  //   ResponseWareGroups &&
  //     ResponseWareGroups.getWareGroups &&
  //     ResponseWareGroups.getWareGroups.find(t => t.id === id)!.wareClass!.id,
  //   "goh id"
  // );

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
                <p className="title-modaladdsubgroup">نام زیرگروه</p>
                {/* <input className="input-share" /> */}
                <Input
                  register={register}
                  size="medium"
                  name="name"
                  title=""
                  // defaultValue={
                  //   id !== "" && wareGroupDetails
                  //     ? wareGroupDetails.wareClasses!.name
                  //     : ""
                  // }
                  // value={
                  //   id !== "" && wareGroupDetails
                  //     ? wareGroupDetails.wareClass!.name
                  //     : ""
                  // }
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
                  // defaultValue={
                  //   id && wareGroupDetails
                  //     ? wareGroupDetails.wareClasses!.enName
                  //     : ""
                  // }

                  // defaultValue={wareGroupDetail ? wareGroupDetail.enName : ""}
                />
              </div>
              <div className="field-modaladdsubgroup">
                <p className="title-modaladdsubgroup">گروه مربوطه</p>
                {ResponseWareClasses}
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
                mainType="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </ModalBox>
  );
};
