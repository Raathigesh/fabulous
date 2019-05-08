import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import SingleSelect from "../../primitives/select";
import { State, UpdateProp } from "../../App";

const Container = styled.div``;

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  Cursor: "cursor",
  Opacity: "opacity"
};

export default function Apperance({ state, updateProp }: Props) {
  return (
    <Container>
      <RowPropertyPanel label="Opacity">
        <TextBox
          value={state[Properties.Opacity]}
          onChange={value => {
            updateProp(Properties.Opacity, value);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Cursor">
        <SingleSelect
          value={state[Properties.Cursor]}
          onChange={value => updateProp(Properties.Cursor, value)}
          options={[
            {
              value: "auto",
              label: "auto"
            },
            {
              value: "default",
              label: "default"
            },
            {
              value: "none",
              label: "none"
            },
            {
              value: "context-menu",
              label: "context-menu"
            },
            {
              value: "pointer",
              label: "pointer"
            },
            {
              value: "progress",
              label: "progress"
            },
            {
              value: "wait",
              label: "wait"
            },
            {
              value: "cell",
              label: "cell"
            },
            {
              value: "crosshair",
              label: "crosshair"
            },
            {
              value: "text",
              label: "text"
            },
            {
              value: "vertical-text",
              label: "vertical-text"
            },
            {
              value: "alias",
              label: "alias"
            },
            {
              value: "copy",
              label: "copy"
            },
            {
              value: "move",
              label: "move"
            },
            {
              value: "no-drop",
              label: "no-drop"
            },
            {
              value: "not-allowed",
              label: "not-allowed"
            },
            {
              value: "e-resize",
              label: "e-resize"
            },
            {
              value: "n-resize",
              label: "n-resize"
            },
            {
              value: "ne-resize",
              label: "ne-resize"
            },
            {
              value: "nw-resize",
              label: "nw-resize"
            },
            {
              value: "s-resize",
              label: "s-resize"
            },
            {
              value: "se-resize",
              label: "se-resize"
            },
            {
              value: "sw-resize ",
              label: "sw-resize "
            },
            {
              value: "w-resize",
              label: "w-resize"
            },
            {
              value: "ew-resize",
              label: "ew-resize"
            },
            {
              value: "ns-resize",
              label: "ns-resize"
            },
            {
              value: "nesw-resize",
              label: "nesw-resize"
            },
            {
              value: "nwse-resize",
              label: "nwse-resize"
            },
            {
              value: "col-resize",
              label: "col-resize"
            },
            {
              value: "row-resize",
              label: "row-resize"
            },
            {
              value: "all-scroll",
              label: "all-scroll"
            },
            {
              value: "zoom-in",
              label: "zoom-in"
            },
            {
              value: "zoom-out",
              label: "zoom-out"
            },
            {
              value: "grab",
              label: "grab"
            },
            {
              value: "grabbing",
              label: "grabbing"
            },
            {
              value: "help",
              label: "help"
            }
          ]}
        />
      </RowPropertyPanel>
    </Container>
  );
}
