import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Column, BeforeInsert, Entity, OneToOne } from "typeorm";
import { City } from "./City";
import { State } from "./State";
import { Store } from "./Site";
import { BadRequestError } from "../errors/BadRequest";
import { Thing } from "./Thing";

export enum LegalPerson {
    Natural = 1,
    Juridical
}

registerEnumType(LegalPerson, {
    name: "LegalPerson",
    description: "An enum for Legal Person"
});

export enum StoreType {
    Company = 1,
    Store
}

registerEnumType(StoreType, {
    name: "StoreType",
    description: "An enum for type of store"
});

export enum Gender {
    Male = 1,
    Female
}

registerEnumType(Gender, {
    name: "Gender",
    description: "An enum for Gender"
});

@ObjectType()
@Entity()
export class StoreDetails extends Thing {
    @Field()
    @Column("varchar", { length: 255 })
    ceoSsn: string;

    @Field()
    @Column("bigint")
    mobileNumber: number;

    @Field()
    @Column()
    ceoBirthDate: Date;

    @Field(() => Gender)
    @Column({
        type: "enum",
        enum: Gender
    })
    ceoGender: Gender;

    @Column()
    ceoCityId: string;

    @Field(() => City, { nullable: true })
    ceoCity?: City;

    @Column()
    ceoStateId: string;

    @Field(() => State, { nullable: true })
    ceoState?: State;

    @Field()
    @Column("varchar", { length: 255 })
    ceoPostalCode: string;

    @Field()
    @Column("varchar", { length: 255 })
    ceoAddress: string;

    @Field()
    @Column("varchar", { length: 255 })
    ceoContact: string;

    @Field()
    @Column("varchar", { length: 255 })
    email: string;

    @Field()
    @Column("varchar", { length: 255 })
    ceoEmail: string;

    @Field()
    @Column("varchar", { length: 255 })
    cardMelliUrl: string;

    @Field()
    @Column("varchar", { length: 255 })
    ceoPhotoUrl: string;

    @Field(() => StoreType)
    @Column({
        type: "enum",
        enum: StoreType
    })
    storeType: StoreType;

    @Field()
    @Column("varchar", { length: 255 })
    economicCode: string;

    @Field()
    @Column("varchar", { length: 255 })
    postalCode: string;

    @Field()
    @Column("varchar", { length: 255 })
    lastNewspaperUrl: string;

    @Field()
    @Column("varchar", { length: 255 })
    mojavvezUrl: string;

    @Field()
    @Column("varchar", { length: 255 })
    bankCardNumber: string;

    @Field()
    @Column("varchar", { length: 255 })
    shebaNumber: string;

    @Field()
    @Column("varchar", { length: 255 })
    nameOfAccountHolder: string;

    @Field()
    @Column("varchar", { length: 255 })
    bankName: string;

    @Field()
    @Column("varchar", { length: 255 })
    certificateNumber: string;

    @Field()
    @Column()
    certificateExpireDate: Date;

    @Field(() => LegalPerson)
    @Column({
        type: "enum",
        enum: LegalPerson
    })
    legalPerson: LegalPerson;

    @Field(() => String, { nullable: true })
    @Column("varchar", { length: 255, nullable: true })
    nationalId?: string;

    @Field(() => Store, { nullable: true })
    @OneToOne(
        () => Store,
        store => store.storeDetails
    )
    store?: Store;

    @BeforeInsert()
    checkLegal() {
        if (this.storeType === StoreType.Company) {
            if (this.legalPerson !== LegalPerson.Juridical) {
                throw new BadRequestError("برای فعالیت شرکت ها و موسسات باید نوع شخصیت حقوقی باشد");
            }
            if (this.nationalId) {
                throw new BadRequestError("برای فعالیت شرکت هاو موسسات شناسه ملی باید خالی باشد");
            }
        } else {
            if (!this.nationalId) {
                throw new BadRequestError("برای فعالیت فروشگاه های مجاز شناسه ملی نباید خالی باشد");
            }
        }
    }
}
