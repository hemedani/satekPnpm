import { fieldOneBaseResolver } from "../base/fieldOneBaseResolver";
import { Order_statistic } from "../../entity/Order_statistic";
import { Unit } from "../../entity/Site";

export const suffix = "Order_statistics";
// const returnType = Order;
export const entity = Order_statistic;
// const relations = []
export const unit = fieldOneBaseResolver(entity, "Order_statistics", Unit, "rejectedByUser");