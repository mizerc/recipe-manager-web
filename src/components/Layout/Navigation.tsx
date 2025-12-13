import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${(props) => props.theme.spacing.lg};
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export const Navigation = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavList>
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
