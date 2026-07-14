import styled from "@emotion/styled";

interface OrderSummaryProps {
  orderAmount: number;
  shippingFee: number;
  totalAmount: number;
}

const Wrapper = styled.div`
  padding: 24px;
  margin-top: 8px;
`;

const InfoText = styled.p`
  font-family: Noto Sans;
  font-color: #0a0d13;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  padding: 13px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
`;

const Label = styled.span`
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  vertical-align: middle;
`;

const Amount = styled.span`
  font-family: Noto Sans KR;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: right;
  vertical-align: middle;
`;

export function OrderSummary({
  orderAmount,
  shippingFee,
  totalAmount,
}: OrderSummaryProps) {
  return (
    <Wrapper>
      <InfoText>
        ⓘ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </InfoText>
      <Divider />
      <Row>
        <Label>주문 금액</Label>
        <Amount>{orderAmount.toLocaleString()}원</Amount>
      </Row>
      <Row>
        <Label>배송비</Label>
        <Amount>{shippingFee.toLocaleString()}원</Amount>
      </Row>
      <Divider />
      <Row>
        <Label>총 결제 금액</Label>
        <Amount>{totalAmount.toLocaleString()}원</Amount>
      </Row>
    </Wrapper>
  );
}
