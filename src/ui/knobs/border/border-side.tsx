import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";

const Container = styled.div`
  display: flex;
`;

export default function BorderItem() {
  return (
    <Container>
      <SingleSelect options={[]} width={95} />
      <TextBox />
      <TextBox />
      <TextBox />
      <ColorPicker />
    </Container>
  );
}
