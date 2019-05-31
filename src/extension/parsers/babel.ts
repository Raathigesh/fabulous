import * as parser from "@babel/parser";

export function parse(code: string, languageId: string) {
  const isTS = languageId.includes("typescript");
  const plugins: parser.ParserPlugin[] = ["jsx", "classProperties"];

  if (isTS) {
    plugins.push("typescript");
    plugins.push(["decorators", { decoratorsBeforeExport: true }]);
  } else {
    plugins.push("flow");
  }

  return parser.parse(code, {
    sourceType: "module",
    plugins
  });
}
