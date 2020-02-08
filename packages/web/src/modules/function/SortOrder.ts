import { OrderSort } from "@satek/resolvers";

export const SortOrder = (val: number | undefined): OrderSort | null => {
  switch (val) {
    case 0:
      return OrderSort.Price_Asd;
    case 1:
      return OrderSort.CreatedAt_Asd;
    case 2:
      return OrderSort.Delivery_Asd;

    default:
      return null;
  }
};
