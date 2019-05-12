import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { Trash2 } from "react-feather";

const ClearIcon = styled.div<{ marginRight?: string }>`
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  margin-right: ${props => props.marginRight};
`;

interface Props {
  tooltip?: string;
  onClear: () => void;
  marginRight?: string;
}

export default function Clear({
  tooltip = "Clear value",
  onClear,
  marginRight
}: Props) {
  return (
    <ClearIcon onClick={onClear} marginRight={marginRight}>
      <Tooltip title={tooltip} position="bottom" size="small">
        <Trash2 size={11} />
      </Tooltip>
    </ClearIcon>
  );
}
