import React from "react";
import { Flex, Card } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import { themeGet } from "styled-system";
import { State, UpdateProp } from "../../App";

const Box = styled.div`
  display: flex;
  height: 120px;
  width: 150px;
  border: 1px solid ${themeGet("colors.spaceSampleBoxBorder")};
  margin: 10px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  Margin: "margin",
  Border: "border"
};

const Sides = {
  Top: 0,
  Right: 1,
  Bottom: 2,
  Left: 3
};

export default function Space({ state, updateProp }: Props) {
  const handleMargin = (sideIndex: number, value: string) => {
    const margin = state[Properties.Margin] || "0px 0px 0px 0px";
    const sides = margin.split(" ");
    sides[sideIndex] = value;

    updateProp(Properties.Margin, sides.join(" "));
  };

  const getMargin = (index: number) => {
    const margin = state[Properties.Margin] || "0px 0px 0px 0px";
    const sides = margin.split(" ");
    return sides[index];
  };

  return (
    <Flex flex="1" flexDirection="column" mb="5px" alignItems="center">
      <Flex mr="5px">
        <TextBox
          value={getMargin(Sides.Top)}
          onChange={value => {
            handleMargin(Sides.Top, value);
          }}
          width="50px"
          placeholder="Top"
          align="center"
        />
      </Flex>
      <Flex alignItems="center">
        <Flex flex="1" mr="5px">
          <TextBox
            value={getMargin(Sides.Left)}
            onChange={value => {
              handleMargin(Sides.Left, value);
            }}
            width="50px"
            placeholder="Left"
            align="center"
          />
        </Flex>
        <Box>
          <Flex justifyContent="center">
            <TextBox
              value=""
              onChange={() => {}}
              width="50px"
              placeholder="Top"
              align="center"
            />
          </Flex>
          <Flex justifyContent="space-between">
            <TextBox
              value=""
              onChange={() => {}}
              width="50px"
              align="center"
              placeholder="Left"
            />
            <TextBox
              value=""
              onChange={() => {}}
              width="50px"
              placeholder="Right"
              align="center"
            />
          </Flex>
          <Flex justifyContent="center">
            <TextBox
              value=""
              onChange={() => {}}
              width="50px"
              placeholder="Bottom"
              align="center"
            />
          </Flex>
        </Box>
        <Flex flex="1" mr="5px">
          <TextBox
            value={getMargin(Sides.Right)}
            onChange={value => {
              handleMargin(Sides.Right, value);
            }}
            width="50px"
            placeholder="Right"
            align="center"
          />
        </Flex>
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox
          value={getMargin(Sides.Bottom)}
          onChange={value => {
            handleMargin(Sides.Bottom, value);
          }}
          width="50px"
          placeholder="Bottom"
          align="center"
        />
      </Flex>
    </Flex>
  );
}
