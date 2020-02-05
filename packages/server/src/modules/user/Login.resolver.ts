import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import {
    setVerificationToken,
    getVerificationToken,
    delVerificationToken
} from "../../utils/redis/authTokenUtils";
import { createVerificationCode } from "../../utils/createVerificationCode";
import { LoginRequestResponse, LoginResponse } from "./boards/LoginResponse";
import { LoginRequestInput, LoginInput } from "./domains/LoginInput";
import { NotRegisteredError } from "../../errors/NotRegisteredError";
import { InvalidTokenError } from "../../errors/InvalidTokenError";
import { sendPattern } from "../../services/SendSMS";
import { logger } from "../../middleware/logger";
import { jwtSign } from "../../utils/jwt";
import { User } from "../../entity/User";
import { refinePhone } from "../../utils/refinePhone";
import { NotAcitveError } from "../../errors/NotActiveError";

@Resolver()
export class LoginResolver {
    @UseMiddleware(logger)
    @Query(() => String)
    async hello() {
        //keep this Query as a memory of the first days of satek's birth.
        //even the useless await...
        return await "hello word";
    }

    @Mutation(() => LoginRequestResponse)
    async loginRequest(
        @Arg("data")
        { phone, device }: LoginRequestInput
    ): Promise<LoginRequestResponse> {
        if (process.env.NODE_ENV === "production") {
            var code = createVerificationCode();
        } else {
            var code = "111111";
        }
        phone = refinePhone(phone);
        let response: LoginRequestResponse = { ok: true, phone };
        const foundedUser = await User.findOne({ where: { phone } });
        if (!foundedUser) {
            throw new NotRegisteredError();
        }

        await setVerificationToken({ userId: foundedUser.id, device }, code);

        if (process.env.NODE_ENV === "production") {
            response.code = code;
            sendPattern({ phone, code });
        } else {
            response.code = code;
            // sendPattern({ phone, code });
        }

        return response;
    }

    @Mutation(() => LoginResponse)
    async login(@Arg("data") { phone, device, code }: LoginInput): Promise<LoginResponse> {
        phone = refinePhone(phone);
        const foundedUser = await User.findOne({ where: { phone } });
        if (!foundedUser) {
            throw new NotRegisteredError();
        }

        const authCode = await getVerificationToken({
            userId: foundedUser.id,
            device
        });
        if (authCode !== code) {
            throw new InvalidTokenError();
        }

        await delVerificationToken({ userId: foundedUser.id, device });

        if (!foundedUser.devices.includes(device)) {
            foundedUser.devices.push(device);
        }
        await foundedUser.save();

        if (!foundedUser.isActive) {
            throw new NotAcitveError();
        }
        return {
            token: jwtSign(foundedUser.id, device),
            user: foundedUser
        };
    }
}
