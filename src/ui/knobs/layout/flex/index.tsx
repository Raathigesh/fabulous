import React from "react";
import { Flex } from "rebass";
import { EyeOff } from "react-feather";
import RowPropertyPanel from "../../../primitives/row-property-panel";
import ButtonGroup from "../../../primitives/button-group";
import { State, UpdateProp } from "../../../App";
import SingleSelect from "../../../primitives/select";

interface Props {
  state: State;
  updateProp: UpdateProp;
}

const Properties = {
  FlexDirection: "flex-direction",
  AlignContent: "align-content",
  AlignItems: "align-items",
  AlignSelf: "align-self",
  JustifyContent: "justify-content"
};

export default function FlexPanel({ state, updateProp }: Props) {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel label="Flex Direction">
        <ButtonGroup
          minHeight={15}
          options={[
            {
              icon: "Column",
              tooltip: "Column",
              value: "column"
            },
            {
              icon: "Row",
              tooltip: "Row",
              value: "row"
            },
            {
              icon: "Column Reverse",
              tooltip: "Column reverse",
              value: "column-reverse"
            },
            {
              icon: "Row Reverse",
              tooltip: "Row reverse",
              value: "row-reverse"
            }
          ]}
          value={state[Properties.FlexDirection]}
          onChange={direction => {
            updateProp(Properties.FlexDirection, direction);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Align Contents">
        <SingleSelect
          value={state[Properties.AlignContent]}
          onChange={value => updateProp(Properties.AlignContent, value)}
          options={[
            {
              value: "stretch",
              label: "stretch"
            },
            {
              value: "flex-start",
              label: "flex-start"
            },
            {
              value: "flex-end",
              label: "flex-end"
            },
            {
              value: "center",
              label: "center"
            },
            {
              value: "space-between",
              label: "space-between"
            },
            {
              value: "space-around",
              label: "space-around"
            }
          ]}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Align Items">
        <SingleSelect
          value={state[Properties.AlignItems]}
          onChange={value => updateProp(Properties.AlignItems, value)}
          options={[
            {
              value: "flex-start",
              label: "flex-start"
            },
            {
              value: "flex-end",
              label: "flex-end"
            },
            {
              value: "center",
              label: "center"
            },
            {
              value: "baseline",
              label: "baseline"
            },
            {
              value: "stretch",
              label: "stretch"
            }
          ]}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Align Self">
        <SingleSelect
          value={state[Properties.AlignSelf]}
          onChange={value => updateProp(Properties.AlignSelf, value)}
          options={[
            {
              value: "auto",
              label: "auto"
            },
            {
              value: "flex-start",
              label: "flex-start"
            },
            {
              value: "flex-end",
              label: "flex-end"
            },
            {
              value: "center",
              label: "center"
            },
            {
              value: "baseline",
              label: "baseline"
            },
            {
              value: "stretch",
              label: "stretch"
            }
          ]}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Justify Content">
        <SingleSelect
          value={state[Properties.JustifyContent]}
          onChange={value => updateProp(Properties.JustifyContent, value)}
          options={[
            {
              value: "flex-start",
              label: "flex-start"
            },
            {
              value: "flex-end",
              label: "flex-end"
            },
            {
              value: "center",
              label: "center"
            },
            {
              value: "space-between",
              label: "space-between"
            },
            {
              value: "space-around",
              label: "space-around"
            }
          ]}
        />
      </RowPropertyPanel>
    </Flex>
  );
}
