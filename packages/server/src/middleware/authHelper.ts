import { UserRole } from "../entity/UserToSite";
import { User } from "../entity/User";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
// import { BadRequestError } from "../../errors/BadRequest";

const userRepository = getCustomRepository(UserRepository);

const mapFunc = (role: UserRole, userId: string) =>
    role === UserRole.Normal
        ? User.findOne({
              where: { userId },
              relations: ["userToSites"]
          })
        : userRepository.findOneByIdAndSimilarRole(role, userId);

export const checkRoles = async (roles: UserRole[], userId: string): Promise<any> => {
    console.log(roles, userId);
    const promises = roles.map(async role => mapFunc(role, userId));
    const users = await Promise.all(promises);
    return users[0];
};

//===================================
// export const checkRole = async (roles: UserRole[], userId: string): Promise<User | undefined> => {
//     // let user: Promise<User | undefined>;

//     // const getUser = async (role: UserRole): Promise<User | undefined> => {
//     //     // console.log(role, userId);
//     //     // if (role !== UserRole.Normal) {
//     //     //     return userRepository.findOneByIdAndSimilarRole(userId, role);
//     //     // } else {
//     //     //     //check normal
//     //     //     return User.findOne({
//     //     //         where: { userId },
//     //     //         relations: ["userToSites"]
//     //     //     });
//     //     // }
//     //     try {
//     //         return role === UserRole.Normal
//     //         ? await User.findOne(userId)
//     //         : await userRepository.findOneByIdAndSimilarRole(userId, role);
//     //     } catch (error) {
//     //         throw new AuthenticationError();

//     //     }

//     // };
//     // const mapFunc = (roles: UserRole[]) => getUser(role));
//     // try {
//     //     return mapFunc(roles)
//     // } catch (error) {
//     //     throw new AuthenticationError();
//     // }

//     roles.includes(UserRole.Normal) ? await User.findOne(userId) : ;
//     // return Promise.all(mapFunc(roles)).catch(err => console.log(err));
// };
