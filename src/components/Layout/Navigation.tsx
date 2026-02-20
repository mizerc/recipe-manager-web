import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const TitleText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${(props) => props.theme.spacing.lg};

  & > li:first-child {
    margin-top: -6px;
    margin-right: ${(props) => props.theme.spacing.xl};
  }
`;

const NavItem = styled.li`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled(Link)<{ $propsActive?: boolean }>`
  text-decoration: none;
  color: ${(props) =>
    props.$propsActive ? props.theme.colors.primary : props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:hover {
    color: ${(props) => props.theme.colors.textLight};
  }

  &:active {
    color: ${(props) => props.theme.colors.textDark};
  }
`;

export const Navigation = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavList>
        <NavItem>
          <TitleText>Foods</TitleText>
        </NavItem>
        <NavItem>
          <NavLink to="/" $active={location.pathname === "/"}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/foods" $active={location.pathname === "/foods"}>
            Foods
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/recipes" $active={location.pathname === "/recipes"}>
            Recipes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings" $active={location.pathname === "/settings"}>
            Settings
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};
