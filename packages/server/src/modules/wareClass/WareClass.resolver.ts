import { Resolver, Query, UseMiddleware, Arg, FieldResolver, Root, Mutation } from "type-graphql";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { NormalUserMiddlewares, MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createQueryBuilder } from "typeorm";
import { PaginationInput } from "../base/domains/PaginationInput";
import { WareClass } from "../../entity/WareClass";
import { GetWareClassInput } from "./domains/GetWareClassInput";
import { WareGroup } from "../../entity/WareGroup";
import { CreateWareClassInput } from "./domains/CreateWareClassInput";
import { BadCreateError } from "../../errors/BadCreateError";

@Resolver(() => WareClass)
export class WareClassResolver {
    @Mutation(() => WareClass)
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async createWareClass(@Arg("data") createWareClassInput: CreateWareClassInput) {
        try {
            return await WareClass.create({
                ...createWareClassInput
            }).save();
        } catch {
            throw new BadCreateError();
        }
    }
    @Query(() => [WareClass])
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getWareClasses(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true })
        wareClassInput: GetWareClassInput
    ) {
        const query = createQueryBuilder("WareClass");
        if (wareClassInput && wareClassInput.document) {
            query.where("WareClass.document @@plainto_tsquery(:document)", {
                document: wareClassInput.document
            });
        }
        if (wareClassInput && wareClassInput.wareGroupId) {
            //wareClasses of a wareGroup
            query
                .innerJoin("class_group", "classGroup", "classGroup.wareClassId = WareClass.id")
                .innerJoin("ware_group", "wareGroup", "wareGroup.id = :wareGroupId", {
                    wareGroupId: wareClassInput.wareGroupId
                });
        } else if (wareClassInput && wareClassInput.wareTypeId) {
            //wareClasses of a wareType
            query.where("WareClass.wareTypeId = :wareTypeId", {
                wareTypeId: wareClassInput.wareTypeId
            });
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return await query.getMany();
    }
    @FieldResolver(() => [WareGroup])
    async wareGroups(@Root() Class: WareClass) {
        return await createQueryBuilder("WareGroup")
            .innerJoin("class_group", "classGroup", "classGroup.wareGroupId = WareGroup.id")
            .innerJoin("ware_class", "wareClass", "wareClass.id = :wareClassId", {
                wareClassId: Class.id
            })
            .getMany();
    }
}
