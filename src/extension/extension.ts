import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import { resolve, join } from "path";
import Manager from "./Manager";

export function activate(context: vscode.ExtensionContext) {
  const contentProvider = new ContentProvider();
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  let disposable = vscode.commands.registerCommand("fabulous.showPanel", () => {
    if (currentPanel) {
      currentPanel.reveal(vscode.ViewColumn.Two);
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        "fabulous",
        "Fabulous",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );
    }

    currentPanel.webview.html = contentProvider.getContent(context);

    const root = join(context.extensionPath, "icons");
    currentPanel.iconPath = {
      dark: vscode.Uri.file(join(root, "icon-light.svg")),
      light: vscode.Uri.file(join(root, "icon-dark.svg"))
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
