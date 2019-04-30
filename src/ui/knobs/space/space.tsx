import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { Flex } from "rebass";
import { Trash, Trash2 } from "react-feather";
import { CrossIcon } from "react-select/lib/components/indicators";

export default function BorderItem() {
  return (
    <Flex flex="1" mb="5px">
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <CrossIcon size="15px" />
      </Flex>
    </Flex>
  );
}
