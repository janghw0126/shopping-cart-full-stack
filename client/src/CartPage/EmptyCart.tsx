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
  padding: 24px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Message = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0d13;
`;

const Footer = styled.div`
  padding: 0;
`;

export function EmptyCart() {
  return (
    <Wrapper>
      <Header />
      <Body>
        <Heading>장바구니</Heading>
        <Message>장바구니에 담은 상품이 없습니다.</Message>
      </Body>
      <Footer>
        <Button label="주문 확인" disabled />
      </Footer>
    </Wrapper>
  );
}
