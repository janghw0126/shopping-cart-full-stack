import type { CartItemType } from "../interface/cart";
import { useCartSelection } from "../hooks/useCartSelection";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";

interface CartListProps {
  cartItems: CartItemType[];
}

export function CartList({ cartItems }: CartListProps) {
  const { isSelected, allSelected, toggleItem, toggleAll } =
    useCartSelection(cartItems);

  return (
    <div>
      <CartHeader itemCount={cartItems.length} />
      <CartItems
        cartItems={cartItems}
        isSelected={isSelected}
        allSelected={allSelected}
        onToggleItem={toggleItem}
        onToggleAll={toggleAll}
      />
    </div>
  );
}
