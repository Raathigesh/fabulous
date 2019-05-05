import React from "react";
import styled from "styled-components";
import BorderItem from "./border-side";
import { Flex } from "rebass";
import BorderToggle from "./toggle";
import BorderIcon from "./icons/generic";
import { getThemeColors } from "../../theme";

export default function Border() {
  const colors = getThemeColors();
  return (
    <Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mr="10px"
      >
        <BorderToggle>
          <BorderIcon top={colors.iconActive} />
        </BorderToggle>
        <Flex>
          <BorderToggle>
            <BorderIcon right={colors.iconActive} />
          </BorderToggle>
          <BorderToggle>
            <BorderIcon
              top={colors.iconActive}
              right={colors.iconActive}
              bottom={colors.iconActive}
              left={colors.iconActive}
            />
          </BorderToggle>
          <BorderToggle>
            <BorderIcon left={colors.iconActive} />
          </BorderToggle>
        </Flex>
        <BorderToggle>
          <BorderIcon bottom={colors.iconActive} />
        </BorderToggle>
      </Flex>
      <BorderItem />
    </Flex>
  );
}
