import styled from "@emotion/styled";

interface CartHeaderProps {
  itemCount: number;
}

const Wrapper = styled.header`
  padding: 24px 24px 16px;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #0a0d13;
`;

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <Wrapper>
      <Title>장바구니</Title>
      <Subtitle>현재 {itemCount}종류의 상품이 담겨있습니다.</Subtitle>
    </Wrapper>
  );
}
