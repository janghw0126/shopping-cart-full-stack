import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid #e0e0e0;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export function Spinner() {
  return (
    <Wrapper>
      <Circle />
    </Wrapper>
  );
}
