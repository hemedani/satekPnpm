import React from "react";
import { WaitingConfirmation } from "./WaitingConfirmation";

export const ListWaitingConfirmation = () => {
  return (
    <div className="ListWaitingConfirmation-client">
      <div className="lits-ListWaitingConfirmation-client">
        <WaitingConfirmation />
        <WaitingConfirmation />
        <WaitingConfirmation />
      </div>
      <div className="boxButton-ListWaitingConfirmation-client">
        <button className="button-ListWaitingConfirmation-client">
          ارسال درخواست ها برای رییس واحد
        </button>
      </div>
    </div>
  );
};
