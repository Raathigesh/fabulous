import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { Flex } from "rebass";
import { Trash, Trash2 } from "react-feather";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ButtonGroup from "../../primitives/button-group";

export default function BorderItem() {
  return (
    <Flex flex="1" mb="5px" flexDirection="column">
      <RowPropertyPanel label="Width">
        <TextBox value="" onChange={() => {}} />
      </RowPropertyPanel>
      <RowPropertyPanel label="Style">
        <ButtonGroup
          options={[
            {
              icon: "None",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Solid",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Dashed",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Dotted",
              tooltip: "Display none",
              value: "None"
            }
          ]}
          value="none"
          onChange={() => {}}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Color">
        <ColorPicker />
      </RowPropertyPanel>
    </Flex>
  );
}
