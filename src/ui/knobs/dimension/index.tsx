import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { Flex } from "rebass";

export default function Dimension() {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel label="Height">
        <TextBox value="" onChange={() => {}} />
      </RowPropertyPanel>
      <RowPropertyPanel label="Width">
        <TextBox value="" onChange={() => {}} />
      </RowPropertyPanel>
    </Flex>
  );
}
