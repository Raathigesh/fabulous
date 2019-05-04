import { Uri, ExtensionContext, Extension } from "vscode";
import { join } from "path";

export default class ContentProvider {
  getDevServerContent() {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <title>Charm</title>
  </head>
  <body>
    <div id="root">
    </div>
    <script src="http://localhost:9000/ui.bundle.js" type="text/javascript"></script>
  </body>
</html>
      `;
  }

  getProdContent(context: ExtensionContext) {
    const unBundleDiskPath = Uri.file(
      join(context.extensionPath, "dist", "ui", "ui.bundle.js")
    );
    const unBundlePath = unBundleDiskPath.with({ scheme: "vscode-resource" });

    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <title>Charm</title>
  </head>
  <body>
    <div id="root">
    </div>
    <script src="${unBundlePath}" type="text/javascript"></script>
  </body>
</html>
    `;
  }

  getContent(context: ExtensionContext) {
    if (process.env.developement) {
      return this.getDevServerContent();
    }

    return this.getProdContent(context);
  }
}
