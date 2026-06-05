import type { CartItemType } from "../interface/cart";

interface OrderSummaryProps {
  cartItems: CartItemType[];
  isSelected: { [id: number]: boolean };
  onOrderCheck: (selectedCount: number, totalQuantity: number, totalAmount: number) => void;
}

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100000;

export function OrderSummary({ cartItems, isSelected, onOrderCheck }: OrderSummaryProps) {
  const selectedItems = cartItems.filter((item) => isSelected[item.product.id]);
  const orderAmount = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shippingFee = orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalAmount = orderAmount + shippingFee;

  function handleOrderCheck() {
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    onOrderCheck(selectedItems.length, totalQuantity, totalAmount);
  }

  return (
    <div>
      <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      <div>
        <span>주문 금액</span>
        <span>{orderAmount.toLocaleString()}원</span>
      </div>
      <div>
        <span>배송비</span>
        <span>{shippingFee.toLocaleString()}원</span>
      </div>
      <div>
        <span>총 결제 금액</span>
        <span>{totalAmount.toLocaleString()}원</span>
      </div>
      <button onClick={handleOrderCheck}>주문 확인</button>
    </div>
  );
}
