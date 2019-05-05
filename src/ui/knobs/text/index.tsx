import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { State, UpdateProp } from "../../App";
import SingleSelect from "../../primitives/select";
import ButtonGroup from "../../primitives/button-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "react-feather";

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
        <SingleSelect
          options={[
            {
              value: "",
              label: "all"
            },
            {
              value: "",
              label: "top"
            },
            {
              value: "",
              label: "right"
            },
            {
              value: "",
              label: "bottom"
            },
            {
              value: "",
              label: "left"
            }
          ]}
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
      <RowPropertyPanel label="Text align">
        <ButtonGroup
          options={[
            {
              icon: <AlignLeft size="13px" />,
              tooltip: "Align left",
              value: "None"
            },
            {
              icon: <AlignCenter size="13px" />,
              tooltip: "Align center",
              value: "none"
            },
            {
              icon: <AlignRight size="13px" />,
              tooltip: "Align right",
              value: "none"
            },
            {
              icon: <AlignJustify size="13px" />,
              tooltip: "Align justify",
              value: "none"
            }
          ]}
          value="none"
          onChange={() => {}}
        />
      </RowPropertyPanel>
    </Container>
  );
}
