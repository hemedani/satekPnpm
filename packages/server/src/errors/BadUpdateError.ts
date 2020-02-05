import { ApolloError } from "apollo-server-core";

export class BadUpdateError extends ApolloError {
    constructor(msg: any = "") {
        super("به درستی آپدیت کنید." + msg, "BADUPDATE");

        Object.defineProperty(this, "name", { value: "BadUpdateError" });
    }
}
