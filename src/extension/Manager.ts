import * as vscode from "vscode";
import { getSyledDeclarations } from "./inspector";

export default class Manager {
  private activeFileContent: string = "";

  constructor() {
    vscode.window.onDidChangeActiveTextEditor(activeEditor => {
      if (activeEditor) {
        this.activeFileContent = activeEditor.document.getText();
        const declarations = getSyledDeclarations(this.activeFileContent);
      }
    });

    vscode.workspace.onDidChangeTextDocument(({ document }) => {});
  }
}
