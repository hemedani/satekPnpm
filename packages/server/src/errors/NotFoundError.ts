import { ApolloError } from "apollo-server-core";

export class NotFoundError extends ApolloError {
    constructor(msg: any = "") {
        super("." + msg + " " + "پیدا نشد", "NOTFOUND");

        Object.defineProperty(this, "name", { value: "NotFoundError" });
    }
}
