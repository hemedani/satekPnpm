import { WorkingShift } from "@satek/resolvers";

const Working = (deliveryTime: WorkingShift) => {
  const { AllDayLong, Morning, MorningAndAfternoon } = WorkingShift;
  switch (deliveryTime) {
    case Morning:
      return 0;
    case MorningAndAfternoon:
      return 1;
    case AllDayLong:
      return 2;
    default:
      break;
  }
};
export default Working;
