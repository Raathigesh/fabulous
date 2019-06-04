import { TestCaseSetup } from '../test-types';
import StyledComponentsInspector from '../../file-handlers/js';

const testCases: TestCaseSetup = {
  name: 'Test React Files',
  inspector: StyledComponentsInspector,
  languageId: 'typescriptreact',
  testFileName: 'test-react.tsx',
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: [],
};

// prettier-ignore
testCases.parseTestCases = [
  { line: 7, column: 19, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 8, column: 21, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 9, column: 23, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 15, column: 15, expected: { 'padding': '4em', 'background': 'papayawhip' } },
  { line: 16, column: 16, expected: { 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 7, column: 19, prop: 'color', value: '#444', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#444' } },
  { line: 7, column: 19, prop: 'color', value: '#555', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#555' } },
  { line: 7, column: 19, prop: 'font-size', value: '3.0em', type: 'add',  expected: { 'font-size': '3.0em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 15, column: 15, prop: 'background', value: 'black', type: 'add',  expected: { 'padding': '4em', 'background': 'black' } },
  { line: 15, column: 15, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { 'padding': '10px 10px 10px 10px', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 7, column: 19, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 15, column: 15, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 7, column: 19, prop: 'font-size', value: '', type: 'remove',  expected: { 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 7, column: 19, prop: 'text-align', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'color': 'palevioletred' } },
  { line: 7, column: 19, prop: 'color', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'text-align': 'center' } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 16, column: 15, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 16, column: 15, prop: 'text-align', value: 'center', type: 'add' },
      { line: 16, column: 15, prop: 'color', value: 'palevioletred', type: 'add' },
    ],
    inputCssString: `
import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section\`
  padding: 4em;
  background: papayawhip;
\`;

// Use them like any other React component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>;
`,
    outputCssString: `
import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section\`
  padding: 4em;
  background: papayawhip;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

// Use them like any other React component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>;
`,
  },
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 16, column: 15, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 16, column: 15, prop: 'text-align', value: 'center', type: 'add' },
      { line: 16, column: 15, prop: 'color', value: 'palevioletred', type: 'add' },
      { line: 8, column: 19, prop: 'font-size', value: '', type: 'remove' },
      { line: 8, column: 19, prop: 'text-align', value: '', type: 'remove' },
      { line: 8, column: 19, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1\`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section\`
  padding: 4em;
  background: papayawhip;
\`;

// Use them like any other React component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>;
`,
    outputCssString: `
import React from 'react';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1\`
\`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section\`
  padding: 4em;
  background: papayawhip;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
\`;

// Use them like any other React component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>;
`,
  },
];

export default testCases;
