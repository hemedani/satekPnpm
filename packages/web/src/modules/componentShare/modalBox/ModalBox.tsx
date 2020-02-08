import cx from "classnames";
import { History } from "history";
import React from "react";
import ScrollLock from "react-scrolllock";
interface Props {
  children: React.ReactNode;
  display: string;
  headerIcon?: string;
  headerName: string;
  modalBoxSize?: "medium" | "large";
  history?: History;
}
export const ModalBox: React.FC<Props> = ({
  children,
  display,
  headerIcon,
  headerName,
  modalBoxSize,
  history
}) => {
  const goBack = () => (history ? history.goBack() : null);
  return (
    <div className="modal">
      <div
        onClick={goBack}
        style={{ display: display }}
        className="Modal-ModalBox"
      />
      <div
        className={cx("modal-content-ModalBox", {
          [`modal-content-ModalBox-${modalBoxSize}-size`]:
            modalBoxSize !== undefined
        })}
      >
        <div className="head-ModalBox">
          <div className="headContainer-ModalBox">
            <div className="notification-head-ModalBox">
              <span className={headerIcon}></span>
              <h4 className="text-head-ModalBox">{headerName}</h4>
            </div>
            <div onClick={goBack} className="circle-box-icon-ModalBox">
              <span className="ic_reject closeIcon-ModalBox"></span>
            </div>
          </div>
        </div>
        {children}
      </div>
      <ScrollLock isActive={true} />
    </div>
  );
};
