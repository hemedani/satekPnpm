import { Stuff } from "../../../entity/Stuff";
import PaginatedResponse from "../../base/boards/PaginatedResponse";

export const StuffsResponse = PaginatedResponse(Stuff);
type StuffsResponse = InstanceType<typeof StuffsResponse>;
