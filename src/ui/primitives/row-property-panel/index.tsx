import React from "react";
import styled from "styled-components";
import { color, display, flexDirection } from "styled-system";
import { StyleProps } from "../../types";

const Container = styled.div<StyleProps>`
  ${display}
  ${color}
  ${flexDirection}
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.div<StyleProps>`
  ${display}
  ${color}
  ${flexDirection}
  margin-right: 15px;
  min-width: 100px;
`;

interface Props {
  label: string;
  children: any;
}

export default function RowPropertyPanel({ label, children }: Props) {
  return (
    <Container display="flex">
      <Label color="textColor">{label}</Label>
      {children}
    </Container>
  );
}
