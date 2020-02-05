import { WareGroup } from "../../entity/WareGroup";
import { Resolver, Query, UseMiddleware, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { NormalUserMiddlewares, MasterMiddlewares } from "../../utils/CommonMiddlewareList";
import { createQueryBuilder } from "typeorm";
import { PaginationInput } from "../base/domains/PaginationInput";
import { GetWareGroupInput } from "./domains/GetWareGroupInput";
import { BadCreateError } from "../../errors/BadCreateError";
import { WareClass } from "../../entity/WareClass";
import { createClassGroupRelation } from "../classGroup/ClassGroup.resolver";
import { CreateWareGroupInput } from "./domains/CreateWareGroupInput";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { NotFoundError } from "../../errors/NotFoundError";
import { UpdateWareGroupInput } from "./domains/UpdateWareGroupInput";

@Resolver(() => WareGroup)
export class WareGroupResolver {
    @Mutation(() => WareGroup)
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async createWareGroup(@Arg("data") wareGroupInput: CreateWareGroupInput) {
        try {
            const wareGroup = await WareGroup.create({
                ...wareGroupInput
            }).save();

            //TODO : Make a better solution ,When we want to make an array of ClassIds related with wareGroups if possible
            await Promise.all(
                wareGroupInput.wareClassIds.map(wareClassId =>
                    createClassGroupRelation({ wareClassId, wareGroupId: wareGroup.id })
                )
            );
            return wareGroup;
        } catch {
            throw new BadCreateError();
        }
    }

    @Mutation(() => WareGroup)
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async updateWareGroup(
        @Arg("data") updateWareGroupInput: UpdateWareGroupInput,
        @Arg("id") id: string
    ) {
        const createdGroup = await WareGroup.findOne(id);
        if (!createdGroup) {
            throw new NotFoundError();
        }
        try {
            const wareGroup = await WareGroup.update(id, {
                name: updateWareGroupInput.name ? updateWareGroupInput.name : createdGroup.name,
                enName: updateWareGroupInput.enName
                    ? updateWareGroupInput.name
                    : createdGroup.enName,
                wareTypeId: updateWareGroupInput.wareTypeId
                    ? updateWareGroupInput.wareTypeId
                    : createdGroup.wareTypeId
            });

            //TODO : Make a better solution ,When we want to make an array of ClassIds related with wareGroups if possible
            // if (updateWareGroupInput.wareClassIds) {
            //     await Promise.all(
            //         updateWareGroupInput.wareClassIds.map(wareClassId =>
            //             updateClassGroupRelation(id, wareClassId, wareGroupId: id )
            //         )
            //     );
            // }
            return wareGroup;
        } catch (err) {
            throw new BadUpdateError(err);
        }
    }

    @Query(() => [WareGroup])
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getWareGroups(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true })
        wareGroupInput: GetWareGroupInput
    ) {
        const query = createQueryBuilder("WareGroup");
        //wareGroups of a wareClass
        if (wareGroupInput && wareGroupInput.wareTypeId) {
            query.where("WareGroup.wareTypeId = :wareTypeId", {
                wareTypeId: wareGroupInput.wareTypeId
            });
        } else if (wareGroupInput && wareGroupInput.wareClassId) {
            query.innerJoin("class_group", "classGroup", "classGroup.wareGroupId = WareGroup.id");
            query.innerJoin("ware_class", "wareClass", "wareClass.id = :wareClassId", {
                wareClassId: wareGroupInput.wareClassId
            });
        }
        if (wareGroupInput && wareGroupInput.document) {
            query.where("WareGroup.document @@plainto_tsquery(:document)", {
                document: wareGroupInput.document
            });
        }
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);
        return await query.getMany();
    }

    @FieldResolver(() => [WareClass])
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async wareClasses(@Root() group: WareGroup) {
        return await createQueryBuilder("WareClass")
            .innerJoin("class_group", "classGroup", "classGroup.wareClassId = WareClass.id")
            .innerJoin("ware_group", "wareGroup", "wareGroup.id = :wareGroupId", {
                wareGroupId: group.id
            })
            .getMany();
    }
}
