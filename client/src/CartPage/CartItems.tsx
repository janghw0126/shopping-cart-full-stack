import type { CartItemType } from "../interface/cart";
import { CartItem } from "./CartItem";

interface CartItemsProps {
  cartItems: CartItemType[];
  isSelected: Record<number, boolean>;
  allSelected: boolean;
  onToggleItem: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function CartItems({ cartItems, isSelected, allSelected, onToggleItem, onToggleAll, onUpdateQuantity }: CartItemsProps) {

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onToggleAll(e.target.checked)}
        />
        <span>전체선택</span>
      </div>
      {cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          isSelected={isSelected[item.product.id]}
          onToggle={() => onToggleItem(item.product.id)}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
}
