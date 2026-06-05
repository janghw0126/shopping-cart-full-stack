import styled from "@emotion/styled";
import type { CartItemType } from "../interface/cart";
import { useCartSelection } from "../hooks/useCartSelection";
import { Header } from "../common/Header";
import { Button } from "../common/Button";
import { CartHeader } from "./CartHeader";
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import { calcOrderSummary } from "./orderSummaryUtils";

interface CartListProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
  onOrderCheck: (selectedCount: number, totalQuantity: number, totalAmount: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

const Footer = styled.div``;

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
    <Wrapper>
      <Header />
      <Content>
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
      </Content>
      <Footer>
        <Button label="주문 확인" onClick={handleOrderCheck} />
      </Footer>
    </Wrapper>
  );
}
