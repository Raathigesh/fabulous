import React from "react";
import RowPropertyPanel from "../../primitives/row-property-panel";
import { Flex } from "rebass";
import SingleSelect from "../../primitives/select";

export default function Layout() {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel label="Display">
        <SingleSelect
          options={[
            {
              value: "",
              label: "none"
            },
            {
              value: "",
              label: "block"
            },
            {
              value: "",
              label: "inline"
            },
            {
              value: "",
              label: "inline-block"
            },
            {
              value: "",
              label: "flex"
            }
          ]}
        />
      </RowPropertyPanel>
    </Flex>
  );
}
