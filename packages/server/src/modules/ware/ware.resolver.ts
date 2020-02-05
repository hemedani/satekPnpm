import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { Manufacturer } from "../../entity/Manufacturer";
import { Ware } from "../../entity/Ware";
import { BadCreateError } from "../../errors/BadCreateError";
import { BadUpdateError } from "../../errors/BadUpdateError";
import { NotFoundError } from "../../errors/NotFoundError";
import { MasterMiddlewares, NormalUserMiddlewares } from "../../utils/CommonMiddlewareList";
import {
    createResolverName,
    getAllResolverName,
    updateResolverName
} from "../../utils/nameOfResolvers";
import { PaginationInput } from "../base/domains/PaginationInput";
import { defaultMiddleWares } from "../base/shared/defaultMiddleWares";
import { CreateWareInput } from "./domains/CreateWareInput";
import { WareInput } from "./domains/WareInput";
import { suffix } from "./InheritedWare.resolver";
import { User } from "../../entity/User";

@Resolver(() => Ware)
export class WareResovler {
    @Mutation(() => Ware, { name: createResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async createWare(@Arg("data") createWareInput: CreateWareInput) {
        const manufacturer = await Manufacturer.findOne(createWareInput.manufacturerId);
        if (!manufacturer) {
            throw new NotFoundError();
        }
        try {
            return await Ware.create({
                ...createWareInput,
                manufacturername: manufacturer.name
            }).save();
        } catch {
            throw new BadCreateError();
        }
    }

    @Mutation(() => Ware, { name: updateResolverName(suffix) })
    @UseMiddleware(...defaultMiddleWares(), ...MasterMiddlewares)
    async updateWare(@Arg("id") id: string, @Arg("data") createWareInput: CreateWareInput) {
        const manufacturer = await Manufacturer.findOne(createWareInput.manufacturerId);
        if (!manufacturer) {
            throw new NotFoundError();
        }
        try {
            await Ware.update(id, {
                ...createWareInput,
                manufacturername: manufacturer.name
            });
        } catch {
            throw new BadUpdateError();
        }
        const ware = await Ware.findOne(id);
        if (!ware) {
            throw new NotFoundError();
        }
        return ware;
    }

    @Query(() => [Ware], { name: getAllResolverName(suffix), nullable: true })
    @UseMiddleware(...defaultMiddleWares(), ...NormalUserMiddlewares)
    async getWares(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data") wareInput: WareInput
    ) {
        // After we add first "where" to our query, firstWhereAdded must change to true
        let query: any;
        query = getRepository(Ware).createQueryBuilder("ware");

        if (wareInput && wareInput.userId) {
            const user = await User.findOne(wareInput.userId);
            if (user && user.allowedWaresIds) {
                query.andWhere("ware.id IN (:...AllowedWares)", {
                    AllowedWares: user.allowedWaresIds
                });
            } else {
                return null;
            }
        }
        if (wareInput && wareInput.wareModelId) {
            query.andWhere("ware.wareModelId = :wareModelId", {
                wareModelId: wareInput.wareModelId
            });
        } else if (wareInput && wareInput.wareGroupId) {
            query.andWhere("ware.wareGroupId = :wareGroupId", {
                wareGroupId: wareInput.wareGroupId
            });
        } else if (wareInput && wareInput.wareClassId) {
            query.andWhere("ware.wareClassId = :wareClassId", {
                wareClassId: wareInput.wareClassId
            });
        } else if (wareInput && wareInput.wareTypeId) {
            query.andWhere("ware.wareTypeId = :wareTypeId", {
                wareTypeId: wareInput.wareTypeId
            });
        }

        if (wareInput && wareInput.document) {
            // If document exist
            query = query.andWhere("ware.document @@ plainto_tsquery(:query)", {
                query: wareInput.document
            });
        }

        // Pagination stuffs
        query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);

        return await query.getMany();
    }
}
