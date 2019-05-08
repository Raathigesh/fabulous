import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import { Flex } from "rebass";
import SingleSelect from "../../primitives/select";
import { State, UpdateProp } from "../../App";

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  Height: "height",
  Width: "width",
  MinHeight: "min-height",
  MaxWidth: "max-width",
  Overflow: "overflow"
};

export default function Dimension({ state, updateProp }: Props) {
  return (
    <Flex flexDirection="column">
      <Flex>
        <RowPropertyPanel label="Height" minWidth="60px" marginRight="10px">
          <TextBox
            value={state[Properties.Height] || ""}
            onChange={value => {
              updateProp(Properties.Height, value);
            }}
          />
        </RowPropertyPanel>
        <RowPropertyPanel label="Width" minWidth="60px">
          <TextBox
            value={state[Properties.Width] || ""}
            onChange={value => {
              updateProp(Properties.Width, value);
            }}
          />
        </RowPropertyPanel>
      </Flex>
      <Flex>
        <RowPropertyPanel label="Min Height" minWidth="60px" marginRight="10px">
          <TextBox
            value={state[Properties.MinHeight] || ""}
            onChange={value => {
              updateProp(Properties.MinHeight, value);
            }}
          />
        </RowPropertyPanel>
        <RowPropertyPanel label="Max Width" minWidth="60px">
          <TextBox
            value={state[Properties.MaxWidth] || ""}
            onChange={value => {
              updateProp(Properties.MaxWidth, value);
            }}
          />
        </RowPropertyPanel>
      </Flex>
      <RowPropertyPanel label="Overflow" minWidth="60px">
        <SingleSelect
          value={state[Properties.Overflow] || ""}
          onChange={value => {
            updateProp(Properties.Overflow, value);
          }}
          options={[
            {
              value: "visible",
              label: "visible"
            },
            {
              value: "hidden",
              label: "hidden"
            },
            {
              value: "scroll",
              label: "scroll"
            },
            {
              value: "auto",
              label: "auto"
            },
            {
              value: "initial",
              label: "initial"
            },
            {
              value: "inherit",
              label: "inherit"
            }
          ]}
        />
      </RowPropertyPanel>
    </Flex>
  );
}
