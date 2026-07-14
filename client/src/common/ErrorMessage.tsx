import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Message = styled.p`
  color: #d32f2f;
  font-size: 16px;
`;

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
}
