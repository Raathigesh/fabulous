import React from "react";
import styled from "styled-components";
import { borderColor, border, borders } from "styled-system";
import { StyleProps } from "../../types";
import { Text } from "rebass";

const StyledText = styled.input`
  height: 20px;
  border-radius: 3px;
  background-color: transparent;
  padding: 3px;
  color: white;
  border: 1px solid gray;
  width: 100%;
`;

export default function TextBox() {
  return <StyledText />;
}
