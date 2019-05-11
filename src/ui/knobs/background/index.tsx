import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { Declarations, UpdateProp } from "../../store";

const Container = styled.div``;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
}

const Properties = {
  BackgroundColor: "background-color"
};

export default function Background({ declarations, updateProp }: Props) {
  return (
    <Container>
      <RowPropertyPanel label="Background color">
        <ColorPicker
          color={declarations[Properties.BackgroundColor]}
          onChange={color => {
            updateProp(Properties.BackgroundColor, color);
          }}
        />
      </RowPropertyPanel>
    </Container>
  );
}
