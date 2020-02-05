import { Resolver, FieldResolver, Root } from "type-graphql";
import { getRepository } from "typeorm";

import { ClassType } from "type-graphql";

export function baseFieldResolver<T extends ClassType, X extends ClassType>(
    entityType: X,
    returnType: T,
    fieldName: string,
    relation: string
) {
    @Resolver(entityType)
    class BaseFieldResolver {
        @FieldResolver(() => returnType, { name: fieldName })
        async field(@Root() entity: any) {
            const result = await getRepository(entityType)
                .createQueryBuilder()
                .relation(entityType, relation)
                .of(entity.id)
                .loadOne();
            return result;
        }
    }
    return BaseFieldResolver;
}
