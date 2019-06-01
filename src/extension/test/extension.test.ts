/**
 * TODO:
 * Add tests for all file types
 * Add tests that change and then validate overall file to ensure output is the expected output (todo: create an array of before and after strings to make it dynamic)
 * UI unit tests
 */

// The module 'assert' provides assertion methods from node
import * as assert from "assert";
import { suite, test } from "mocha-typescript"; // https://www.npmjs.com/package/mocha-typescript
import * as vscode from "vscode";
import Manager from "../Manager";
import {
  createMockWebviewPanel,
  getCursorPositionPosition,
  getTestFile
} from "./test-utils";
import CSSFileInspector from "../file-handlers/css-file";

describe("Test CSS Files", () => {
  // store the original CSS string from when the document is read from the disk the first time
  // Each new test will use this to ensure a clean file
  let originalTextContent: string;

  /** Extend Manager class so that we can access protected class properties */
  @suite
  class ManagerTest extends Manager {
    constructor() {
      super(createMockWebviewPanel());
    }

    // Runs once before all tests
    static async before() {
      // Get text from file - otherwise the file is read from the open editors with mutated data
      let document = await vscode.workspace.openTextDocument(
        getTestFile("test-css.css")
      );
      originalTextContent = document.getText();
    }

    // equivalent to beforeEach
    async before() {
      const document = await vscode.workspace.openTextDocument({
        content: originalTextContent,
        language: "css"
      });
      const editor = await vscode.window.showTextDocument(document);
      this.activeEditor = editor;
      this.inspector = CSSFileInspector;
      this.languageId = "css";
      this.activeBlock = undefined;
    }

    @test("Parse CSS Blocks") async parseCSSBlocks() {
      if (this.activeEditor) {
        const text = this.activeEditor.document.getText();
        let payload = this.getPayloadForBlock(
          text,
          getCursorPositionPosition(5, 25)
        );

        assert.deepEqual(payload, {
          border: "1px solid #ccc",
          padding: "10px",
          color: "#333"
        });

        payload = this.getPayloadForBlock(
          text,
          getCursorPositionPosition(11, 22)
        );

        assert.deepEqual(payload, {
          "border-color": "green"
        });

        payload = this.getPayloadForBlock(
          text,
          getCursorPositionPosition(15, 20)
        );

        assert.deepEqual(payload, {
          "border-color": "red"
        });

        payload = this.getPayloadForBlock(
          text,
          getCursorPositionPosition(19, 23)
        );

        assert.deepEqual(payload, {
          "border-color": "yellow"
        });

        payload = this.getPayloadForBlock(
          text,
          getCursorPositionPosition(21, 0)
        );

        assert.equal(payload, null);
      } else {
        assert(false, "Active Editor was not initialized");
      }
    }

    @test("Update CSS Property") async updateCssProperty() {
      if (this.activeEditor) {
        // set activeBlock
        this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        await this.updateActiveBlock("color", "#444", "add");

        let payload = this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        assert.deepEqual(payload, {
          border: "1px solid #ccc",
          padding: "10px",
          color: "#444"
        });
      } else {
        assert(false, "Active Editor was not initialized");
      }
    }

    @test("Add CSS Property") async addCssProperty() {
      if (this.activeEditor) {
        // set activeBlock
        this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        await this.updateActiveBlock("background-color", "white", "add");

        let payload = this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        assert.deepEqual(payload, {
          border: "1px solid #ccc",
          padding: "10px",
          color: "#333",
          "background-color": "white"
        });
      } else {
        assert(false, "Active Editor was not initialized");
      }
    }

    @test("Remove CSS Property") async removeCssProperty() {
      if (this.activeEditor) {
        // set activeBlock
        this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        await this.updateActiveBlock("color", "#333", "remove");

        let payload = this.getPayloadForBlock(
          this.activeEditor.document.getText(),
          getCursorPositionPosition(5, 25)
        );

        assert.deepEqual(payload, {
          border: "1px solid #ccc",
          padding: "10px"
        });
      } else {
        assert(false, "Active Editor was not initialized");
      }
    }
  }
});
