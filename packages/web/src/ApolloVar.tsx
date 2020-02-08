import {
  me,
  OrderStatus,
  FinanceCommentStatus,
  UserRole,
  ExpertCommentStatus
} from "@satek/resolvers";
import Roles from "./Roles";

export function ApolloVar(
  path: any,
  status: OrderStatus[] | null,
  meSiteId: me | undefined
) {
  const rrr = {
    organizationId:
      (path!.includes("hospital") || path!.includes("expert")) &&
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) =>
              t.role === "OrganizationHead" ||
              t.role === UserRole.FinanceHead ||
              t.role === UserRole.Expert
          )[0].site!.id
        : "",
    unitId:
      path!.includes("manager") &&
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) => t.role === "UnitHead"
          )[0].site!.id
        : path!.includes("client") &&
          meSiteId &&
          meSiteId.me &&
          meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) => t.role === "UnitEmployee"
          )[0].site!.id
        : "",
    storeId:
      path!.includes("seller") &&
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites
        ? meSiteId!.me!.userToSites!.filter(
            (t: { role: string }) => t.role === "StoreHead"
          )[0].site!.id
        : "",
    statuses: status,
    commentByExpertStatus:
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites &&
      meSiteId.me.userToSites[0].role === UserRole.Expert
        ? FinanceCommentStatus.sentNoResponse
        : null,
    commentByFinanceStatus:
      meSiteId &&
      meSiteId.me &&
      meSiteId.me.userToSites &&
      meSiteId.me.userToSites[0].role === UserRole.FinanceHead
        ? ExpertCommentStatus.sentNoResponse
        : null
  };

  return rrr;
}
