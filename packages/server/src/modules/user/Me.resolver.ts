import { Args, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyArgs } from "../../types/MyArgs";
import { NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";

@Resolver()
export class MeResolver {
    @UseMiddleware(...NormalUserMiddlewares)
    @Query(() => User, { nullable: true })
    me(@Args() { user }: MyArgs): User | undefined {
        return user;
    }
}
