import { DeliveryTime } from "@satek/resolvers";

const Deliver = (deliveryTime: DeliveryTime) => {
  const {
    OneDay,
    TwoDay,
    ThreeDay,
    fourDay,
    fiveDay,
    sixDay,
    sevenDay,
    eightDay,
    nineDay,
    tenDay
  } = DeliveryTime;
  switch (deliveryTime) {
    case OneDay:
      return "تحویل تا یک روز بعد از درخواست";
    case TwoDay:
      return "تحویل تا دو روز بعد از درخواست";
    case ThreeDay:
      return "تحویل تا سه روز بعد از درخواست";
    case fourDay:
      return "تحویل تا چهار روز بعد از درخواست";
    case fiveDay:
      return "تحویل تا پنج روز بعد از درخواست";
    case sixDay:
      return "تحویل تا شش روز بعد از درخواست";
    case sevenDay:
      return "تحویل تا هفت روز بعد از درخواست";
    case eightDay:
      return "تحویل تا هشت روز بعد از درخواست";
    case nineDay:
      return "تحویل تا نه روز بعد از درخواست";
    case tenDay:
      return "تحویل تا ده روز بعد از درخواست";

    default:
      break;
  }
};
export default Deliver;
