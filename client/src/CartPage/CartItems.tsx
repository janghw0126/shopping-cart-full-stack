import type { CartItemType } from "../interface/cart";
import { CartItem } from "./CartItem";

interface CartItemsProps {
  cartItems: CartItemType[];
}

export function CartItems({ cartItems }: CartItemsProps) {
  return (
    <div>
      <div>
        <input type="checkbox" />
        <span>전체선택</span>
      </div>
      {cartItems.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
}
