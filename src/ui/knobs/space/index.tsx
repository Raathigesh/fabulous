import React from "react";
import { Flex, Card } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import { themeGet } from "styled-system";

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

export default function Space() {
  return (
    <Flex flex="1" flexDirection="column" mb="5px" alignItems="center">
      <Flex mr="5px">
        <TextBox
          value=""
          onChange={() => {}}
          width="50px"
          placeholder="Top"
          align="center"
        />
      </Flex>
      <Flex alignItems="center">
        <Flex flex="1" mr="5px">
          <TextBox
            value=""
            onChange={() => {}}
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
            value=""
            onChange={() => {}}
            width="50px"
            placeholder="Right"
            align="center"
          />
        </Flex>
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox
          value=""
          onChange={() => {}}
          width="50px"
          placeholder="Bottom"
          align="center"
        />
      </Flex>
    </Flex>
  );
}
