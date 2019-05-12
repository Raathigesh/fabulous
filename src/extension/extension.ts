import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import { resolve } from "path";
import Manager from "./Manager";

export function activate(context: vscode.ExtensionContext) {
  const contentProvider = new ContentProvider();
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  let disposable = vscode.commands.registerCommand("charm.showPanel", () => {
    if (currentPanel) {
      currentPanel.reveal(vscode.ViewColumn.Two);
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        "charm",
        "Fabulous",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );
    }

    currentPanel.webview.html = contentProvider.getContent(context);
    currentPanel.iconPath = {
      dark: vscode.Uri.file(resolve("../icons/brush.svg")),
      light: vscode.Uri.file(resolve("../icons/brush.svg"))
    };

    const manager = new Manager(currentPanel);

    currentPanel.webview.onDidReceiveMessage(
      message => {
        manager.updateActiveBlock(message.prop, message.value, message.type);
      },
      undefined,
      context.subscriptions
    );

    currentPanel.onDidDispose(
      () => {
        currentPanel = undefined;
      },
      null,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
