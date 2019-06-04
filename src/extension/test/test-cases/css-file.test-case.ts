import { TestCaseSetup } from "../test-types";
import CSSFileInspector from "../../file-handlers/css-file";

const testCases: TestCaseSetup = {
  name: "Test CSS Files",
  inspector: CSSFileInspector,
  languageId: "css",
  testFileName: "test-css.css",
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: []
};
// prettier-ignore
testCases.parseTestCases = [
  { line: 5, column: 25, expected: { border: "1px solid #ccc", padding: "10px", color: "#333" } },
  { line: 11, column: 22, expected: { "border-color": "green" } },
  { line: 15, column: 20, expected: { "border-color": "red" } },
  { line: 19, column: 23, expected: { "border-color": "yellow" } },
  { line: 21, column: 0, expected: null },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 5, column: 25, prop: 'color', value: '#444', type: 'add',  expected: { border: "1px solid #ccc", padding: "10px", color: "#444" } },
  { line: 5, column: 25, prop: 'color', value: '#555', type: 'add',  expected: { border: "1px solid #ccc", padding: "10px", color: "#555" } },
  { line: 5, column: 25, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { border: "1px solid #ccc", padding: "10px 10px 10px 10px", color: "#333" } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 11, column: 22, prop: 'color', value: '#444', type: 'add',  expected: { "border-color": "green", color: "#444" } },
  { line: 11, column: 22, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { "border-color": "green", padding: "10px 10px 10px 10px" } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 5, column: 25, prop: 'color', value: "", type: 'remove',  expected: { border: "1px solid #ccc", padding: "10px" } },
  { line: 5, column: 25, prop: 'border', value: "", type: 'remove',  expected: { padding: "10px", color: "#333" } },
  { line: 5, column: 25, prop: 'padding', value: "", type: 'remove',  expected: { border: "1px solid #ccc", color: "#333" } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 6, column: 20, prop: 'border-color', value: '#444', type: 'add' },
      { line: 10, column: 23, prop: 'border', value: '1px solid #ccc', type: 'add' },
      { line: 2, column: 22, prop: 'border-color', value: "", type: 'remove' },
    ],
    inputCssString: `
.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
`,
    outputCssString: `
.success {
}

.error {
  border-color: #444;
}

.warning {
  border-color: yellow;
  border: 1px solid #ccc;
}
`
  }
];

export default testCases;
