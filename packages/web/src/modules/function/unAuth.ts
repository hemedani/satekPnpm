import { History } from "history";

export const unAuth = (history: History) => {
  localStorage.removeItem("authTime");
  localStorage.removeItem("Token");
  // client.clearStore();
  history.push("/");
};
