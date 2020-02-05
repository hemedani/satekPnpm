import { Field, InputType } from "type-graphql";
import { Unit } from "../../../entity/Site";

@InputType()
export class updateAllowedWareGroupsInput implements Partial<Unit> {
    @Field(() => [String])
    allowedWareGroupsIds: string[];
}
