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
  FontFamily: "font-family",
  TextAlign: "text-align"
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
          value={state[Properties.FontWeight]}
          onChange={value => updateProp(Properties.FontWeight, value)}
          options={[
            {
              value: "100",
              label: "100"
            },
            {
              value: "200",
              label: "200"
            },
            {
              value: "300",
              label: "300"
            },
            {
              value: "400",
              label: "400"
            },
            {
              value: "500",
              label: "500"
            },
            {
              value: "600",
              label: "600"
            },
            {
              value: "700",
              label: "700"
            },
            {
              value: "800",
              label: "800"
            },
            {
              value: "900",
              label: "900"
            }
          ]}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font color">
        <ColorPicker
          color={state[Properties.FontColor]}
          onChange={color => {
            updateProp(Properties.FontColor, color);
          }}
        />
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
              value: "left"
            },
            {
              icon: <AlignCenter size="13px" />,
              tooltip: "Align center",
              value: "center"
            },
            {
              icon: <AlignRight size="13px" />,
              tooltip: "Align right",
              value: "right"
            },
            {
              icon: <AlignJustify size="13px" />,
              tooltip: "Align justify",
              value: "justify"
            }
          ]}
          value={state[Properties.TextAlign]}
          onChange={value => {
            updateProp(Properties.TextAlign, value);
          }}
        />
      </RowPropertyPanel>
    </Container>
  );
}
