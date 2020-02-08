import React from "react";
import { Route } from "react-router";
import { ModalAddGroup } from "./modalBox/modalAddGroup/ModalAddGroup";
import { ModalAddSubGroup } from "./modalBox/modalAddSubGroup/ModalAddSubGroup";
import { ModalViewPermissions } from "./modalBox/modalViewPermissions/ModalViewPermissions";

export const Test = () => {
  return (
    <div>
      <Route
        exact
        path="/admin/test/viewpermissions"
        render={props => <ModalViewPermissions {...props} />}
      />
      <Route
        exact
        path="/admin/test/modaladdsubgroup"
        render={props => <ModalAddSubGroup {...props} />}
      />
      <Route
        exact
        path="/admin/test/modaladdgroup"
        render={props => <ModalAddGroup {...props} />}
      />
    </div>
  );
};
