import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { Flex } from "rebass";
import { Trash, Trash2 } from "react-feather";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ButtonGroup from "../../primitives/button-group";

interface Props {
  width: string;
  style: string;
  color: string;
  onWidthChange: (width: string) => void;
  onStyleChange: (style: string) => void;
  onColorChange: (color: string) => void;
}

export default function BorderItem({
  width,
  style,
  color,
  onWidthChange,
  onStyleChange,
  onColorChange
}: Props) {
  return (
    <Flex flex="1" mb="5px" flexDirection="column">
      <RowPropertyPanel label="Width">
        <TextBox value={width} onChange={onWidthChange} />
      </RowPropertyPanel>
      <RowPropertyPanel label="Style">
        <ButtonGroup
          options={[
            {
              icon: "None",
              tooltip: "None",
              value: "none"
            },
            {
              icon: "Solid",
              tooltip: "Solid",
              value: "solid"
            },
            {
              icon: "Dashed",
              tooltip: "Dashed",
              value: "dashed"
            },
            {
              icon: "Dotted",
              tooltip: "Dotted",
              value: "dotted"
            }
          ]}
          value={style}
          onChange={onStyleChange}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Color">
        <ColorPicker color={color} onChange={onColorChange} />
      </RowPropertyPanel>
    </Flex>
  );
}
