import type { CartItemType } from "../interface/cart";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";

interface CartListProps {
  cartItems: CartItemType[];
}

export function CartList({ cartItems }: CartListProps) {
  return (
    <div>
      <CartHeader itemCount={cartItems.length} />
      <CartItems cartItems={cartItems} />
    </div>
  );
}
