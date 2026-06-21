import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../common/Header";
import { Button } from "../common/Button";

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

export function PaymentConfirmPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const finalAmount = state?.finalAmount as number;

  return (
    <Wrapper>
      <Header onBack={() => navigate("/cart")} />
      <Body>
        <Title>결제 금액 확인</Title>
        <TotalLabel>총 결제 금액</TotalLabel>
        <TotalAmount>{finalAmount?.toLocaleString()}원</TotalAmount>
      </Body>
      <Button label="장바구니로 돌아가기" onClick={() => navigate("/cart")} />
    </Wrapper>
  );
}
