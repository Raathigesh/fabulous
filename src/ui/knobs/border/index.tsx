import React from "react";
import styled from "styled-components";
import BorderItem from "./border-side";

const Container = styled.div`
  display: flex;
`;

export default function Border() {
  return (
    <Container>
      <BorderItem />
    </Container>
  );
}
