import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import RowPropertyPanel from "../../primitives/row-property-panel";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";

const Container = styled.div``;

export default function Position() {
  return (
    <Container>
      <RowPropertyPanel label="Position">
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
    </Container>
  );
}
