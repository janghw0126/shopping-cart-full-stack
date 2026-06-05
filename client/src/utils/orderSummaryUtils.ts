import type { CartItemType } from "../types/cart";

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100000;

export function calcOrderSummary(
  cartItems: CartItemType[],
  isSelected: { [id: number]: boolean },
) {
  const selectedItems = cartItems.filter((item) => isSelected[item.product.id]);
  const orderAmount = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shippingFee = orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalAmount = orderAmount + shippingFee;
  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  return {
    selectedCount: selectedItems.length,
    totalQuantity,
    orderAmount,
    shippingFee,
    totalAmount,
  };
}
