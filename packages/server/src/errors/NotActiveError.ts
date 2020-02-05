import { ApolloError } from "apollo-server-core";

export class NotAcitveError extends ApolloError {
    constructor() {
        super("حساب کاربری شما فعال نشده است با ادمین تماس بگیرید.", "NOTCONFIRMED");

        Object.defineProperty(this, "name", { value: "NotConfirmedError" });
    }
}
