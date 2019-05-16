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
  const getValuesForFullProperty = (property: string) => {
    let top: string = "",
      right: string = "",
      bottom: string = "",
      left: string = "";

    const valueForProperty: string = declarations[property];
    if (valueForProperty) {
      const tokens = valueForProperty.trim().split(/\s+/);
      const tokenLength = tokens.length;

      if (tokenLength === 1) {
        // all sides are the same value
        top = tokens[0];
        right = tokens[0];
        left = tokens[0];
        bottom = tokens[0];
      } else if (tokenLength === 2) {
        // vertical | horizontal
        top = tokens[0];
        bottom = tokens[0];
        left = tokens[1];
        right = tokens[1];
      } else if (tokenLength === 3) {
        // top | horizontal | bottom
        top = tokens[0];
        left = tokens[1];
        right = tokens[1];
        bottom = tokens[2];
      } else if (tokenLength === 4) {
        // top | right | bottom | left
        top = tokens[0];
        right = tokens[1];
        bottom = tokens[2];
        left = tokens[3];
      }
    }
    return [top, right, bottom, left];
  };

  const getSingleValue = (property: string, side: number) => {
    if (side === 0) {
      return declarations[`${property}-top`] || "";
    } else if (side === 1) {
      return declarations[`${property}-right`] || "";
    } else if (side === 2) {
      return declarations[`${property}-bottom`] || "";
    } else if (side === 3) {
      return declarations[`${property}-left`] || "";
    }
  };

  const handleChange = (property: string, sideIndex: number, value: string) => {
    const TopProperty = `${property}-top`;
    const RightProperty = `${property}-right`;
    const BottomProperty = `${property}-bottom`;
    const LeftProperty = `${property}-left`;

    const hasShorthand = declarations[property];
    let propertyName = "";
    let propertyValue = "";

    const reversedDeclarations = Object.entries(declarations).reverse();

    for (const [prop] of reversedDeclarations) {
      if (prop === property) {
        propertyName = prop;
        const sides = getValuesForFullProperty(property);
        sides[sideIndex] = value;
        propertyValue = sides.join(" ");
        break;
      } else if (prop === TopProperty && sideIndex === 0) {
        propertyName = TopProperty;
        propertyValue = value;
        break;
      } else if (prop === RightProperty && sideIndex === 1) {
        propertyName = RightProperty;
        propertyValue = value;
        break;
      } else if (prop === BottomProperty && sideIndex === 2) {
        propertyName = BottomProperty;
        propertyValue = value;
        break;
      } else if (prop === LeftProperty && sideIndex === 3) {
        propertyName = LeftProperty;
        propertyValue = value;
        break;
      }
    }

    if (propertyName === "") {
      propertyName = property;
      const sides = ["0", "0", "0", "0"];
      sides[sideIndex] = value;
      propertyValue = sides.join(" ");
    }

    updateProp(propertyName, propertyValue);
  };

  const getValue = (property: string, index: number) => {
    const TopProperty = `${property}-top`;
    const RightProperty = `${property}-right`;
    const BottomProperty = `${property}-bottom`;
    const LeftProperty = `${property}-left`;
    let sides = ["", "", "", ""];
    Object.entries(declarations).forEach(([prop, value]) => {
      if (prop === property) {
        sides = getValuesForFullProperty(property);
      } else if (prop === TopProperty) {
        sides = [getSingleValue(property, index), sides[1], sides[2], sides[3]];
      } else if (prop === RightProperty) {
        sides = [sides[0], getSingleValue(property, index), sides[2], sides[3]];
      } else if (prop === BottomProperty) {
        sides = [sides[0], sides[1], getSingleValue(property, index), sides[3]];
      } else if (prop === LeftProperty) {
        sides = [sides[0], sides[1], sides[2], getSingleValue(property, index)];
      }
    });
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
          tooltip="Margin top"
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
            tooltip="Margin left"
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
              tooltip="Padding top"
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
              tooltip="Padding left"
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
              tooltip="Padding right"
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
              tooltip="Padding bottom"
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
            tooltip="Margin right"
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
          tooltip="Margin bottom"
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
