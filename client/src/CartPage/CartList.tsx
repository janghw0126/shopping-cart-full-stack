import type { CartItemType, OrderCheckInfo } from "../types/cart";
import { useCartSelection } from "../hooks/useCartSelection";
import { PageLayout } from "../common/PageLayout";
import { Button } from "../common/Button";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import { calcOrderSummary } from "../utils/orderSummaryUtils";
import { CART_QUANTITY } from "../domain/cart";

interface CartListProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
  onOrderCheck: (info: OrderCheckInfo) => void;
}

export function CartList({
  cartItems,
  onUpdateQuantity,
  onDeleteItem,
  onOrderCheck,
}: CartListProps) {
  const { isSelected, allSelected, toggleItem, toggleAll } =
    useCartSelection(cartItems);

  const {
    selectedCount,
    totalQuantity,
    orderAmount,
    shippingFee,
    totalAmount,
  } = calcOrderSummary(cartItems, isSelected);

  function handleOrderCheck() {
    onOrderCheck({ selectedCount, totalQuantity, totalAmount });
  }

  return (
    <PageLayout
      footer={<Button label="주문 확인" onClick={handleOrderCheck} />}
    >
      <CartHeader itemCount={cartItems.length} />
      <CartItems
        cartItems={cartItems}
        isSelected={isSelected}
        allSelected={allSelected}
        onToggleItem={toggleItem}
        onToggleAll={toggleAll}
        onUpdateQuantity={(productId, quantity) => {
          if (quantity < CART_QUANTITY.MIN) {
            alert(`최소 ${CART_QUANTITY.MIN}개까지 가능합니다.`);
            return;
          }
          if (quantity > CART_QUANTITY.MAX) {
            alert(`최대 ${CART_QUANTITY.MAX}개까지 가능합니다.`);
            return;
          }
          onUpdateQuantity(productId, quantity);
        }}
        onDeleteItem={(productId) => {
          const item = cartItems.find((i) => i.product.id === productId);
          if (confirm(`'${item?.product.name}'을(를) 삭제하시겠습니까?`)) {
            onDeleteItem(productId);
          }
        }}
      />
      <OrderSummary
        orderAmount={orderAmount}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
      />
    </PageLayout>
  );
}
