import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import { Flex } from "rebass";
import SingleSelect from "../../primitives/select";

export default function Dimension() {
  return (
    <Flex flexDirection="column">
      <Flex>
        <RowPropertyPanel label="Height" minWidth="60px" marginRight="10px">
          <TextBox value="" onChange={() => {}} />
        </RowPropertyPanel>
        <RowPropertyPanel label="Width" minWidth="60px">
          <TextBox value="" onChange={() => {}} />
        </RowPropertyPanel>
      </Flex>
      <Flex>
        <RowPropertyPanel label="Min Height" minWidth="60px" marginRight="10px">
          <TextBox value="" onChange={() => {}} />
        </RowPropertyPanel>
        <RowPropertyPanel label="Max Width" minWidth="60px">
          <TextBox value="" onChange={() => {}} />
        </RowPropertyPanel>
      </Flex>
      <RowPropertyPanel label="Overflow" minWidth="60px">
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
    </Flex>
  );
}
