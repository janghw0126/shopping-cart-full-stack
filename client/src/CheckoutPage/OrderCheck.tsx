import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../common/Header";
import { Button } from "../common/Button";

interface LocationState {
  selectedCount: number;
  totalQuantity: number;
  totalAmount: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: Noto Sans KR;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  margin-bottom: 27px;
`;

const Description = styled.p`
  color: #0a0d13;
  font-family: Noto Sans;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
`;

const TotalLabel = styled.p`
  font-family: Noto Sans;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  margin-top: 24px;
`;

const TotalAmount = styled.p`
  font-family: Noto Sans KR;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
`;

const Footer = styled.div``;

export function OrderCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedCount, totalQuantity, totalAmount } = (state ?? {}) as LocationState;

  return (
    <Wrapper>
      <Header onBack={() => navigate("/cart")} />
      <Body>
        <Title>주문 확인</Title>
        <Description>
          총 {selectedCount}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Description>
        <TotalLabel>총 결제 금액</TotalLabel>
        <TotalAmount>{totalAmount?.toLocaleString()}원</TotalAmount>
      </Body>
      <Footer>
        <Button label="결제하기" disabled />
      </Footer>
    </Wrapper>
  );
}
