import React from "react";
import { Flex, Card } from "rebass";
import { Tooltip } from "react-tippy";
import styled from "styled-components";
import { themeGet } from "styled-system";

interface Props {
  options: {
    icon: any;
    value: string;
    tooltip: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25px;
  min-width: 25px;
  padding: 3px;
  cursor: pointer;
  border: 1px solid ${themeGet("colors.iconBorder")};
  background-color: ${themeGet("colors.iconBackground")};
  &:hover {
    background-color: ${themeGet("colors.iconHover")};
  }
`;

export default function ButtonGroup({ options }: Props) {
  return (
    <Flex>
      {options.map(({ icon, tooltip }) => (
        <Tooltip title={tooltip} position="bottom" size="small">
          <ItemContainer>{icon}</ItemContainer>
        </Tooltip>
      ))}
    </Flex>
  );
}
