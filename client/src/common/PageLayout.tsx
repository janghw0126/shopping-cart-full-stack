import styled from "@emotion/styled";
import { Header } from "./Header";

interface PageLayoutProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

const Footer = styled.div``;

export function PageLayout({ children, footer }: PageLayoutProps) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
}
