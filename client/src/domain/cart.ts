export const CART_QUANTITY = { MIN: 1, MAX: 99 } as const;

export function canDecrease(quantity: number) {
  return quantity > CART_QUANTITY.MIN;
}

export function canIncrease(quantity: number) {
  return quantity < CART_QUANTITY.MAX;
}
