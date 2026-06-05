import type { CartItemType } from "../interface/cart";

interface OrderSummaryProps {
  cartItems: CartItemType[];
  isSelected: { [id: number]: boolean };
}

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100000;

export function OrderSummary({ cartItems, isSelected }: OrderSummaryProps) {
  const orderAmount = cartItems
    .filter((item) => isSelected[item.product.id])
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  const shippingFee = orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalAmount = orderAmount + shippingFee;

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
      <button>주문 확인</button>
    </div>
  );
}
