import React from "react";
import SpaceItem from "./space";
import { Flex } from "rebass";

export default function Space() {
  return (
    <Flex flexDirection="column">
      <SpaceItem />
      <SpaceItem />
    </Flex>
  );
}
