import React from "react";
import { Flex } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 150px;
  justify-content: space-between;
  align-content: center;
`;

export default function BorderRadius() {
  return (
    <Flex justifyContent="center">
      <Container>
        <Flex justifyContent="space-between">
          <TextBox
            topLeft="30px"
            value=""
            onChange={() => {}}
            align="right"
            width="50px"
          />
          <TextBox topRight="30px" value="" onChange={() => {}} width="50px" />
        </Flex>
        <Flex justifyContent="center">
          <TextBox
            topLeft="5px"
            topRight="5px"
            bottomLeft="5px"
            bottomRight="5px"
            width="50px"
            value=""
            onChange={() => {}}
          />
        </Flex>
        <Flex justifyContent="space-between">
          <TextBox
            bottomLeft="30px"
            value=""
            onChange={() => {}}
            align="right"
            width="50px"
          />
          <TextBox
            bottomRight="30px"
            value=""
            onChange={() => {}}
            width="50px"
          />
        </Flex>
      </Container>
    </Flex>
  );
}
