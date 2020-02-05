import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Thing } from "./Thing";
import { WareGroup } from "./WareGroup";
import { WareClass } from "./WareClass";
import { ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class ClassGroup extends Thing {
    @PrimaryColumn()
    wareGroupId: string;

    @ManyToOne(
        () => WareGroup,
        wareGroup => wareGroup.classGroup,
        { primary: true }
    )
    @JoinColumn({ name: "wareGroupId" })
    wareGroup: WareGroup;

    @PrimaryColumn()
    wareClassId: string;

    @ManyToOne(
        () => WareClass,
        wareClass => wareClass.classGroup,
        { primary: true }
    )
    @JoinColumn({ name: "wareClassId" })
    wareClass: WareClass;
}
