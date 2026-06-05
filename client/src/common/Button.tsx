import styled from "@emotion/styled";

const StyledButton = styled.button`
  width: 100%;
  height: 64px;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  background-color: #333;
  color: #fff;

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {label}
    </StyledButton>
  );
}
