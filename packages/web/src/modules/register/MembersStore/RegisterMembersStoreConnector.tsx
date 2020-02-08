import React from "react";
import { RegisterMembersStoreView } from "./ui/RegisterMembersStoreView";

export const MembersStoreConnector = () => (
  <RegisterMembersStoreView submit={async () => console.log("hello")} />
);
