import { ArrayMaxSize, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";

@InputType()
export class UpdateUserInput implements Partial<User> {
    @Field(() => [String], { nullable: true })
    @ArrayMaxSize(20, {
        message: "حداکثر تعداد کالا های مورد علاقه بیست می باشد."
    })
    favoriteWaresIds?: string[];

    @Field({ nullable: true })
    @Length(6, 255)
    password?: string;

    @Field({ nullable: true })
    photoUrl?: string;

    @Field({ nullable: true })
    isActive?: boolean;
}
