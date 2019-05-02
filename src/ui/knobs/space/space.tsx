import React from "react";
import TextBox from "../../primitives/text-box";
import { Flex } from "rebass";
import { CrossIcon } from "react-select/lib/components/indicators";

export default function BorderItem() {
  return (
    <Flex flex="1" mb="5px">
      <Flex flex="1" mr="5px">
        <TextBox value="" onChange={() => {}} />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox value="" onChange={() => {}} />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox value="" onChange={() => {}} />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox value="" onChange={() => {}} />
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <CrossIcon size="15px" />
      </Flex>
    </Flex>
  );
}
