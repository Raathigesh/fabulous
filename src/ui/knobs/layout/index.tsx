import React from "react";
import RowPropertyPanel from "../../primitives/row-property-panel";
import { Flex } from "rebass";
import ButtonGroup from "../../primitives/button-group";
import { EyeOff } from "react-feather";
import Block from "./icons/block";
import InlineBlock from "./icons/inline-block";
import Inline from "./icons/inline";
import FlexIcon from "./icons/flex";
import FlexPanel from "./flex";

export default function Layout() {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel label="Display">
        <ButtonGroup
          options={[
            {
              icon: <EyeOff size="11px" />,
              tooltip: "Display none",
              value: "None"
            },
            {
              icon: <Block isActive={false} />,
              tooltip: "Block",
              value: "none"
            },
            {
              icon: <InlineBlock isActive={false} />,
              tooltip: "Inline block",
              value: "none"
            },
            {
              icon: <Inline isActive={false} />,
              tooltip: "Inline",
              value: "none"
            },
            {
              icon: <FlexIcon isActive={false} />,
              tooltip: "Flex",
              value: "none"
            }
          ]}
          value="none"
          onChange={() => {}}
        />
      </RowPropertyPanel>
      <FlexPanel />
    </Flex>
  );
}
