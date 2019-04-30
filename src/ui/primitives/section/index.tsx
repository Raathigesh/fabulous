import React, { useState } from "react";
import styled from "styled-components";
import { ChevronRight, ChevronDown } from "react-feather";
import { display, flexDirection } from "styled-system";
import { StyleProps } from "../../types";

const Container = styled.div<StyleProps>`
  ${display}
  ${flexDirection}
  padding-bottom: 10px;
`;

const Header = styled.div<StyleProps>`
  ${display}
  cursor: pointer;
  align-items: center;
  padding-bottom: 10px;
`;

interface Props {
  label: string;
  children: any;
}

export default function Section({ label, children }: Props) {
  const [isExpanded, setExpanded] = useState(true);
  const Icon = isExpanded ? ChevronDown : ChevronRight;

  const handleHeaderClick = () => setExpanded(!isExpanded);

  return (
    <Container display="flex" flexDirection="column">
      <Header display="flex" onClick={handleHeaderClick}>
        <Icon size={12} /> {label}
      </Header>
      {isExpanded && children}
    </Container>
  );
}
