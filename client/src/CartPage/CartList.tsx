import type { CartItem } from "../interface/cart";
import { CartHeader } from "./CartHeader";

interface CartListProps {
  cartItems: CartItem[];
}

export function CartList({ cartItems }: CartListProps) {
  return (
    <div>
      <CartHeader itemCount={cartItems.length} />
    </div>
  );
}
