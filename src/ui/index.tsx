import React from "react";
import { render } from "react-dom";
import App from "./App";

render(<App />, document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(<App />, document.getElementById("root"));
  });
}
