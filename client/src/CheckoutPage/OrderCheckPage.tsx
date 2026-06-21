import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../common/Header";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { Spinner } from "../common/Spinner";
import { getOrderApi, patchOrderShippingApi } from "../api/orderApi";
import type { OrderDetail } from "../types/order";

export function OrderCheckPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    getOrderApi(orderId)
      .then((data) => setOrder(data))
      .catch(() => alert("주문 정보를 불러오는 데 실패했습니다."))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <Spinner />;
  if (!order) return null;

  const typeCount = order.products.length;
  const totalQuantity = order.products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  const orderAmount = order.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const couponDiscount = 0;
  const totalAmount = orderAmount - couponDiscount + order.deliveryFee;

  async function handleRemoteAreaChange(checked: boolean) {
    const prevOrder = order;
    setOrder({
      ...order!,
      isRemoteArea: checked,
      deliveryFee: checked ? 6000 : 3000,
    });

    try {
      const { isRemoteArea, deliveryFee } = await patchOrderShippingApi(
        orderId!,
        checked,
      );
      setOrder((prev) => ({ ...prev!, isRemoteArea, deliveryFee }));
    } catch {
      setOrder(prevOrder);
      alert("배송지 정보 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <div>
      <Header onBack={() => navigate("/cart")} />

      <div>
        <h2>주문 확인</h2>
        <p>
          총 {typeCount}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
      </div>

      <div>
        {order.products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price.toLocaleString()}원</p>
            <p>{product.quantity}개</p>
          </div>
        ))}
      </div>

      <div>
        <button>쿠폰 적용</button>
      </div>

      <div>
        <h3>배송 정보</h3>
        <div>
          <Checkbox
            checked={order.isRemoteArea}
            onChange={handleRemoteAreaChange}
          />
          <span>제주도 및 도서 산간 지역</span>
        </div>
        <p>ⓘ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>

      <div>
        <div>
          <span>주문 금액</span>
          <span>{orderAmount.toLocaleString()}원</span>
        </div>
        <div>
          <span>쿠폰 할인 금액</span>
          <span>-{couponDiscount.toLocaleString()}원</span>
        </div>
        <div>
          <span>배송비</span>
          <span>{order.deliveryFee.toLocaleString()}원</span>
        </div>
        <div>
          <span>총 결제 금액</span>
          <span>{totalAmount.toLocaleString()}원</span>
        </div>
      </div>

      <Button label="결제하기" onClick={() => {}} />
    </div>
  );
}
