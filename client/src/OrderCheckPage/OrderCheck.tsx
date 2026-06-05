interface OrderCheckProps {
  selectedCount: number;
  totalQuantity: number;
  totalAmount: number;
  onBack: () => void;
}

export function OrderCheck({ selectedCount, totalQuantity, totalAmount, onBack }: OrderCheckProps) {
  return (
    <div>
      <button onClick={onBack}>←</button>
      <h2>주문 확인</h2>
      <p>
        총 {selectedCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </p>
      <p>최종 결제 금액을 확인해 주세요.</p>
      <div>
        <span>총 결제 금액</span>
        <span>{totalAmount.toLocaleString()}원</span>
      </div>
      <button disabled>결제하기</button>
    </div>
  );
}
