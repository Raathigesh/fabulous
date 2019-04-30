import React from "react";
import styled from "styled-components";
import BorderItem from "./border-side";
import { Flex } from "rebass";

export default function Border() {
  return (
    <Flex flexDirection="column">
      <BorderItem />
      <BorderItem />
      <BorderItem />
      <BorderItem />
    </Flex>
  );
}
