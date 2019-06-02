import { TestCaseSetup } from '../test-types';
import HtmlInspector from '../../file-handlers/html';

const testCases: TestCaseSetup = {
  name: 'Test HTML Files',
  inspector: HtmlInspector,
  languageId: 'html',
  testFileName: 'test-html.html',
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: [],
};

// prettier-ignore
testCases.parseTestCases = [
  { line: 4, column: 25, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 5, column: 25, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 6, column: 25, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 10, column: 21, expected: { 'padding': '4em', 'background': 'papayawhip' } },
  { line: 11, column: 21, expected: { 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 4, column: 25, prop: 'color', value: '#444', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#444' } },
  { line: 4, column: 25, prop: 'color', value: '#555', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#555' } },
  { line: 4, column: 25, prop: 'font-size', value: '3.0em', type: 'add',  expected: { 'font-size': '3.0em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 10, column: 15, prop: 'background', value: 'black', type: 'add',  expected: { 'padding': '4em', 'background': 'black' } },
  { line: 10, column: 15, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { 'padding': '10px 10px 10px 10px', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 4, column: 25, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 10, column: 15, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 4, column: 20, prop: 'font-size', value: '', type: 'remove',  expected: { 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 4, column: 20, prop: 'text-align', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'color': 'palevioletred' } },
  { line: 4, column: 20, prop: 'color', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'text-align': 'center' } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    description: 'Test adding properties',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 11, column: 21, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 11, column: 21, prop: 'text-align', value: 'center', type: 'add' },
      { line: 11, column: 21, prop: 'color', value: 'palevioletred', type: 'add' },
    ],
    inputCssString: `
<html>
  <head>
    <style>
      .button {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .buttonClose {
        padding: 4em;
        background: papayawhip;
      }
    </style>
  </head>
</html>
`,
    outputCssString: `
<html>
  <head>
    <style>
      .button {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .buttonClose {
        padding: 4em;
        background: papayawhip;
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }
    </style>
  </head>
</html>
`,
  },
  {
    description: 'Test adding and removing properties',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 10, column: 15, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 10, column: 15, prop: 'text-align', value: 'center', type: 'add' },
      { line: 10, column: 15, prop: 'color', value: 'palevioletred', type: 'add' },
      { line: 4, column: 15, prop: 'font-size', value: '', type: 'remove' },
      { line: 4, column: 15, prop: 'text-align', value: '', type: 'remove' },
      { line: 4, column: 15, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
<html>
  <head>
    <style>
      .button {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .buttonClose {
        padding: 4em;
        background: papayawhip;
      }
    </style>
  </head>
</html>
`,
    outputCssString: `
<html>
  <head>
    <style>
      .button {
      }

      .buttonClose {
        padding: 4em;
        background: papayawhip;
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }
    </style>
  </head>
</html>
`,
  },
  {
    description: 'Test CSS tag starting and ending on same line as <style>',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 10, column: 15, prop: 'font-size', value: '3em', type: 'add' },
      { line: 10, column: 15, prop: 'text-align', value: 'left', type: 'add' },
      { line: 10, column: 15, prop: 'padding', value: '3em', type: 'add' },
      { line: 4, column: 15, prop: 'color', value: 'yellow', type: 'add' },
      { line: 4, column: 15, prop: 'text-align', value: '', type: 'remove' },
      { line: 4, column: 15, prop: 'font-size', value: '', type: 'remove' },
    ],
    inputCssString: `
<html>
  <head>
    <style>.button {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .buttonClose {
        padding: 4em;
        background: papayawhip;
      }</style>
  </head>
</html>
`,
    outputCssString: `
<html>
    <head>
      <style>.button {
          color: yellow;
        }
  
        .buttonClose {
          padding: 3em;
          background: papayawhip;
          font-size: 3em;
          text-align: center;
        }</style>
    </head>
  </html>
`,
  },
];

export default testCases;
