import styled from "@emotion/styled";

const HeaderWrapper = styled.header`
  background-color: #000;
  padding: 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export function Header() {
  return (
    <HeaderWrapper>
      <Title>SHOP</Title>
    </HeaderWrapper>
  );
}
