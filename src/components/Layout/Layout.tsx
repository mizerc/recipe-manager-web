import styled from 'styled-components';
import { Navigation } from './Navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.border};
  
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

