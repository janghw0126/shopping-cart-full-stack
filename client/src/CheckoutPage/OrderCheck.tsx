import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "../common/Header";
import { Button } from "../common/Button";
import { Spinner } from "../common/Spinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  flex: 1;
  padding: 24px;
`;

const Footer = styled.div``;

export function OrderCheck() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  if (!orderId) return <Spinner />;

  return (
    <Wrapper>
      <Header onBack={() => navigate("/cart")} />
      <Body></Body>
      <Footer>
        <Button label="결제하기" />
      </Footer>
    </Wrapper>
  );
}
