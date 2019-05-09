import React from "react";
import { Flex } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import { State, UpdateProp } from "../../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  width: 150px;
  justify-content: space-between;
  align-content: center;
`;

interface Props {
  state: State;
  updateProp: UpdateProp;
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

export default function BorderRadius({ state, updateProp }: Props) {
  const handleChange = (sideIndex: number, value: string) => {
    const margin = state[Properties.BorderRadius] || "0 0 0 0";
    const sides = margin.split(" ");
    sides[sideIndex] = value;

    updateProp(Properties.BorderRadius, sides.join(" "));
  };

  const getValue = (index: number) => {
    const margin = state[Properties.BorderRadius] || "0 0 0 0";
    const sides = margin.split(" ");
    return sides[index];
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
          />
          <TextBox
            topRight="30px"
            value={getValue(Sides.TopRight)}
            onChange={value => {
              handleChange(Sides.TopRight, value);
            }}
            width="50px"
          />
        </Flex>
        <Flex justifyContent="center">
          {/*   <TextBox
            topLeft="5px"
            topRight="5px"
            bottomLeft="5px"
            bottomRight="5px"
            width="50px"
            value=""
            align="center"
            onChange={() => {}}
          /> */}
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
          />
          <TextBox
            bottomRight="30px"
            value={getValue(Sides.BottomRight)}
            onChange={value => {
              handleChange(Sides.BottomRight, value);
            }}
            width="50px"
          />
        </Flex>
      </Container>
    </Flex>
  );
}
