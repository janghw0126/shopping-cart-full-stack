import type { CartItemType } from "../types/cart";
import { useCartSelection } from "../hooks/useCartSelection";
import { PageLayout } from "../common/PageLayout";
import { Button } from "../common/Button";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import { calcOrderSummary } from "../utils/orderSummaryUtils";

interface CartListProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
  onOrderCheck: (selectedCount: number, totalQuantity: number, totalAmount: number) => void;
}

export function CartList({
  cartItems,
  onUpdateQuantity,
  onDeleteItem,
  onOrderCheck,
}: CartListProps) {
  const { isSelected, allSelected, toggleItem, toggleAll } =
    useCartSelection(cartItems);

  const { selectedCount, totalQuantity, orderAmount, shippingFee, totalAmount } =
    calcOrderSummary(cartItems, isSelected);

  function handleOrderCheck() {
    onOrderCheck(selectedCount, totalQuantity, totalAmount);
  }

  return (
    <PageLayout footer={<Button label="주문 확인" onClick={handleOrderCheck} />}>
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
      <OrderSummary
        orderAmount={orderAmount}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
      />
    </PageLayout>
  );
}
