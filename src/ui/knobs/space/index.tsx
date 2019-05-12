import React from "react";
import { Flex, Card } from "rebass";
import styled from "styled-components";
import TextBox from "../../primitives/text-box";
import { themeGet } from "styled-system";
import { Declarations, UpdateProp, RemoveProp } from "../../store";
import Clear from "../../primitives/clear-icon";

const Box = styled.div`
  display: flex;
  height: 120px;
  width: 150px;
  border: 1px solid ${themeGet("colors.spaceSampleBoxBorder")};
  margin: 10px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  Margin: "margin",
  Padding: "padding"
};

const Sides = {
  Top: 0,
  Right: 1,
  Bottom: 2,
  Left: 3
};

export default function Space({ declarations, updateProp, removeProp }: Props) {
  const handleChange = (property: string, sideIndex: number, value: string) => {
    const margin = declarations[property] || "";
    const [top = "", right = "", bottom = "", left = ""] = margin.split(" ");
    const sides = [top, right, bottom, left];
    sides[sideIndex] = value;

    updateProp(property, sides.join(" "));
  };

  const getValue = (property: string, index: number) => {
    const margin = declarations[property] || "";
    const [top = "", right = "", bottom = "", left = ""] = margin.split(" ");
    const sides = [top, right, bottom, left];
    return sides[index];
  };

  return (
    <Flex flex="1" flexDirection="column" mb="5px" alignItems="center">
      <Flex mr="5px">
        <TextBox
          value={getValue(Properties.Margin, Sides.Top)}
          onChange={value => {
            handleChange(Properties.Margin, Sides.Top, value);
          }}
          width="50px"
          placeholder="Top"
          align="center"
        />
      </Flex>
      <Flex alignItems="center">
        <Flex flex="1" mr="5px">
          <TextBox
            value={getValue(Properties.Margin, Sides.Left)}
            onChange={value => {
              handleChange(Properties.Margin, Sides.Left, value);
            }}
            width="50px"
            placeholder="Left"
            align="center"
          />
        </Flex>
        <Box>
          <Flex justifyContent="center">
            <TextBox
              value={getValue(Properties.Padding, Sides.Top)}
              onChange={value => {
                handleChange(Properties.Padding, Sides.Top, value);
              }}
              width="50px"
              placeholder="Top"
              align="center"
            />
          </Flex>
          <Flex justifyContent="space-between">
            <TextBox
              value={getValue(Properties.Padding, Sides.Left)}
              onChange={value => {
                handleChange(Properties.Padding, Sides.Left, value);
              }}
              width="50px"
              align="center"
              placeholder="Left"
            />
            <Flex alignSelf="start">
              <Clear
                tooltip="Clear padding"
                onClear={() => {
                  removeProp(Properties.Padding);
                }}
              />
            </Flex>
            <TextBox
              value={getValue(Properties.Padding, Sides.Right)}
              onChange={value => {
                handleChange(Properties.Padding, Sides.Right, value);
              }}
              width="50px"
              placeholder="Right"
              align="center"
            />
          </Flex>
          <Flex justifyContent="center">
            <TextBox
              value={getValue(Properties.Padding, Sides.Bottom)}
              onChange={value => {
                handleChange(Properties.Padding, Sides.Bottom, value);
              }}
              width="50px"
              placeholder="Bottom"
              align="center"
            />
          </Flex>
        </Box>
        <Flex flex="1" mr="5px">
          <TextBox
            value={getValue(Properties.Margin, Sides.Right)}
            onChange={value => {
              handleChange(Properties.Margin, Sides.Right, value);
            }}
            width="50px"
            placeholder="Right"
            align="center"
          />
        </Flex>
      </Flex>
      <Flex flex="1" mr="5px">
        <TextBox
          value={getValue(Properties.Margin, Sides.Bottom)}
          onChange={value => {
            handleChange(Properties.Margin, Sides.Bottom, value);
          }}
          width="50px"
          placeholder="Bottom"
          align="center"
        />
      </Flex>
      <Flex flex="1" mr="10px" flexDirection="row-reverse" width="100%">
        <Clear
          tooltip="Clear margin"
          onClear={() => {
            removeProp(Properties.Margin);
          }}
        />
      </Flex>
    </Flex>
  );
}
