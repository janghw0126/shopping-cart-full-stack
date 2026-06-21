import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../common/Header";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { Spinner } from "../common/Spinner";
import {
  getOrderApi,
  patchOrderShippingApi,
  postPaymentApi,
} from "../api/orderApi";
import { CouponModal } from "./CouponModal";
import type { OrderDetail } from "../types/order";

export function OrderCheckPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    getOrderApi(orderId)
      .then((data) => {
        setOrder(data);
      })
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

  const fixedDiscount = order.coupons
    .filter((coupon) => coupon.discountType === "fixed")
    .reduce((sum, coupon) => sum + coupon.discountValue, 0);
  const buyXgetYCoupon = order.coupons.find(
    (c) => c.discountType === "buyXgetY",
  );
  const hasBuyXgetY = !!buyXgetYCoupon;
  const eligibleProducts = order.products.filter((p) => p.quantity >= 2);
  const giftProduct =
    hasBuyXgetY && eligibleProducts.length > 0
      ? eligibleProducts.reduce((max, p) => (p.price > max.price ? p : max))
      : null;
  const buyXgetYDiscount = giftProduct ? giftProduct.price : 0;
  const discountedTotal = Math.max(
    0,
    orderAmount - fixedDiscount - buyXgetYDiscount,
  );
  const percentageDiscount = order.coupons
    .filter((coupon) => coupon.discountType === "percentage")
    .reduce(
      (sum, coupon) => sum + discountedTotal * (coupon.discountValue / 100),
      0,
    );
  const shippingDiscount = order.coupons.some(
    (coupon) => coupon.discountType === "freeShipping",
  )
    ? order.deliveryFee
    : 0;
  const couponDiscount =
    fixedDiscount + buyXgetYDiscount + percentageDiscount + shippingDiscount;
  const totalAmount = Math.max(
    0,
    orderAmount + order.deliveryFee - couponDiscount,
  );

  async function handlePayment() {
    try {
      const { finalAmount } = await postPaymentApi(
        Number(orderId),
        totalAmount,
      );
      navigate("/payment/confirm", {
        state: { finalAmount, typeCount, totalQuantity },
      });
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      if (code === "PAYMENT_AMOUNT_MISMATCH") {
        alert("결제 금액이 일치하지 않습니다.");
        navigate("/cart");
      } else if (code === "EXPIRED_COUPON") {
        alert(
          "만료된 쿠폰이 포함되어 있습니다. 쿠폰 정보를 다시 확인해 주세요.",
        );
        getOrderApi(orderId!)
          .then(setOrder)
          .catch(() => alert("주문 정보를 불러오는 데 실패했습니다."));
      } else {
        alert("결제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  }

  async function handleRemoteAreaChange(checked: boolean) {
    const prevOrder = order;
    setOrder({ ...order!, isRemoteArea: checked });

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
    <Wrapper>
      <Header onBack={() => navigate("/cart")} />
      <Content>
        <TitleSection>
          <Title>주문 확인</Title>
          <Subtitle>
            총 {typeCount}종류의 상품 {totalQuantity}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </Subtitle>
        </TitleSection>

        <ProductList>
          {order.products.map((product) => (
            <ProductItem key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
                <ProductQuantity>{product.quantity}개</ProductQuantity>
              </ProductInfo>
            </ProductItem>
          ))}
        </ProductList>

        <CouponSection>
          <CouponButton onClick={() => setIsModalOpen(true)}>
            쿠폰 적용
          </CouponButton>
        </CouponSection>

        <ShippingSection>
          <SectionTitle>배송 정보</SectionTitle>
          <CheckboxRow>
            <Checkbox
              checked={order.isRemoteArea}
              onChange={handleRemoteAreaChange}
            />
            <span>제주도 및 도서 산간 지역</span>
          </CheckboxRow>
          <InfoText>
            ⓘ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </InfoText>
        </ShippingSection>

        <SummarySection>
          <Divider />
          <SummaryRow>
            <SummaryLabel>주문 금액</SummaryLabel>
            <SummaryAmount>{orderAmount.toLocaleString()}원</SummaryAmount>
          </SummaryRow>
          {giftProduct && (
            <SummaryRow>
              <SummaryLabel>증정품</SummaryLabel>
              <SummaryAmount style={{ fontSize: "14px" }}>
                {giftProduct.name} 1개 증정 ({buyXgetYCoupon?.title})
              </SummaryAmount>
            </SummaryRow>
          )}
          <SummaryRow>
            <SummaryLabel>쿠폰 할인 금액</SummaryLabel>
            <SummaryAmount>
              -
              {(
                fixedDiscount +
                buyXgetYDiscount +
                percentageDiscount
              ).toLocaleString()}
              원
            </SummaryAmount>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>배송비</SummaryLabel>
            <SummaryAmount>
              {(order.deliveryFee - shippingDiscount).toLocaleString()}원
            </SummaryAmount>
          </SummaryRow>
          <Divider />
          <SummaryRow>
            <SummaryLabel>총 결제 금액</SummaryLabel>
            <SummaryAmount>{totalAmount.toLocaleString()}원</SummaryAmount>
          </SummaryRow>
        </SummarySection>
      </Content>

      <Button label="결제하기" onClick={handlePayment} />

      {isModalOpen && (
        <CouponModal
          orderId={orderId!}
          initialSelectedIds={order.coupons.map((coupon) => coupon.id)}
          initialDiscount={couponDiscount}
          orderTotal={orderAmount}
          deliveryFee={order.deliveryFee}
          onClose={() => setIsModalOpen(false)}
          onApply={() => {
            setIsModalOpen(false);
            getOrderApi(orderId!)
              .then(setOrder)
              .catch(() => alert("주문 정보를 불러오는 데 실패했습니다."));
          }}
        />
      )}
    </Wrapper>
  );
}
