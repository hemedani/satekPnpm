import { ClassGroup } from "../../entity/ClassGroup";
import { ClassGroupInput } from "./domain/ClassGroupInput";

export const createClassGroupRelation = async (data: ClassGroupInput) =>
    await ClassGroup.create({
        ...data
    }).save();

export const updateClassGroupRelation = async (
    id: string,
    wareClassId: string,
    wareGroupId: string
) =>
    await ClassGroup.update(id, {
        wareClassId,
        wareGroupId
    });
