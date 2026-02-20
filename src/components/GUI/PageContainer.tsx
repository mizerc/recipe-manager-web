import React from "react";
import styled from "styled-components";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
  border: 1px solid red;
`;

const Title = styled.h1`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`;

interface PageContainerProps {
  title?: React.ReactNode;
  rightButton?: React.ReactNode;
  children: React.ReactNode;
}

const PageContainer = ({
  title,
  children,
  rightButton,
}: PageContainerProps) => (
  <StyledPageContainer>
    <Header>
      <Title> {title} </Title>
      {rightButton}
    </Header>
    {children}
  </StyledPageContainer>
);

export default PageContainer;
