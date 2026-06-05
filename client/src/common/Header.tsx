import styled from "@emotion/styled";

interface HeaderProps {
  onBack?: () => void;
}

const HeaderWrapper = styled.header`
  background-color: #000;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export function Header({ onBack }: HeaderProps = {}) {
  return (
    <HeaderWrapper>
      {onBack ? (
        <BackButton onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
      ) : (
        <Title>SHOP</Title>
      )}
    </HeaderWrapper>
  );
}
