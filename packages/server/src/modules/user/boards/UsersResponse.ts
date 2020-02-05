import { ObjectType } from "type-graphql";
import { User } from "../../../entity/User";
import PaginatedResponse from "../../base/boards/PaginatedResponse";

@ObjectType()
export class UsersResponse extends PaginatedResponse(User) {}
