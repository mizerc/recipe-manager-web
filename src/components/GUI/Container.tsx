import { styled } from "styled-components";

const Container = styled.div`
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

export default Container;