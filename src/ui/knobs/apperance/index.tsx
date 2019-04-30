import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";

const Container = styled.div``;

export default function Apperance() {
  return (
    <Container>
      <RowPropertyPanel label="Opacity">
        <TextBox />
      </RowPropertyPanel>
      <RowPropertyPanel label="Cursor">
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
      <RowPropertyPanel label="Background color">
        <ColorPicker />
      </RowPropertyPanel>
    </Container>
  );
}
