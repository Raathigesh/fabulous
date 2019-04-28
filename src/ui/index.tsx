import React from "react";
import { render } from "react-dom";
import App from "./App";

declare var acquireVsCodeApi: any;

window.addEventListener("message", function(message) {
  console.log("FROM APP", message.data);
});

setTimeout(() => {
  const vscode = acquireVsCodeApi();
  vscode.postMessage({
    56: "false"
  });
  console.log("SEND MESSAGE FROM APP");
}, 3000);

render(<App />, document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(<App />, document.getElementById("root"));
  });
}
