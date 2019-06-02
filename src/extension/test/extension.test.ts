import { expect, assert } from 'chai';
import { suite, test } from 'mocha-typescript'; // https://www.npmjs.com/package/mocha-typescript
import * as vscode from 'vscode';
import Manager from '../Manager';
import angularTestCases from './test-cases/angular.test-case';
import cssTestCases from './test-cases/css-file.test-case';
import htmlTestCases from './test-cases/html.test-case';
import reactTestCases from './test-cases/react.test-case';
import scssTestCases from './test-cases/scss-file.test-case';
import svelteTestCases from './test-cases/svelte.test-case';
import vueTestCases from './test-cases/vue.test-case';
import { TestCaseSetup } from './test-types';
import { createMockWebviewPanel, getCursorPositionPosition, getTestFile } from './test-utils';

/**
 * Array of all tests case setup data structures
 * This will iterate through all test cases for the of the test case setup objects in the array
 */
const allTestCases: TestCaseSetup[] = [
  cssTestCases,
  scssTestCases,
  htmlTestCases,
  reactTestCases,
  angularTestCases,
  svelteTestCases,
  vueTestCases,
];

for (const testCaseSetup of allTestCases) {
  console.log('Starting test case:', testCaseSetup.name);

  describe(testCaseSetup.name, () => {
    // store the original CSS string from when the document is read from the disk the first time
    // Each new test will use this to ensure a clean file
    let originalTextContent: string;
    let testCases: TestCaseSetup = testCaseSetup;

    /** Extend Manager class so that we can access protected class properties */
    @suite('Manager.ts Test Suite')
    class ManagerTest extends Manager {
      get currActiveEditor() {
        return this.activeEditor as vscode.TextEditor;
      }

      constructor() {
        super(createMockWebviewPanel());
      }

      // before (runs once)
      static async before() {
        // Get text from file - otherwise the file is read from the open editors with mutated data
        let document = await vscode.workspace.openTextDocument(getTestFile(testCases.testFileName));
        originalTextContent = document.getText();
      }

      // beforeEach
      async before() {
        await this.resetDocument();
      }

      // Set text document back to original state
      async resetDocument(content: string = originalTextContent) {
        const document = await vscode.workspace.openTextDocument({
          content,
          language: testCases.languageId,
        });
        const editor = await vscode.window.showTextDocument(document);
        this.activeEditor = editor;
        this.inspector = testCases.inspector;
        this.languageId = testCases.languageId;
        this.activeBlock = undefined;
      }

      @test(`Parse CSS Blocks: (${testCases.parseTestCases.length} test cases)`)
      async parseCSSBlocks() {
        const text = this.currActiveEditor.document.getText();
        let i = 0;

        for (const testCase of testCases.parseTestCases) {
          let payload = this.getPayloadForBlock(text, getCursorPositionPosition(testCase.line, testCase.column));

          expect(payload).to.deep.equal(testCase.expected, `Test case ${i} failed. ${testCase.description}`);

          i++;
        }
      }

      @test(`Update CSS Property: (${testCases.updateCssTestCases.length} test cases)`)
      async updateCssProperty() {
        let i = 0;

        for (const testCase of testCases.updateCssTestCases) {
          await this.resetDocument();
          const text = this.currActiveEditor.document.getText();
          // set active block
          this.getPayloadForBlock(text, getCursorPositionPosition(testCase.line, testCase.column));
          // update CSS
          await this.updateActiveBlock(testCase.prop, testCase.value, testCase.type);
          // re-fetch active block
          let payload = this.getPayloadForBlock(
            this.currActiveEditor.document.getText(),
            getCursorPositionPosition(testCase.line, testCase.column)
          );

          expect(payload).to.deep.equal(testCase.expected, `Test case ${i} failed. ${testCase.description}`);

          i++;
        }
      }

      @test(`Add CSS Property: (${testCases.addCssTestCases.length} test cases)`)
      async addCssProperty() {
        let i = 0;

        for (const testCase of testCases.addCssTestCases) {
          await this.resetDocument();
          const text = this.currActiveEditor.document.getText();
          // set active block
          this.getPayloadForBlock(text, getCursorPositionPosition(testCase.line, testCase.column));
          // update CSS
          await this.updateActiveBlock(testCase.prop, testCase.value, testCase.type);
          // re-fetch active block
          let payload = this.getPayloadForBlock(
            this.currActiveEditor.document.getText(),
            getCursorPositionPosition(testCase.line, testCase.column)
          );

          expect(payload).to.deep.equal(testCase.expected, `Test case ${i} failed. ${testCase.description}`);

          i++;
        }
      }

      @test(`Remove CSS Property: (${testCases.removeCssTestCases.length} test cases)`)
      async removeCssProperty() {
        let i = 0;

        for (const testCase of testCases.removeCssTestCases) {
          await this.resetDocument();
          const text = this.currActiveEditor.document.getText();
          // set active block
          this.getPayloadForBlock(text, getCursorPositionPosition(testCase.line, testCase.column));
          // update CSS
          await this.updateActiveBlock(testCase.prop, testCase.value, testCase.type);
          // re-fetch active block
          let payload = this.getPayloadForBlock(
            this.currActiveEditor.document.getText(),
            getCursorPositionPosition(testCase.line, testCase.column)
          );

          expect(payload).to.deep.equal(testCase.expected, `Test case ${i} failed. ${testCase.description}`);

          i++;
        }
      }

      @test(`Confirm Integrity After Modifications: (${testCases.modificationIntegrityTestCases.length} test cases)`)
      async confirmIntegrity() {
        let i = 0;

        for (const testCase of testCases.modificationIntegrityTestCases) {
          // reset document but provide contents instead of from file that is used from other test-cases
          await this.resetDocument(testCase.inputCssString);
          let text = this.currActiveEditor.document.getText();

          // Perform all transformations
          for (const transformation of testCase.transformations) {
            // set active block
            this.getPayloadForBlock(text, getCursorPositionPosition(transformation.line, transformation.column));
            // update CSS
            await this.updateActiveBlock(transformation.prop, transformation.value, transformation.type);
            // Update the text with the updated code
            text = this.currActiveEditor.document.getText();
          }

          const updatedDocumentText = this.currActiveEditor.document.getText();

          expect(updatedDocumentText.trim()).to.deep.equal(
            testCase.outputCssString.trim(),
            `Test case ${i} failed. ${testCase.description}`
          );

          i++;
        }
      }
    }
  });
}
