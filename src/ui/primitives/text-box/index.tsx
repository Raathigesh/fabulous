import React from "react";
import styled from "styled-components";

const StyledText = styled.input`
  height: 20px;
  border-radius: 3px;
  background-color: transparent;
  padding: 3px;
  color: white;
  border: 1px solid gray;
  width: 100%;
`;

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextBox({ value, onChange }: Props) {
  return (
    <StyledText
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  );
}
