import React from "react";
import styled from "styled-components";
import { borderColor, backgroundColor } from "styled-system";
import { StyleProps } from "../../types";

const StyledText = styled.input<StyleProps>`
  height: 18px;
  border-radius: 3px;
  padding: 3px;
  color: white;
  border: 1px solid gray;
  width: 100%;
  font-size: 12px;
  ${borderColor}
  ${backgroundColor}
`;

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextBox({ value, onChange }: Props) {
  return (
    <StyledText
      value={value}
      borderColor="textboxBorder"
      backgroundColor="textboxBackground"
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
}
