import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 5px;
`;

interface Props {
  children: any;
}

export default function BorderToggle({ children }: Props) {
  return <Container>{children}</Container>;
}
