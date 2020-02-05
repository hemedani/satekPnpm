export const priceWithPercent = (price: number, pricePercent: number) =>
    Math.ceil((pricePercent * price) / 100) + +price;
