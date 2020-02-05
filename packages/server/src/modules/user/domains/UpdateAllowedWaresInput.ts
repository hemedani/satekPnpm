import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";

@InputType()
export class UpdateAllowedWaresInput implements Partial<User> {
    @Field(() => [String])
    allowedWaresIds: string[];
}
