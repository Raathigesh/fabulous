import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { borders, borderColor } from "styled-system";
import { StyleProps } from "../../types";
import { Flex } from "rebass";
import TextBox from "../text-box";

const Preview = styled.div<StyleProps>`
  display: flex;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  border: 1px solid gray;
  cursor: pointer;
  margin-right: 5px;
  flex-grow: 1;
  ${borders}
  ${borderColor}
`;
const PopOver = styled.div`
  position: absolute;
`;

const Blanket = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleColorChange = (color: any) => {
    onChange(color.hex);
  };
  const handlePreviewClick = () => setIsOpen(!isOpen);

  return (
    <Flex flex="1">
      <Flex>
        <Preview
          borderWidth="1px"
          borderStyle="solid"
          borderColor="textboxBorder"
          style={{ backgroundColor: color }}
          onClick={handlePreviewClick}
        />
        <TextBox
          value={color}
          onChange={value => {
            onChange(value);
          }}
        />
      </Flex>
      {isOpen && (
        <Fragment>
          <Blanket onClick={handlePreviewClick} />
          <PopOver>
            <SketchPicker color={color} onChangeComplete={handleColorChange} />
          </PopOver>
        </Fragment>
      )}
    </Flex>
  );
}
