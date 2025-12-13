import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/GUI/PageContainer";

const Title = styled.h1`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
`;

const Toggle = styled.input.attrs({ type: "checkbox" })`
  width: 40px;
  height: 20px;
  accent-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

const FEATURES = [
  { key: "dark_mode", label: "Dark Mode" },
  { key: "email_notifications", label: "Email Notifications" },
  { key: "auto_backup", label: "Auto-Backup" },
  { key: "beta_features", label: "Enable Beta Features" },
  { key: "compact_ui", label: "Compact UI" },
  { key: "accessibility", label: "Accessibility Mode" },
];

export const SettingsPage = () => {
  // We'll store enabled states as a single object (all default false)
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    FEATURES.reduce((acc, feat) => ({ ...acc, [feat.key]: false }), {})
  );
  ``;

  const handleToggle = (key: string) => {
    setEnabled((curr) => ({ ...curr, [key]: !curr[key] }));
  };

  return (
    <PageContainer>
      <Title>Settings</Title>
      <List>
        {FEATURES.map((feature) => (
          <ListItem key={feature.key}>
            <Label>{feature.label}</Label>
            <Toggle
              checked={enabled[feature.key]}
              onChange={() => handleToggle(feature.key)}
            />
          </ListItem>
        ))}
      </List>
    </PageContainer>
  );
};
