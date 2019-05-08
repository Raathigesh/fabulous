import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { State, UpdateProp } from "../../App";

const Container = styled.div``;

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  BackgroundColor: "background-color"
};

export default function Background({ state, updateProp }: Props) {
  return (
    <Container>
      <RowPropertyPanel label="Background color">
        <ColorPicker
          color={state[Properties.BackgroundColor]}
          onChange={color => {
            updateProp(Properties.BackgroundColor, color);
          }}
        />
      </RowPropertyPanel>
    </Container>
  );
}
