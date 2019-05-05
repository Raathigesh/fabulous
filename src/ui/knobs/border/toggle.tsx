import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

const Container = styled.div`
  padding: 5px;
  cursor: pointer;
  background-color: ${themeGet("colors.iconBackground")};
  &:hover {
    background-color: ${themeGet("colors.iconHover")};
  }
`;

interface Props {
  children: any;
}

export default function BorderToggle({ children }: Props) {
  return <Container>{children}</Container>;
}
