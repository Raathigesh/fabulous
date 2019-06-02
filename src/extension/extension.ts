import * as vscode from "vscode";
import ContentProvider from "./ContentProvider";
import { join } from "path";
import Manager from "./Manager";
import { isAngularComponentRegex } from "./file-handlers/utils";

export function activate(context: vscode.ExtensionContext) {
  const contentProvider = new ContentProvider();
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  /**
   * Set a custom context variable of "isAngularComponent" so that in package.json  menus.editor/title "when" clause can distinguish
   * Angular components from other typescript files so that the plugin can remain dormant for regular typescript files
   */
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(activeEditor => {
      if (activeEditor) {
        let isAngularComponent = false;
        try {
          isAngularComponent = isAngularComponentRegex.test(
            activeEditor.document.uri.path
          );
        } catch (ex) {
          console.log("Error checking isAngularComponent", ex);
        } finally {
          vscode.commands.executeCommand(
            "setContext",
            "isAngularComponent",
            isAngularComponent
          );
        }
      }
    })
  );

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
      dark: vscode.Uri.file(join(root, "icon-light.png")),
      light: vscode.Uri.file(join(root, "icon-dark.png"))
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
