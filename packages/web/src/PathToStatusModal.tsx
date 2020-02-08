import { OrderStatus } from "@satek/resolvers";

const PathToStatus = (path: string): OrderStatus | null => {
    switch (path) {
        case "/headofhospital/historyrequest":
        case "/departmentmanager/historyrequestdepmanager":
        case "/client/historyrequest":
        case "/seller/historyreq8uest":
        case "/admin/viewrequest":
            return null;
        case "/headofhospital/viewrequest":
            return OrderStatus.pendingInOrganizationHead;
        case "/headofhospital/paymentconfirmation":
            return OrderStatus.pendingForPay;
        case "/departmentmanager/viewrequest":
        case "/departmentmanager/checkrequestgoods/:id":
            return OrderStatus.pendingInUnitHead;
        case "/client/deliverygoods":
            return OrderStatus.sentByStore;
        case "/seller/newrequests":
            return OrderStatus.pendingInStore;
        case "/seller/unfinishedrequest":
            return OrderStatus.PreparationByStore;
        case "/expert/viewrequest":
            return OrderStatus.pendingInOrganizationHead;
        default:
            return null;
    }
};
export default PathToStatus;
