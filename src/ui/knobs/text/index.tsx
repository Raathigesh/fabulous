import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { State, UpdateProp } from "../../App";

const Container = styled.div``;

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  FontSize: "font-size",
  FontWeight: "font-weight",
  FontColor: "color",
  FontFamily: "font-family"
};

export default function TextStyles({ state, updateProp }: Props) {
  return (
    <Container>
      <RowPropertyPanel label="Font size">
        <TextBox
          value={state[Properties.FontSize]}
          onChange={value => updateProp(Properties.FontSize, value)}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font weight">
        <TextBox
          value={state[Properties.FontWeight]}
          onChange={value => updateProp(Properties.FontWeight, value)}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font color">
        <ColorPicker />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font family">
        <TextBox
          value={state[Properties.FontFamily]}
          onChange={value => updateProp(Properties.FontFamily, value)}
        />
      </RowPropertyPanel>
    </Container>
  );
}
