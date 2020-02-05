import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { hashPassword } from "../../utils/hash";
import { RegisterInput } from "./domains/RegisterInput";
import { refinePhone } from "../../utils/refinePhone";
import { UserToSite, UserRole } from "../../entity/UserToSite";
import { BadCreateError } from "../../errors/BadCreateError";
import { AdminMiddlewares } from "../../utils/CommonMiddlewareList";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";

@Resolver()
export class RegisterResolver {
    @Mutation(() => User)
    @UseMiddleware(...defaultMiddleWares(), ...AdminMiddlewares)
    async registerStaff(@Arg("data") registerInput: RegisterInput) {
        if (registerInput.password)
            registerInput.password = await hashPassword(registerInput.password);
        let { photoUrl, firstName, lastName, ssn, phoneNumber, password } = registerInput;
        phoneNumber = refinePhone(phoneNumber);
        const phone = Number(phoneNumber);

        const user = await User.create({
            photoUrl,
            firstName,
            lastName,
            ssn,
            phone,
            password,
            devices: [],
            isActive: true
        }).save();

        // TODO: Send a success and notify message(sms) to user
        if (registerInput && registerInput.organizationId)
            try {
                return await UserToSite.create({
                    siteId: registerInput.organizationId,
                    userId: user.id
                }).save();
            } catch {
                throw new BadCreateError();
            }
        return user;
    }
}

// this function is called within store.resolver
const registerStoreHead = async (registerInput: RegisterInput) => {
    if (registerInput.password) registerInput.password = await hashPassword(registerInput.password);
    let { photoUrl, firstName, lastName, ssn, phoneNumber, password } = registerInput;
    phoneNumber = refinePhone(phoneNumber);
    const phone = Number(phoneNumber);

    const user = await User.create({
        photoUrl,
        firstName,
        lastName,
        ssn,
        phone,
        password,
        devices: [],
        isActive: false
    }).save();

    // TODO: Send a success and notify message(sms) to user
    if (registerInput && registerInput.organizationId)
        try {
            return await UserToSite.create({
                siteId: registerInput.organizationId,
                userId: user.id,
                role: UserRole.StoreHead
            }).save();
        } catch {
            throw new BadCreateError();
        }
    return user;
};
export { registerStoreHead };
