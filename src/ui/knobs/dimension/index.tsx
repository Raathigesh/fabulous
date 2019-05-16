import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import { Flex } from "rebass";
import SingleSelect from "../../primitives/select";
import { Declarations, UpdateProp, RemoveProp } from "../../store";

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  Height: "height",
  Width: "width",
  MinHeight: "min-height",
  MaxWidth: "max-width",
  Overflow: "overflow"
};

export default function Dimension({
  declarations,
  updateProp,
  removeProp
}: Props) {
  return (
    <Flex flexDirection="column">
      <Flex>
        <RowPropertyPanel
          label="Height"
          minWidth="60px"
          marginRight="10px"
          onClear={() => {
            removeProp(Properties.Height);
          }}
        >
          <TextBox
            value={declarations[Properties.Height] || ""}
            onChange={value => {
              updateProp(Properties.Height, value);
            }}
          />
        </RowPropertyPanel>
        <RowPropertyPanel
          label="Width"
          minWidth="60px"
          onClear={() => {
            removeProp(Properties.Width);
          }}
        >
          <TextBox
            value={declarations[Properties.Width] || ""}
            onChange={value => {
              updateProp(Properties.Width, value);
            }}
          />
        </RowPropertyPanel>
      </Flex>
      <Flex>
        <RowPropertyPanel
          label="Min Height"
          minWidth="60px"
          marginRight="10px"
          onClear={() => {
            removeProp(Properties.MinHeight);
          }}
        >
          <TextBox
            value={declarations[Properties.MinHeight] || ""}
            onChange={value => {
              updateProp(Properties.MinHeight, value);
            }}
          />
        </RowPropertyPanel>
        <RowPropertyPanel
          label="Max Width"
          minWidth="60px"
          onClear={() => {
            removeProp(Properties.MaxWidth);
          }}
        >
          <TextBox
            value={declarations[Properties.MaxWidth] || ""}
            onChange={value => {
              updateProp(Properties.MaxWidth, value);
            }}
          />
        </RowPropertyPanel>
      </Flex>
      <RowPropertyPanel label="Overflow" minWidth="60px">
        <SingleSelect
          value={declarations[Properties.Overflow] || ""}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.Overflow);
            } else {
              updateProp(Properties.Overflow, value);
            }
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
