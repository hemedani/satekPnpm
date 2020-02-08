export const IsFastDelivery = (val: number | undefined): boolean | null => {
  switch (val) {
    case 0:
      return null;
    case 1:
      return false;
    case 2:
      return true;

    default:
      return null;
  }
};
