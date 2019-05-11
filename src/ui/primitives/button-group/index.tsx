import React from "react";
import { Flex, Card } from "rebass";
import { Tooltip } from "react-tippy";
import styled from "styled-components";
import { themeGet, minHeight } from "styled-system";

interface Props {
  options: {
    icon: any;
    value: string;
    tooltip: string;
  }[];
  value: string;
  minHeight?: number;
  onChange: (value: string) => void;
}

const ItemContainer = styled.div<{ active: boolean; minHeight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => `${props.minHeight}px`};
  min-width: 25px;
  padding: 3px;
  cursor: pointer;
  border: 1px solid ${themeGet("colors.iconBorder")};
  background-color: ${props =>
    props.active
      ? themeGet("colors.iconHover")
      : themeGet("colors.iconBackground")};
  &:hover {
    background-color: ${themeGet("colors.iconHover")};
  }
`;

export default function ButtonGroup({
  options,
  onChange,
  value,
  minHeight = 25
}: Props) {
  return (
    <Flex>
      {options.map(({ icon, tooltip, value: OptionValue }) => (
        <Tooltip title={tooltip} position="bottom" size="small">
          <ItemContainer
            minHeight={minHeight}
            active={value === OptionValue}
            onClick={() => onChange(OptionValue)}
          >
            {icon}
          </ItemContainer>
        </Tooltip>
      ))}
    </Flex>
  );
}
