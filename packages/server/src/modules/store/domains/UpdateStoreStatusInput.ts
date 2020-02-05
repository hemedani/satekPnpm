import { Field, InputType } from "type-graphql";
import { Store, StoreStatus } from "../../../entity/Site";

@InputType()
export class UpdateStoreStatusInput implements Partial<Store> {
    @Field(() => StoreStatus)
    status: StoreStatus;

    @Field()
    updateStatusDescription: string;

    @Field()
    isActive: boolean;
}
