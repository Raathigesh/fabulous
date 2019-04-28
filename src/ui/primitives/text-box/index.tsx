import React from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 15px;
  border-radius: 3px;
  border: 1px solid gray;
  background-color: transparent;
  padding: 3px;
  color: white;
`;

export default function TextBox() {
  return <Input />;
}
