import * as vscode from "vscode";
import { FileHandler, EditableBlock } from "./file-handlers/types";
import CSSFileInspector from "./file-handlers/css-file";
import StyledComponentsInspector from "./file-handlers/js";
import DecoratedClassComponentsInspector from "./file-handlers/ts";

export default class Manager {
  private activeEditor: vscode.TextEditor | undefined;
  private panel: vscode.WebviewPanel;
  private activeBlock: EditableBlock | undefined;
  private inspector: FileHandler | undefined;
  private languageId: string = "";

  constructor(panel: vscode.WebviewPanel) {
    this.panel = panel;

    vscode.window.onDidChangeActiveTextEditor(activeEditor => {
      const languageId = activeEditor
        ? activeEditor.document.languageId
        : undefined;
      if (
        languageId === "css" ||
        languageId === "scss" ||
        languageId === "postcss"
      ) {
        this.inspector = CSSFileInspector;
        this.activeEditor = activeEditor;
        this.languageId = languageId;
      } else if (
        languageId === "javascript" ||
        languageId === "javascriptreact" ||
        languageId === "typescriptreact"
      ) {
        this.inspector = StyledComponentsInspector;
        this.activeEditor = activeEditor;
        this.languageId = languageId;
      } else if (languageId === "typescript") {
        this.inspector = DecoratedClassComponentsInspector;
        this.activeEditor = activeEditor;
        this.languageId = languageId;
      }
    });

    vscode.workspace.onDidChangeTextDocument(({ document }) => {
      if (this.isAcceptableLaguage(document.languageId)) {
        this.parseFromActiveEditor();
      }
    });

    vscode.window.onDidChangeTextEditorSelection(({ textEditor }) => {
      if (
        textEditor &&
        this.isAcceptableLaguage(textEditor.document.languageId)
      ) {
        this.activeEditor = textEditor;
        this.parseFromActiveEditor();
      }
    });
  }

  isAcceptableLaguage(languageId: string) {
    return (
      languageId === "css" ||
      languageId === "scss" ||
      languageId === "postcss" ||
      languageId === "javascript" ||
      languageId === "typescript" ||
      languageId === "javascriptreact" ||
      languageId === "typescriptreact"
    );
  }

  parseFromActiveEditor() {
    if (this.activeEditor) {
      const activeFileContent = this.activeEditor.document.getText();
      const payload = this.getPayloadForBlock(
        activeFileContent,
        this.activeEditor.selection.active
      );
      this.panel.webview.postMessage({
        type: "activeBlock",
        payload
      });
    }
  }

  getPayloadForBlock(
    activeFileContent: string,
    cursorPosition: vscode.Position
  ) {
    let payload = null;
    if (this.inspector) {
      const blocks = this.inspector.getEditableBlocks(
        activeFileContent,
        this.languageId
      );
      const activeBlock = this.getActiveBlock(cursorPosition, blocks);

      this.activeBlock = activeBlock;
      if (activeBlock) {
        payload = activeBlock.declarations.reduce((prev: any, declaration) => {
          prev[declaration.prop] = declaration.value;
          return prev;
        }, {});
      }
    }
    return payload;
  }

  getActiveBlock(cursorPositon: vscode.Position, blocks: EditableBlock[]) {
    const blocksWithinCursor = blocks.filter(({ source }) => {
      const ruleStartPosition = new vscode.Position(
        (source && source.start && source.start.line) || 0,
        (source && source.start && source.start.column) || 0
      );

      const ruleEndPosition = new vscode.Position(
        (source && source.end && source.end.line) || 0,
        (source && source.end && source.end.column) || 0
      );

      return this.isCursorWithinBlock(
        ruleStartPosition,
        ruleEndPosition,
        cursorPositon
      );
    });

    if (blocksWithinCursor.length === 1) {
      return blocksWithinCursor[0];
    } else {
      let closestRule = blocksWithinCursor[0];
      blocksWithinCursor.forEach(rule => {
        const { source } = rule;
        const { source: closestBlockSource } = closestRule;
        if (
          (closestBlockSource &&
            closestBlockSource.start &&
            (closestBlockSource.start.line as any)) <
          (source && source.start && (source.start.line as any))
        ) {
          closestRule = rule;
        }
      });

      return closestRule;
    }
  }

  isCursorWithinBlock(
    ruleStart: vscode.Position,
    ruleEnd: vscode.Position,
    cursorPosition: vscode.Position
  ) {
    return (
      cursorPosition.isAfterOrEqual(ruleStart) &&
      cursorPosition.isBeforeOrEqual(ruleEnd)
    );
  }

  updateActiveBlock(prop: string, value: string, type: "add" | "remove") {
    if (this.activeBlock && this.inspector) {
      let updatedCSS = "";

      if (type === "add") {
        updatedCSS = this.inspector.updateProperty(
          this.activeBlock,
          prop,
          value,
          this.languageId
        );
      } else {
        updatedCSS = this.inspector.removeProperty(this.activeBlock, prop);
      }

      if (this.activeEditor) {
        const source = this.activeBlock.source;
        const ruleStartPosition = new vscode.Position(
          (source && source.start && source.start.line) || 0,
          (source && source.start && source.start.column) || 0
        );

        const ruleEndPosition = new vscode.Position(
          (source && source.end && source.end.line) || 0,
          (source && source.end && source.end.column) || 0
        );

        this.activeEditor
          .edit(editBuilder => {
            editBuilder.replace(
              new vscode.Range(ruleStartPosition, ruleEndPosition),
              updatedCSS
            );
          })
          .then(() => {
            if (this.activeEditor && this.inspector) {
              const activeFileContent = this.activeEditor.document.getText();
              const blocks = this.inspector.getEditableBlocks(
                activeFileContent,
                this.languageId
              );
              const activeRule = this.getActiveBlock(
                this.activeEditor.selection.active,
                blocks
              );
              this.activeBlock = activeRule;
            }
          });
      }
    }
  }
}
