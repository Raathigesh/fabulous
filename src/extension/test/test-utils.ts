import * as vscode from "vscode";
import * as path from "path";

export function getTestFile(filename: string) {
  return path.join(
    __dirname,
    "../../../src/extension/test/test-files",
    filename
  );
}

export function createMockWebviewPanel(): vscode.WebviewPanel {
  return vscode.window.createWebviewPanel(
    "fabulous",
    "Fabulous",
    vscode.ViewColumn.Two,
    {
      enableScripts: true,
      retainContextWhenHidden: true
    }
  );
}

export function getCursorPositionPosition(
  line: number,
  col: number
): vscode.Position {
  return new vscode.Position(line, col);
}

// If we need this we can uncomment - I thought we did initially, but then ended up not using it
// export function getCursorPositionSelection(
//   line: number,
//   col: number
// ): vscode.Selection {
//   var newPosition = getCursorPositionPosition(line, col);
//   return new vscode.Selection(newPosition, newPosition);
// }

// If we need this we can uncomment - I thought we did initially, but then ended up not using it
// export function panelReceivedMessage(panel: vscode.WebviewPanel): Promise<any> {
//   return new Promise(async (resolve, reject) => {
//     panel.webview.onDidReceiveMessage(message => {
//       resolve(message);
//     });
//   });
// }
