import type { CartItemType } from "../interface/cart";
import { useCartSelection } from "../hooks/useCartSelection";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";

interface CartListProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
}

export function CartList({
  cartItems,
  onUpdateQuantity,
  onDeleteItem,
}: CartListProps) {
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
        onUpdateQuantity={onUpdateQuantity}
        onDeleteItem={onDeleteItem}
      />
      <OrderSummary cartItems={cartItems} isSelected={isSelected} />
    </div>
  );
}
