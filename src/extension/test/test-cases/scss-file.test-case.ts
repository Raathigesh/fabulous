import { TestCaseSetup } from "../test-types";
import CSSFileInspector from "../../file-handlers/css-file";

const testCases: TestCaseSetup = {
  name: "Test SCSS Files",
  inspector: CSSFileInspector,
  languageId: "scss",
  testFileName: "test-scss.scss",
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: []
};
// prettier-ignore
testCases.parseTestCases = [
  { line: 2, column: 25, expected: { border: "1px solid #ccc", padding: "10px", color: "#333" } },
  { line: 9, column: 16, expected: { display: "flex", "flex-wrap": "wrap" } },
  { line: 19, column: 22, expected: { "border-color": "green" } },
  { line: 23, column: 26, expected: { "border-color": "red" } },
  { line: 100, column: 0, expected: null },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 2, column: 25, prop: "color", value: "#444", type: "add",  expected: { border: "1px solid #ccc", padding: "10px", color: "#444" } },
  { line: 2, column: 25, prop: "color", value: "#555", type: "add",  expected: { border: "1px solid #ccc", padding: "10px", color: "#555" } },
  { line: 2, column: 25, prop: "padding", value: "10px 10px 10px 10px", type: "add",  expected: { border: "1px solid #ccc", padding: "10px 10px 10px 10px", color: "#333" } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 4, column: 14, prop: "border-color", value: "black", type: "add",  expected: { "border-color": "black", border: "1px solid #ccc", padding: "10px", color: "#333" } },
  { line: 14, column: 26, prop: "padding", value: "10px 10px 10px 10px", type: "add",  expected: { padding: "10px 10px 10px 10px" } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 2, column: 25, prop: "color", value: "", type: "remove",  expected: { border: "1px solid #ccc", padding: "10px" } },
  { line: 2, column: 25, prop: "border", value: "", type: "remove",  expected: { padding: "10px", color: "#333" } },
  { line: 2, column: 25, prop: "padding", value: "", type: "remove",  expected: { border: "1px solid #ccc", color: "#333" } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 10, column: 16, prop: "border", value: "1px solid #ccc", type: "add" },
      { line: 2, column: 22, prop: "border", value: "", type: "remove" },
    ],
    inputCssString: `
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
    
`,
    outputCssString: `
/* This CSS will print because %message-shared is extended. */
%message-shared {
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
    
`
  }
];

export default testCases;
