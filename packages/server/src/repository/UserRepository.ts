import { EntityRepository, AbstractRepository } from "typeorm";

import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
    findOneByIdAndSimilarRole(userId: string, role: string) {
        return this.createQueryBuilder("user")
            .innerJoinAndSelect(
                "user.userToSites",
                "userToSite",
                "user.id = :userId",
                {
                    userId
                }
            )
            .where("userToSite.role LIKE :role", { role: `%${role}%` })
            .getOne();
    }

    findOneByIdAndRole(userId: string, role: string) {
        return this.createQueryBuilder("user")
            .innerJoinAndSelect(
                "user.userToSites",
                "userToSite",
                "user.id = :userId",
                {
                    userId
                }
            )
            .where("userToSite.role = :role", { role })
            .getOne();
    }

    findOneByRole(role: string) {
        return this.createQueryBuilder("user")
            .innerJoinAndSelect(
                "user.userToSites",
                "userToSite"
            )
            .where("userToSite.role = :role", { role })
            .getOne();
    }
}
