import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { Declarations, UpdateProp, RemoveProp } from "../../store";

const Container = styled.div``;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  Position: "position"
};

export default function Position({
  declarations,
  updateProp,
  removeProp
}: Props) {
  return (
    <Container>
      <RowPropertyPanel label="Position">
        <SingleSelect
          onChange={value => {
            if (value === null) {
              removeProp(Properties.Position);
            } else {
              updateProp(Properties.Position, value);
            }
          }}
          value={declarations[Properties.Position] || ""}
          options={[
            {
              value: "static",
              label: "static"
            },
            {
              value: "absolute",
              label: "absolute"
            },
            {
              value: "fixed",
              label: "fixed"
            },
            {
              value: "relative",
              label: "relative"
            },
            {
              value: "sticky",
              label: "sticky"
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
    </Container>
  );
}
