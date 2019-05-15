import React from "react";
import { Flex } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import { Declarations, UpdateProp, RemoveProp } from "../../store";
import Clear from "../../primitives/clear-icon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  width: 150px;
  justify-content: space-between;
  align-content: center;
`;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  BorderRadius: "border-radius"
};

const Sides = {
  TopLeft: 0,
  TopRight: 1,
  BottomLeft: 2,
  BottomRight: 3
};

export default function BorderRadius({
  declarations,
  updateProp,
  removeProp
}: Props) {
  const handleChange = (sideIndex: number, value: string) => {
    const margin = declarations[Properties.BorderRadius] || "";
    const [top = "", right = "", bottom = "", left = ""] = margin.split(" ");
    const sides = [top, right, bottom, left];
    sides[sideIndex] = value;

    updateProp(Properties.BorderRadius, sides.join(" "));
  };

  const getValue = (index: number) => {
    const margin = declarations[Properties.BorderRadius] || "";
    const [top = "", right = "", bottom = "", left = ""] = margin.split(" ");
    const sides = [top, right, bottom, left];
    return sides[index] || "";
  };

  return (
    <Flex justifyContent="center">
      <Container>
        <Flex justifyContent="space-between">
          <TextBox
            topLeft="30px"
            value={getValue(Sides.TopLeft)}
            onChange={value => {
              handleChange(Sides.TopLeft, value);
            }}
            align="right"
            width="50px"
            tooltip="Top left"
          />
          <TextBox
            topRight="30px"
            value={getValue(Sides.TopRight)}
            onChange={value => {
              handleChange(Sides.TopRight, value);
            }}
            width="50px"
            tooltip="Top right"
          />
        </Flex>
        <Flex justifyContent="center">
          <Clear
            tooltip="Clear border radius"
            onClear={() => {
              removeProp(Properties.BorderRadius);
            }}
          />
        </Flex>
        <Flex justifyContent="space-between">
          <TextBox
            bottomLeft="30px"
            value={getValue(Sides.BottomLeft)}
            onChange={value => {
              handleChange(Sides.BottomLeft, value);
            }}
            align="right"
            width="50px"
            tooltip="Bottom left"
          />
          <TextBox
            bottomRight="30px"
            value={getValue(Sides.BottomRight)}
            onChange={value => {
              handleChange(Sides.BottomRight, value);
            }}
            width="50px"
            tooltip="Bottom right"
          />
        </Flex>
      </Container>
    </Flex>
  );
}
