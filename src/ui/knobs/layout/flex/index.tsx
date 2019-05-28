import React from "react";
import { Flex } from "rebass";
import RowPropertyPanel from "../../../primitives/row-property-panel";
import ButtonGroup from "../../../primitives/button-group";
import SingleSelect from "../../../primitives/select";
import { UpdateProp, Declarations, RemoveProp } from "../../../store";
import TextBox from "../../../primitives/text-box";

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  FlexDirection: "flex-direction",
  AlignContent: "align-content",
  AlignItems: "align-items",
  AlignSelf: "align-self",
  JustifyContent: "justify-content",
  FlexGrow: "flex-grow",
  FlexShrink: "flex-shrink"
};

export default function FlexPanel({
  declarations,
  updateProp,
  removeProp
}: Props) {
  return (
    <Flex flexDirection="column">
      <RowPropertyPanel
        label="Flex Direction"
        onClear={() => {
          removeProp(Properties.FlexDirection);
        }}
      >
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
          value={declarations[Properties.FlexDirection]}
          onChange={direction => {
            updateProp(Properties.FlexDirection, direction);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Align Contents">
        <SingleSelect
          value={declarations[Properties.AlignContent]}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.AlignContent);
            } else {
              updateProp(Properties.AlignContent, value);
            }
          }}
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
          value={declarations[Properties.AlignItems]}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.AlignItems);
            } else {
              updateProp(Properties.AlignItems, value);
            }
          }}
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
          value={declarations[Properties.AlignSelf]}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.AlignSelf);
            } else {
              updateProp(Properties.AlignSelf, value);
            }
          }}
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
          value={declarations[Properties.JustifyContent]}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.JustifyContent);
            } else {
              updateProp(Properties.JustifyContent, value);
            }
          }}
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
      <RowPropertyPanel
        label="Flex grow"
        onClear={() => {
          removeProp(Properties.FlexGrow);
        }}
      >
        <TextBox
          value={declarations[Properties.FlexGrow]}
          onChange={value => {
            updateProp(Properties.FlexGrow, value);
          }}
          placeholder="Flex grow"
        />
      </RowPropertyPanel>
      <RowPropertyPanel
        label="Flex shrink"
        onClear={() => {
          removeProp(Properties.FlexShrink);
        }}
      >
        <TextBox
          value={declarations[Properties.FlexShrink]}
          onChange={value => {
            updateProp(Properties.FlexShrink, value);
          }}
          placeholder="Flex shrink"
        />
      </RowPropertyPanel>
    </Flex>
  );
}
