import React, { useState } from "react";
import styled from "styled-components";
import { ChevronRight, ChevronDown } from "react-feather";
import {
  display,
  flexDirection,
  fontStyle,
  backgroundColor,
  padding
} from "styled-system";
import { StyleProps } from "../../types";

const Container = styled.div<StyleProps>`
  ${display}
  ${flexDirection}
  padding-bottom: 10px;
`;

const Header = styled.div<StyleProps>`
  ${display}
  ${padding}
  ${backgroundColor}
  cursor: pointer;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 3px;
`;

const LabelContainer = styled.div`
  display: flex;
  margin-left: 5px;
  align-items: center;
`;

const Label = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const IconContainer = styled.div`
  margin-right: 3px;
  display: flex;
  justify-content: center;
`;

interface Props {
  label: string;
  CategoryIcon: any;
  children: any;
}

export default function Section({ CategoryIcon, label, children }: Props) {
  const [isExpanded, setExpanded] = useState(true);
  const Icon = isExpanded ? ChevronDown : ChevronRight;

  const handleHeaderClick = () => setExpanded(!isExpanded);

  return (
    <Container display="flex" flexDirection="column">
      <Header
        display="flex"
        backgroundColor="sectionHeader"
        padding="1"
        onClick={handleHeaderClick}
      >
        <Icon size={12} />
        <LabelContainer>
          <IconContainer>
            <CategoryIcon size={12} />
          </IconContainer>
          <Label>{label}</Label>
        </LabelContainer>
      </Header>
      {isExpanded && children}
    </Container>
  );
}
