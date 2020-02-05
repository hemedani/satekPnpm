import { MiddlewareFn } from "type-graphql";
import { UserRole } from "../entity/UserToSite";
import { AuthenticationError } from "../errors/AuthenticationError";
import { BadTokenError } from "../errors/BadTokenError";
import { MyContext } from "../types/MyContext";
import { jwtVerify } from "../utils/jwt";
// import { checkRoles } from "./authHelper";
import { AuthorizationError } from "../errors/AuthorizationError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../entity/User";
import { deactiveAuthentication, userRole_deactiveAuthentication } from "..";

export function isAuth(roles: UserRole[] = []): MiddlewareFn<MyContext> {
    return async ({ context, args }, next) => {
        const {
            headers: { token }
        } = context.req;

        if (deactiveAuthentication === true) {
            const userRepository = getCustomRepository(UserRepository);
            let user = await userRepository.findOneByRole(userRole_deactiveAuthentication);
            args.user = user;
            context.userId = user?.id;
            return next();
        }

        const userRepository = getCustomRepository(UserRepository);
        if (token && typeof token === "string") {
            const { device, id, iat } = jwtVerify(token);

            if (device && id && iat) {
                // 20 day
                const tokenAge = 60 * 60 * 24 * 20;
                if (Math.floor(Date.now() / 1000) - iat > tokenAge) {
                    throw new BadTokenError();
                }
                // let user = await checkRoles(roles, id);
                let user: User | undefined;
                if (roles[0] !== UserRole.Normal) {
                    user = await userRepository.findOneByIdAndSimilarRole(id, roles[0]);
                    console.log(user);
                } else {
                    user = await User.findOne({
                        where: { id },
                        relations: ["userToSites"]
                    });
                }

                if (!user) {
                    throw new AuthorizationError();
                }
                console.log("##############", user, user.devices, device);
                if (!user) {
                    throw new AuthorizationError();
                }
                if (user && user.devices.includes(device)) {
                    context.userId = id;
                    args.user = user;
                    return next();
                }
            }
            throw new BadTokenError();
        }

        throw new AuthenticationError();
    };
}

// if (role !== UserRole.Normal) {
//     user = await userRepository.findOneByIdAndSimilarRole(id, role);
//     console.log(user);
// } else {
//     user = await User.findOne({
//         where: { id },
//         relations: ["userToSites"]
//     });
// }

// if (!user) {
//     throw new AuthorizationError();
// }

// if (user && user.devices.includes(device)) {
//     context.userId = id;
//     args.user = user;
//     return next();
// }
// //==================================
// roles.map(async role => {
//     console.log(role, id);
//     if (role !== UserRole.Normal) {
//         user = await userRepository.findOneByIdAndSimilarRole(id, role);
//         console.log("user", user);
//     } else {
//         //check normal
//         user = await User.findOne({
//             where: { id },
//             relations: ["userToSites"]
//         });
//     }

//     if (user && user.devices.includes(device)) {
//         context.userId = id;
//         args.user = user;
//         return next();
//     }
// });
// throw new AuthorizationError();
