import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import { resolve } from "path";
import Manager from "./Manager";

export function activate(context: vscode.ExtensionContext) {
  const contentProvider = new ContentProvider();
  const manager = new Manager();

  let disposable = vscode.commands.registerCommand("paintbox.showPanel", () => {
    const panel = vscode.window.createWebviewPanel(
      "charm",
      "Charm",
      vscode.ViewColumn.Two,
      {
        enableScripts: true
      }
    );

    panel.webview.html = contentProvider.getDevServerContent();
    panel.iconPath = {
      dark: vscode.Uri.file(resolve("../icons/brush.svg")),
      light: vscode.Uri.file(resolve("../icons/brush.svg"))
    };
    panel.webview.onDidReceiveMessage(
      message => {
        console.log(message);
      },
      undefined,
      context.subscriptions
    );

    setTimeout(() => {
      panel.webview.postMessage({ val: 6 });
    }, 5000);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
