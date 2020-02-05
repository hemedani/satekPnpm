import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Manufacturer } from "../../../entity/Manufacturer";

@InputType()
export class CreateManufacturerInput implements Partial<Manufacturer> {
    @Field()
    @Length(2, 255)
    name: string;

    @Field()
    @Length(2, 255)
    enName: string;

    @Field()
    @Length(2, 255)
    country: string;
}
