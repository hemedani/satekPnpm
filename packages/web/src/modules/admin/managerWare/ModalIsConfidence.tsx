import {
  UseDeleteWareClassMutate,
  UseDeleteWareGroupMutate,
  UseDeleteWareModelMutate,
  UseDeleteWareTypeMutate
} from "@satek/hooks";
import { LongPayment } from "@satek/resolvers";
import cx from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router";
import { client } from "../../../Apollo";
import { Button } from "../../componentShare/button/Button";
import { ModalBox } from "../../componentShare/modalBox/ModalBox";
interface Props extends RouteComponentProps {
  nameButton: string;
  textCancel: string;
  messageAccept?: string;
  AcceptLinkTo?: string;
  textHeader: string;
  cancel?: boolean;
  accept?: boolean;
  functionInvoke?: () => void;
  messageNotification?: string;
  id?: string;
  orderDetails?: {
    isNewNum?: boolean;
    num?: number;
    timePayment?: LongPayment;
    stuffId?: string;
    wareId: string | undefined;
  };
}
export const ModalIsConfidence: React.FC<Props> = ({
  messageAccept,
  history,
  messageNotification,
  nameButton,
  textCancel,
  cancel,
  textHeader,
  accept,
  match: { path }
}) => {
  const { handleSubmit } = useForm();

  const { id } = useParams();
  const onSubmit = handleSubmit(async variables => {
    variables.id = id;
    variables = { variables };
    if (path.includes("typeware")) await deleteWareTypeMutate(variables);
    else if (path.includes("classware")) await deleteWareClassMutate(variables);
    else if (path.includes("groupware")) await deleteWareGroupMutate(variables);
    else if (path.includes("modelware")) await deleteWareModelMutate(variables);
    history.goBack();
  });
  const { deleteWareTypeMutate } = UseDeleteWareTypeMutate({}, client);
  const { deleteWareClassMutate } = UseDeleteWareClassMutate({}, client);
  const { deleteWareGroupMutate } = UseDeleteWareGroupMutate({}, client);
  const { deleteWareModelMutate } = UseDeleteWareModelMutate({}, client);
  return (
    <ModalBox history={history} headerName={textHeader} display="flex">
      <form className="form-container-ModalBoxSubmit" onSubmit={onSubmit}>
        <div className="containerSubmit-ModalBoxSubmit">
          <div className={cx("circle-icon-ModalBoxSubmit", {})}>
            <span
              className={cx({
                "icon-color-ModalBoxSubmit": cancel,
                ic_info: !cancel,
                // ic_info_circle: !cancel,
                ic_accept: accept,
                "icon-color-default-ModalBoxSubmit": !cancel,
                "icon-color-green-default-ModalBoxSubmit": accept
              })}
            ></span>
          </div>
          <h4
            className={cx("message-Submit-ModalBoxSubmit", {
              "message-cancel-Submit-ModalBoxSubmit": cancel,
              "message-accept-Submit-ModalBoxSubmit": accept
            })}
          >
            {messageAccept}
          </h4>
          <p className="notification-Submit-ModalBoxSubmit">
            {messageNotification}
          </p>
        </div>

        <div className="boxButton-ModalBoxSubmit">
          <Button
            text={nameButton}
            type="main"
            className="btn-ModalBoxSubmit"
            justifyContent="center"
            fontSize="0.9rem"
            // isLoading={result.loading}
            padding="0.5rem 1rem"
            mainType="submit"
          />
          <p
            onClick={() => history.goBack()}
            className="textCancel-ModalBoxSubmit"
          >
            {textCancel}
          </p>
        </div>
      </form>
    </ModalBox>
  );
};
