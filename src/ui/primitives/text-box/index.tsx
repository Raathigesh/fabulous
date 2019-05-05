import React from "react";
import styled from "styled-components";
import { borderColor, backgroundColor } from "styled-system";
import { StyleProps } from "../../types";

type StyledTextProps = StyleProps & {
  width?: string;
  align?: "right" | "center";
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
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
  border-top-left-radius: ${props => props.topLeft || 0};
  border-top-right-radius: ${props => props.topRight || 0};
  border-bottom-left-radius: ${props => props.bottomLeft || 0};
  border-bottom-right-radius: ${props => props.bottomRight || 0};
  ${borderColor}
  ${backgroundColor}
`;

interface Props {
  value: string;
  placeholder?: string;
  align?: "right" | "center";
  width?: string;
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  onChange: (value: string) => void;
}

export default function TextBox({
  value,
  width,
  placeholder,
  align,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
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
      topLeft={topLeft}
      topRight={topRight}
      bottomLeft={bottomLeft}
      bottomRight={bottomRight}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
}
