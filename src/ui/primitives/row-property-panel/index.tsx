import React from "react";
import styled from "styled-components";
import { color, display, flexDirection, fontSize } from "styled-system";
import { StyleProps } from "../../types";
import { Flex } from "rebass";

type LabelProps = StyleProps & {
  minWidth?: string;
};

const Label = styled.div<LabelProps>`
  ${display}
  ${color}
  ${flexDirection}
  ${fontSize}
  margin-right: 15px;
  min-width: ${props => props.minWidth || "100px"};
  font-weight: 600;
`;

interface Props {
  label: string;
  marginRight?: string;
  minWidth?: string;
  children: any;
}

export default function RowPropertyPanel({
  label,
  minWidth,
  children,
  marginRight
}: Props) {
  return (
    <Flex mb="10px" justifyContent="center" alignItems="center" fontSize="11px">
      <Label minWidth={minWidth} color="textColor">
        {label}
      </Label>
      <Flex flex="1" mr={marginRight}>
        {children}
      </Flex>
    </Flex>
  );
}
