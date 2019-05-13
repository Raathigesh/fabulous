import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import { Tooltip } from "react-tippy";

interface ContainerProps {
  isActive: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: 5px;
  cursor: pointer;
  background-color: ${props =>
    props.isActive
      ? themeGet("colors.iconHover")
      : themeGet("colors.iconBackground")};
  &:hover {
    background-color: ${themeGet("colors.iconHover")};
  }
`;

interface Props {
  children: any;
  isActive: boolean;
  tooltip: string;
  onClick: () => void;
}

export default function BorderToggle({
  isActive,
  tooltip,
  children,
  onClick
}: Props) {
  return (
    <Tooltip title={tooltip} position="top" size="small">
      <Container isActive={isActive} onClick={onClick}>
        {children}
      </Container>
    </Tooltip>
  );
}
