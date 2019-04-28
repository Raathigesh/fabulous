import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";

const Container = styled.div``;

export default function TextStyles() {
  return (
    <Container>
      <RowPropertyPanel label="Font size">
        <TextBox />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font weight">
        <TextBox />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font color">
        <ColorPicker />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font family">
        <TextBox />
      </RowPropertyPanel>
    </Container>
  );
}
