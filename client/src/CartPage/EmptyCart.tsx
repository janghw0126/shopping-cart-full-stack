import styled from "@emotion/styled";
import { PageLayout } from "../common/PageLayout";
import { Button } from "../common/Button";

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 24px;
`;

const Message = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0d13;
`;

export function EmptyCart() {
  return (
    <PageLayout footer={<Button label="주문 확인" disabled />}>
      <Heading>장바구니</Heading>
      <Message>장바구니에 담은 상품이 없습니다.</Message>
    </PageLayout>
  );
}
