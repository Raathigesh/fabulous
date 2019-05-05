import React from "react";
import styled from "styled-components";
import { borderColor, backgroundColor } from "styled-system";
import { StyleProps } from "../../types";

type StyledTextProps = StyleProps & {
  width?: string;
  align?: "right" | "center";
};

const StyledText = styled.input<StyledTextProps>`
  height: 18px;
  border-radius: 3px;
  padding: 3px;
  color: white;
  border: 1px solid gray;
  width: ${props => props.width || "100%"};
  text-align: ${props => props.align || "left"};
  font-size: 12px;
  ${borderColor}
  ${backgroundColor}
`;

interface Props {
  value: string;
  placeholder?: string;
  align?: "right" | "center";
  width?: string;
  onChange: (value: string) => void;
}

export default function TextBox({
  value,
  width,
  placeholder,
  align,
  onChange
}: Props) {
  return (
    <StyledText
      value={value}
      borderColor="textboxBorder"
      backgroundColor="textboxBackground"
      width={width}
      placeholder={placeholder}
      align={align}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
}
