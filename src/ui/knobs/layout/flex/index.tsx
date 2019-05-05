import React from "react";
import { Flex } from "rebass";
import { EyeOff } from "react-feather";
import RowPropertyPanel from "../../../primitives/row-property-panel";
import ButtonGroup from "../../../primitives/button-group";

export default function FlexPanel() {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel label="Flex Direction">
        <ButtonGroup
          options={[
            {
              icon: "Column",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Row",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Column Reverse",
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: "Row Reverse",
              tooltip: "Display none",
              value: "None"
            }
          ]}
          value="none"
          onChange={() => {}}
        />
      </RowPropertyPanel>
    </Flex>
  );
}
