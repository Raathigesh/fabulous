import { TestCaseSetup } from '../test-types';
import HtmlInspector from '../../file-handlers/html';

const testCases: TestCaseSetup = {
  name: 'Test Svelte Files',
  inspector: HtmlInspector,
  languageId: 'svelte',
  testFileName: 'test-svelte.svelte',
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: [],
};

// prettier-ignore
testCases.parseTestCases = [
  { line: 2, column: 15, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 3, column: 15, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 4, column: 15, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 8, column: 10, expected: { 'padding': '4em', 'background': 'papayawhip' } },
  { line: 9, column: 10, expected: { 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 2, column: 15, prop: 'color', value: '#444', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#444' } },
  { line: 2, column: 15, prop: 'color', value: '#555', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#555' } },
  { line: 2, column: 15, prop: 'font-size', value: '3.0em', type: 'add',  expected: { 'font-size': '3.0em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 8, column: 10, prop: 'background', value: 'black', type: 'add',  expected: { 'padding': '4em', 'background': 'black' } },
  { line: 8, column: 10, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { 'padding': '10px 10px 10px 10px', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 2, column: 15, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 8, column: 10, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 2, column: 15, prop: 'font-size', value: '', type: 'remove',  expected: { 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 2, column: 15, prop: 'text-align', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'color': 'palevioletred' } },
  { line: 2, column: 15, prop: 'color', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'text-align': 'center' } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    description: 'Test adding properties',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 9, column: 17, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 9, column: 17, prop: 'text-align', value: 'center', type: 'add' },
      { line: 9, column: 17, prop: 'color', value: 'palevioletred', type: 'add' },
    ],
    inputCssString: `
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

<p>Styled!</p>
`,
    outputCssString: `
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

<p>Styled!</p>
`,
  },
  {
    description: 'Test adding and removing properties',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 8, column: 10, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 8, column: 10, prop: 'text-align', value: 'center', type: 'add' },
      { line: 8, column: 10, prop: 'color', value: 'palevioletred', type: 'add' },
      { line: 2, column: 15, prop: 'font-size', value: '', type: 'remove' },
      { line: 2, column: 15, prop: 'text-align', value: '', type: 'remove' },
      { line: 2, column: 15, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
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

<p>Styled!</p>
`,
    outputCssString: `
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

<p>Styled!</p>
`,
  },
  {
    description: 'Test CSS tag starting and ending on same line as <style>',
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 8, column: 10, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 8, column: 10, prop: 'text-align', value: 'center', type: 'add' },
      { line: 8, column: 10, prop: 'color', value: 'palevioletred', type: 'add' },
      { line: 2, column: 15, prop: 'font-size', value: '', type: 'remove' },
      { line: 2, column: 15, prop: 'text-align', value: '', type: 'remove' },
      { line: 2, column: 15, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
<style>.button {
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  }

  .buttonClose {
    padding: 4em;
    background: papayawhip;
  }</style>

<p>Styled!</p>
`,
    outputCssString: `
<style>.button {
  }

  .buttonClose {
    padding: 3em;
    background: papayawhip;
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  }</style>

<p>Styled!</p>
`,
  },
];

export default testCases;
