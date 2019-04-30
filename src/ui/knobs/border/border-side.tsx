import React from "react";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import ColorPicker from "../../primitives/color-picker";
import SingleSelect from "../../primitives/select";
import { Flex } from "rebass";
import { Trash, Trash2 } from "react-feather";

export default function BorderItem() {
  return (
    <Flex flex="1" mb="5px">
      <Flex flex="1" mr="5px">
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
          width={95}
        />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox />
      </Flex>
      <Flex flex="1" mr="5px">
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
          width={95}
        />
      </Flex>
      <Flex flex="1" mr="5px">
        <ColorPicker />
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Trash2 size="15px" />
      </Flex>
    </Flex>
  );
}
