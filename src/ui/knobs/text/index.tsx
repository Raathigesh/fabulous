import React from 'react';
import styled from 'styled-components';
import TextBox from '../../primitives/text-box';
import RowPropertyPanel from '../../primitives/row-property-panel';
import ColorPicker from '../../primitives/color-picker';
import SingleSelect from '../../primitives/select';
import ButtonGroup from '../../primitives/button-group';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'react-feather';
import { Declarations, UpdateProp, RemoveProp } from '../../store';

const Container = styled.div``;

interface Props {
  declarations: Declarations;
  updateProp: UpdateProp;
  removeProp: RemoveProp;
}

const Properties = {
  FontSize: 'font-size',
  LineHeight: 'line-height',
  FontWeight: 'font-weight',
  FontColor: 'color',
  FontFamily: 'font-family',
  TextAlign: 'text-align',
  FontStyle: 'font-style',
};

export default function TextStyles({ declarations, updateProp, removeProp }: Props) {
  return (
    <Container>
      <RowPropertyPanel
        label="Font size"
        onClear={() => {
          removeProp(Properties.FontSize);
        }}
      >
        <TextBox value={declarations[Properties.FontSize] || ''} onChange={value => updateProp(Properties.FontSize, value)} />
      </RowPropertyPanel>
      <RowPropertyPanel
        label="Line height"
        onClear={() => {
          removeProp(Properties.LineHeight);
        }}
      >
        <TextBox value={declarations[Properties.LineHeight] || ''} onChange={value => updateProp(Properties.LineHeight, value)} />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font weight">
        <SingleSelect
          value={declarations[Properties.FontWeight] || ''}
          onChange={value => {
            if (value === null) {
              removeProp(Properties.FontWeight);
            } else {
              updateProp(Properties.FontWeight, value);
            }
          }}
          options={[
            {
              value: '100',
              label: '100',
            },
            {
              value: '200',
              label: '200',
            },
            {
              value: '300',
              label: '300',
            },
            {
              value: '400',
              label: '400',
            },
            {
              value: '500',
              label: '500',
            },
            {
              value: '600',
              label: '600',
            },
            {
              value: '700',
              label: '700',
            },
            {
              value: '800',
              label: '800',
            },
            {
              value: '900',
              label: '900',
            },
          ]}
        />
      </RowPropertyPanel>
      <RowPropertyPanel
        label="Font color"
        onClear={() => {
          removeProp(Properties.FontColor);
        }}
      >
        <ColorPicker
          color={declarations[Properties.FontColor] || ''}
          onChange={color => {
            updateProp(Properties.FontColor, color);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel
        label="Font family"
        onClear={() => {
          removeProp(Properties.FontFamily);
        }}
      >
        <TextBox value={declarations[Properties.FontFamily] || ''} onChange={value => updateProp(Properties.FontFamily, value)} />
      </RowPropertyPanel>
      <RowPropertyPanel
        label="Text align"
        onClear={() => {
          removeProp(Properties.TextAlign);
        }}
      >
        <ButtonGroup
          options={[
            {
              icon: <AlignLeft size="13px" />,
              tooltip: 'Align left',
              value: 'left',
            },
            {
              icon: <AlignCenter size="13px" />,
              tooltip: 'Align center',
              value: 'center',
            },
            {
              icon: <AlignRight size="13px" />,
              tooltip: 'Align right',
              value: 'right',
            },
            {
              icon: <AlignJustify size="13px" />,
              tooltip: 'Align justify',
              value: 'justify',
            },
          ]}
          value={declarations[Properties.TextAlign] || ''}
          onChange={value => {
            updateProp(Properties.TextAlign, value);
          }}
        />
      </RowPropertyPanel>
      <RowPropertyPanel label="Font style">
        <SingleSelect
          onChange={value => {
            if (value === null) {
              removeProp(Properties.FontStyle);
            } else {
              updateProp(Properties.FontStyle, value);
            }
          }}
          value={declarations[Properties.FontStyle] || ''}
          options={[
            {
              value: 'normal',
              label: 'normal',
            },
            {
              value: 'italic',
              label: 'italic',
            },
            {
              value: 'oblique',
              label: 'oblique',
            },
            {
              value: 'initial',
              label: 'initial',
            },
            {
              value: 'inherit',
              label: 'inherit',
            },
          ]}
        />
      </RowPropertyPanel>
    </Container>
  );
}
