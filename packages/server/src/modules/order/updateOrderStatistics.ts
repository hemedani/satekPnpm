import { NotFoundError } from "../../errors/NotFoundError";
import { Unit } from "../../entity/Site";
import { Order } from "../../entity/Order";
// import { OrderStatistics } from "../../entity/OrderStatistics";
// import { getConnection } from "typeorm";
// import { Order_statistic } from "../../entity/Order_statistic";

export async function unitHeadToOrgHeadStatics(order: Order) {
    const unit = await Unit.findOne(order.unitId);
    if (!unit) throw new NotFoundError("واحد");

    // const query = await getConnection().createQueryBuilder();

    // const result = query
    //     .update(Order_statistic)
    //     .set({
    //         pendingInUnitHeadNumber: () => "pendingInUnitHeadNumber - 1",
    //         pendingInOrgHeadNumber: () => "pendingInOrgHeadNumber + 1"
    //     })
    //     .where("id= :id", { id: unit.orderStatisticId })
    //     .execute();

    // return result;
    return true;
    // const result = query
    //     .update(OrderStatistics)
    //     .set({ number: () => "number + 1" })
    //     .where("id= :id", { id: unit.orderStatisticsId })
    //     .execute();
    // return result;

    // export enum IncDec {
    //     increment = 1,
    //     decrement = -1
    // }
    // export function fieldName (orderStatus:OrderStatus ){
    //     return `${orderStatus}Number`
    // }

    // return await OrderStatics.update(unit.orderStaticsId, {
    //     pendingInOrganizationHeadNumber: () => "pendingInOrganizationHeadNumber + 1"
    // });

    // const query = await getConnection()
    //     .createQueryBuilder()
    //     .update(String(Entity))
    //     .set({ [field]: "12" })
    //     .execute();
    // return query;
    // await Unit.update(order.unitId).set({ field: ()=> "field + 1"});
}
// export async function calculateOrderStatics<T extends Site>(
//     Entity: T,
//     relationId: string,
//     field: string,
//     operation: IncDec
// ) {
//     const entity = await Entity.findOne(relationId);
//     if (!entity) throw new NotFoundError("واحد");

//     const query = await getConnection()
//         .createQueryBuilder()
//         .update(String(Entity))
//         .set({ [field]: () => String(Number([field]) + operation) })
//         .execute();
//     return query
//     // await Unit.update(order.unitId).set({ field: ()=> "field + 1"});
// }
