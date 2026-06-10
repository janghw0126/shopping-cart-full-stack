import styled from "@emotion/styled";
import type { CartItemType } from "../types/cart";
import { CartItem } from "./CartItem";
import { Checkbox } from "../common/Checkbox";

interface CartItemsProps {
  cartItems: CartItemType[];
  isSelected: { [id: number]: boolean };
  allSelected: boolean;
  onToggleItem: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
}

const Wrapper = styled.div`
  padding: 0 24px;
`;

const SelectAllRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
`;

const SelectAllLabel = styled.span`
  font-size: 12px;
`;

export function CartItems({
  cartItems,
  isSelected,
  allSelected,
  onToggleItem,
  onToggleAll,
  onUpdateQuantity,
  onDeleteItem,
}: CartItemsProps) {
  return (
    <Wrapper>
      <SelectAllRow>
        <Checkbox checked={allSelected} onChange={onToggleAll} />
        <SelectAllLabel>전체선택</SelectAllLabel>
      </SelectAllRow>
      {cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          isSelected={isSelected[item.product.id]}
          onToggle={() => onToggleItem(item.product.id)}
          onUpdateQuantity={onUpdateQuantity}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </Wrapper>
  );
}
