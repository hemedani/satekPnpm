import { InputType, Field } from "type-graphql";
import { Store, StoreStatus } from "../../../entity/Site";
import { MaxLength } from "class-validator";

@InputType()
export class GetStoreInput implements Partial<Store> {
    @Field(() => StoreStatus, { nullable: true })
    status?: StoreStatus;

    @Field({ nullable: true })
    @MaxLength(50)
    cityId?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    stateId?: string;

    @Field({ nullable: true })
    @MaxLength(255)
    document?: string;
}
