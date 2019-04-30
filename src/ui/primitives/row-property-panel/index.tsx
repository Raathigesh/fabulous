import React from "react";
import styled from "styled-components";
import { color, display, flexDirection } from "styled-system";
import { StyleProps } from "../../types";
import { Flex } from "rebass";

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
    <Flex mb="10px" justifyContent="center" alignItems="center">
      <Label color="textColor">{label}</Label>
      <Flex flex="1">{children}</Flex>
    </Flex>
  );
}
