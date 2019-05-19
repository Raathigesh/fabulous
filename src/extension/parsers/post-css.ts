import * as postcss from "postcss";
import console = require("console");

export const processWithPlugin = (
  cssString: string,
  plugin: any,
  syntax?: postcss.Syntax
) => {
  const options = syntax ? { syntax: syntax as any } : undefined;
  const result = postcss([plugin]).process(cssString, options);
  return result.css;
};
