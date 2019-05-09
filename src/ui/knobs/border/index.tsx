import React, { useState } from "react";
import styled from "styled-components";
import BorderItem from "./border-side";
import { Flex } from "rebass";
import BorderToggle from "./toggle";
import BorderIcon from "./icons/generic";
import { getThemeColors } from "../../theme";
import { State, UpdateProp } from "../../App";

const Sides = {
  Top: "BorderTop",
  Left: "BorderLeft",
  Bottom: "BorderBottom",
  Right: "BorderRight",
  All: "Border"
};

const Properties = {
  Border: "border",
  BorderTop: "border-top",
  BorderRight: "border-right",
  BorderBottom: "border-bottom",
  BorderLeft: "border-left"
};

interface Props {
  state: State;
  updateProp: UpdateProp;
}

export default function Border({ state, updateProp }: Props) {
  const colors = getThemeColors();
  const [activeSide, setActiveSide] = useState(Sides.All);

  const activeSidePropertyName = (Properties as any)[activeSide];
  const borderCSSValue = state[activeSidePropertyName] || "";
  const [width, style, color] = borderCSSValue.split(" ");

  return (
    <Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mr="10px"
      >
        <BorderToggle
          isActive={activeSide === Sides.Top}
          onClick={() => {
            setActiveSide(Sides.Top);
          }}
        >
          <BorderIcon top={colors.iconActive} />
        </BorderToggle>
        <Flex>
          <BorderToggle
            isActive={activeSide === Sides.Right}
            onClick={() => {
              setActiveSide(Sides.Right);
            }}
          >
            <BorderIcon right={colors.iconActive} />
          </BorderToggle>
          <BorderToggle
            isActive={activeSide === Sides.All}
            onClick={() => {
              setActiveSide(Sides.All);
            }}
          >
            <BorderIcon
              top={colors.iconActive}
              right={colors.iconActive}
              bottom={colors.iconActive}
              left={colors.iconActive}
            />
          </BorderToggle>
          <BorderToggle
            isActive={activeSide === Sides.Left}
            onClick={() => {
              setActiveSide(Sides.Left);
            }}
          >
            <BorderIcon left={colors.iconActive} />
          </BorderToggle>
        </Flex>
        <BorderToggle
          isActive={activeSide === Sides.Bottom}
          onClick={() => {
            setActiveSide(Sides.Bottom);
          }}
        >
          <BorderIcon bottom={colors.iconActive} />
        </BorderToggle>
      </Flex>
      <BorderItem
        width={width}
        style={style}
        color={color}
        onColorChange={newColor => {
          updateProp(activeSidePropertyName, `${width} ${style} ${newColor}`);
        }}
        onStyleChange={newStyle => {
          updateProp(activeSidePropertyName, `${width} ${newStyle} ${color}`);
        }}
        onWidthChange={newWidth => {
          updateProp(activeSidePropertyName, `${newWidth} ${style} ${color}`);
        }}
      />
    </Flex>
  );
}
