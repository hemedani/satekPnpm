import { Unit, Organization } from "../../entity/Site";

/**
 * @param id  id of the class inherited from site
 * @param statusType define status of the operation(pending, rejection)
 * 
 * statusType accepted values are:
 * ```
 * pendingInUnitHeadNumber,
 * rejectedByUnitHeadNumber,
 * acceptedByUnitHead
 * ```
 */
export const updateOrderStatistics = async (id: string, statusType: string) => {
    const unitStatistic = await Unit.findOne({
        where: { unitId: id }
    });
    console.log("updating");
    if (unitStatistic) {
        if (statusType === "pendingInUnitHeadNumber") {
            await Unit.update(unitStatistic.id, {
                pendingInUnitHeadNumber: () => statusType + "+1"
            });
        } else if (statusType === "rejectedByUnitHeadNumber") {
            await Unit.update(unitStatistic.id, {
                rejectedByUnitHeadNumber: () => statusType + "+1",
                pendingInUnitHeadNumber: () => "pendingInUnitHeadNumber-1"
            });
        } else if (statusType === "acceptedByUnitHead") {
            await Unit.update(unitStatistic.id, {
                pendingInUnitHeadNumber: () => "pendingInUnitHeadNumber-1"
            });
        }
    }
};
/**
 * @param id  id of the class inherited from site
 * @param statusType define status of the operation(pending, rejection)
 * 
 * statusType accepted values are:
 * ```
 * pendingInOrgHeadNumber,
 * rejectedByOrgHeadNumber,
 * acceptedByOrgHeadNumber
 * ```
 */
export const updateOrgStatistics = async (id: string, statusType: string) => {
    const orgStatistics = await Organization.findOne({
        where: { organizationId: id }
    });
    if (orgStatistics) {
        if (statusType === "pendingInOrgHeadNumber") {
            await Organization.update(orgStatistics.id, {
                pendingInOrgHeadNumber: () => statusType + "+1"
            });
        } else if (statusType === "rejectedByOrgHeadNumber") {
            await Organization.update(orgStatistics.id, {
                rejectedByOrgHeadNumber: () => statusType + "+1",
                pendingInOrgHeadNumber: () => "pendingInOrgHeadNumber-1"
            });
        } else if (statusType === "acceptedByOrgHeadNumber") {
            await Organization.update(orgStatistics.id, {
                pendingInOrgHeadNumber: () => "pendingInOrgHeadNumber-1"
            });
        } 
    }
};