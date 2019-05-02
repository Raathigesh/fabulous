import * as vscode from "vscode";
import getCSSRules, { Rule } from "./inspector/manipulator";

export default class Manager {
  private activeEditor: vscode.TextEditor | undefined;
  private panel: vscode.WebviewPanel;

  constructor(panel: vscode.WebviewPanel) {
    this.panel = panel;

    vscode.window.onDidChangeActiveTextEditor(activeEditor => {
      this.activeEditor = activeEditor;
      this.parseFromActiveEditor();
    });

    vscode.workspace.onDidChangeTextDocument(({ document }) => {
      this.parseFromActiveEditor();
    });

    vscode.window.onDidChangeTextEditorSelection(event => {
      this.parseFromActiveEditor();
    });
  }

  parseFromActiveEditor() {
    if (this.activeEditor) {
      const activeFileContent = this.activeEditor.document.getText();
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const payload = this.getPayloadForCSSString(
          activeFileContent,
          editor.selection.active
        );
        this.panel.webview.postMessage(payload);
      }
    }
  }

  getPayloadForCSSString(css: string, cursorPosition: vscode.Position) {
    let payload = {};

    if (this.activeEditor) {
      const activeFileContent = this.activeEditor.document.getText();
      const rules = getCSSRules(activeFileContent);
      const activeRule = this.getActiveRule(cursorPosition, rules);

      if (activeRule) {
        payload = activeRule.declarations.reduce((prev: any, declaration) => {
          prev[declaration.prop] = declaration.value;
          return prev;
        }, {});
      }
    }

    return payload;
  }

  getActiveRule(cursorPositon: vscode.Position, rules: Rule[]) {
    return rules.find(({ source }) => {
      const ruleStartPosition = new vscode.Position(
        (source && source.start && source.start.line) || 0,
        (source && source.start && source.start.column) || 0
      );

      const ruleEndPosition = new vscode.Position(
        (source && source.end && source.end.line) || 0,
        (source && source.end && source.end.column) || 0
      );

      return this.isCursorWithinRule(
        ruleStartPosition,
        ruleEndPosition,
        cursorPositon
      );
    });
  }

  isCursorWithinRule(
    ruleStart: vscode.Position,
    ruleEnd: vscode.Position,
    cursorPosition: vscode.Position
  ) {
    return (
      cursorPosition.isAfterOrEqual(ruleStart) &&
      cursorPosition.isBeforeOrEqual(ruleEnd)
    );
  }
}
