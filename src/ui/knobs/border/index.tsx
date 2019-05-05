import React from "react";
import styled from "styled-components";
import BorderItem from "./border-side";
import { Flex } from "rebass";
import BorderToggle from "./toggle";
import BorderIcon from "./icons/generic";

export default function Border() {
  return (
    <Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mr="10px"
      >
        <BorderToggle>
          <BorderIcon />
        </BorderToggle>
        <Flex>
          <BorderToggle>
            <BorderIcon />
          </BorderToggle>
          <BorderToggle>
            <BorderIcon />
          </BorderToggle>
          <BorderToggle>
            <BorderIcon />
          </BorderToggle>
        </Flex>
        <BorderToggle>
          <BorderIcon />
        </BorderToggle>
      </Flex>
      <BorderItem />
    </Flex>
  );
}
