import { FastDeliveryTime } from "@satek/resolvers";

export const ConvertFastDeliverTime = (val: number): FastDeliveryTime => {
  switch (val) {
    case 0:
      return FastDeliveryTime.OneHour;
    case 1:
      return FastDeliveryTime.TwoHour;
    case 2:
      return FastDeliveryTime.ThreeHour;
    case 3:
      return FastDeliveryTime.FourHour;
    case 4:
      return FastDeliveryTime.FiveHour;
    default:
      return FastDeliveryTime.FiveHour;
  }
};

export const ConvertFastDeliverToHour = (val: FastDeliveryTime): string => {
  switch (val) {
    case FastDeliveryTime.OneHour:
      return "1 ساعت";
    case FastDeliveryTime.TwoHour:
      return "2 ساعت";
    case FastDeliveryTime.ThreeHour:
      return "3 ساعت";
    case FastDeliveryTime.FourHour:
      return "4 ساعت";
    case FastDeliveryTime.FiveHour:
      return "5 ساعت";
    default:
      return "";
  }
};
