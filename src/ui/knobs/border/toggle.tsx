import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

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
  onClick: () => void;
}

export default function BorderToggle({ isActive, children, onClick }: Props) {
  return (
    <Container isActive={isActive} onClick={onClick}>
      {children}
    </Container>
  );
}
