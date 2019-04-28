export default class ContentProvider {
  getDevServerContent() {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <title>PaintBox</title>
  </head>
  <body>
    <div id="root">
    </div>
    <script src="http://localhost:9000/ui.bundle.js" type="text/javascript"></script>
  </body>
</html>
      `;
  }
}
