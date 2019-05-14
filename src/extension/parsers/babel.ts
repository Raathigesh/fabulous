import * as parser from "@babel/parser";

export function parse(code: string, languageId: string) {
  const isTS = languageId === "typescriptreact";
  const additionalPlugin = isTS ? "typescript" : "flow";

  return parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "classProperties", additionalPlugin]
  });
}
