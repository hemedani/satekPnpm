import { ObjectType } from "type-graphql";
import { Order } from "../../../entity/Order";
import PaginatedResponse from "../../base/boards/PaginatedResponse";

@ObjectType()
export class OrdersResponse extends PaginatedResponse(Order) {}
