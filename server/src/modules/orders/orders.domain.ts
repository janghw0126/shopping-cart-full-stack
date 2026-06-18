import type { CartItem, Coupon } from "@/type";

export const selectTopTwoCoupons = (
  _coupons: Coupon[],
  _cartItems: CartItem[],
  _orderTotal: number,
  _deliveryFee: number,
  _now: Date = new Date(),
): Coupon[] => {
  throw new Error("구현 필요");
};
