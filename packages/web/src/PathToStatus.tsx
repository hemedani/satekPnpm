import { OrderStatus } from "@satek/resolvers";

const PathToStatus = (path: string): OrderStatus[] | null => {
  switch (path) {
    case "/headofhospital/historyrequest":
    case "/departmentmanager/historyrequestdepmanager":
    case "/client/historyrequest":
    case "/seller/historyrequest":
    case "/admin/viewrequest":
      return null;
    case "/headofhospital/viewrequest/:idfilter?":
      return [OrderStatus.pendingInOrganizationHead];
    case "/headofhospital/viewrequest":
      return [OrderStatus.pendingInOrganizationHead];
    case "/headofhospital/paymentconfirmation":
      return [OrderStatus.pendingForPay];
    case "/headofhospital/checkrequestgood/:id?/modalboxinquiry":
      return [OrderStatus.pendingInOrganizationHead];
    case "/departmentmanager/viewrequest":
    case "/departmentmanager/checkrequestgoods/:id":
      return [OrderStatus.pendingInUnitHead];
    case "/client/deliverygoods":
      return [OrderStatus.sentByStore];
    case "/seller/newrequests":
      return [OrderStatus.pendingInStore];
    case "/seller/unfinishedrequest":
      return [OrderStatus.PreparationByStore, OrderStatus.sentByStore];
    case "/expert/viewrequest":
      return null;
    default:
      return null;
  }
};
export default PathToStatus;
