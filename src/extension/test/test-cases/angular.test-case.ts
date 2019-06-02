import { TestCaseSetup } from '../test-types';
import DecoratedClassComponentsInspector from '../../file-handlers/ts';

const testCases: TestCaseSetup = {
  name: 'Test Angular Files',
  inspector: DecoratedClassComponentsInspector,
  languageId: 'typescript',
  testFileName: 'test-angular.component.ts',
  parseTestCases: [],
  updateCssTestCases: [],
  addCssTestCases: [],
  removeCssTestCases: [],
  modificationIntegrityTestCases: [],
};

// prettier-ignore
testCases.parseTestCases = [
  { line: 11, column: 25, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 12, column: 27, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 13, column: 29, expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 17, column: 21, expected: { 'padding': '4em', 'background': 'papayawhip' } },
  { line: 17, column: 22, expected: { 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.updateCssTestCases = [
  { line: 11, column: 25, prop: 'color', value: '#444', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#444' } },
  { line: 11, column: 25, prop: 'color', value: '#555', type: 'add',  expected: { 'font-size': '1.5em', 'text-align': 'center', 'color': '#555' } },
  { line: 11, column: 25, prop: 'font-size', value: '3.0em', type: 'add',  expected: { 'font-size': '3.0em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 17, column: 22, prop: 'background', value: 'black', type: 'add',  expected: { 'padding': '4em', 'background': 'black' } },
  { line: 17, column: 22, prop: 'padding', value: '10px 10px 10px 10px', type: 'add',  expected: { 'padding': '10px 10px 10px 10px', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.addCssTestCases = [
  { line: 11, column: 25, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'font-size': '1.5em', 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 17, column: 22, prop: 'border-color', value: 'black', type: 'add',  expected: { 'border-color': 'black', 'padding': '4em', 'background': 'papayawhip' } },
];

// prettier-ignore
testCases.removeCssTestCases = [
  { line: 11, column: 25, prop: 'font-size', value: '', type: 'remove',  expected: { 'text-align': 'center', 'color': 'palevioletred' } },
  { line: 11, column: 25, prop: 'text-align', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'color': 'palevioletred' } },
  { line: 11, column: 25, prop: 'color', value: '', type: 'remove',  expected: { 'font-size': '1.5em', 'text-align': 'center' } },
];

// prettier-ignore
testCases.modificationIntegrityTestCases = [
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 18, column: 21, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 18, column: 21, prop: 'text-align', value: 'center', type: 'add' },
      { line: 18, column: 21, prop: 'color', value: 'palevioletred', type: 'add' },
    ],
    inputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .section {
        padding: 4em;
        background: papayawhip;
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
    outputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .section {
        padding: 4em;
        background: papayawhip;
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
  },
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 18, column: 21, prop: 'font-size', value: '1.5em', type: 'add' },
      { line: 18, column: 21, prop: 'text-align', value: 'center', type: 'add' },
      { line: 18, column: 21, prop: 'color', value: 'palevioletred', type: 'add' },
      { line: 18, column: 21, prop: 'padding', value: '', type: 'remove' },
      { line: 18, column: 21, prop: 'background', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'font-size', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'text-align', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .section {
        padding: 4em;
        background: papayawhip;
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
    outputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
      }

      .section {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
  },
  {
    // The order of these is important because it could change the line numbers based on operation
    transformations: [
      { line: 18, column: 21, prop: 'padding', value: '', type: 'remove' },
      { line: 18, column: 21, prop: 'background', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'font-size', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'text-align', value: '', type: 'remove' },
      { line: 12, column: 25, prop: 'color', value: '', type: 'remove' },
    ],
    inputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
        font-size: 1.5em;
        text-align: center;
        color: palevioletred;
      }

      .section {
        padding: 4em;
        background: papayawhip;
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
    outputCssString: `
// Mocked decorator to allow typescript to compile
function Component(target: any) {
  return function(target: any) {};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    \`
      .h1 {
      }

      .section {
      }
    \`
  ]
})
export class AppComponent {
  title = 'fabulous-test';
}
`,
  }
];

export default testCases;
