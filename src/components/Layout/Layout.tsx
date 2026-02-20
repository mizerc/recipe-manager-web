import styled from 'styled-components';
import { Navigation } from './Navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  border: 1px solid blue;
`;

const Main = styled.main`
  border: 1px solid red;

  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Navigation />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

