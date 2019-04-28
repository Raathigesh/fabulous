import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { parse } from "../parser";
import process, { updateProperty } from "./manipulator";

interface StyleExpresions {
  name: string;
  cssString: string;
}

export function getTaggedTemplateExpressionStrings(ast: any) {
  const results: StyleExpresions[] = [];
  traverse(ast, {
    TaggedTemplateExpression(path: any) {
      const cssString = path.node.quasi.quasis[0].value.raw;
      results.push({
        name: path.parent.id.name,
        cssString
      });
    }
  });
  return results;
}

export function updateCSSProperty(
  content: string,
  name: string,
  property: string,
  value: string
) {
  const ast = parse(content);
  let updatedCssString = "";

  traverse(ast, {
    TaggedTemplateExpression(path: any) {
      if (path.parent.id.name === name) {
        const cssString = path.node.quasi.quasis[0].value.raw;
        updatedCssString = updateProperty(cssString, property, value);
        path.node.quasi.quasis[0].value.raw = updatedCssString;
      }
    }
  });

  const code = generate(ast).code;
  return process(updatedCssString);
}

export function getSyledDeclarations(content: string) {
  const ast = parse(content);

  const cssStrings = getTaggedTemplateExpressionStrings(ast);
  const declarations = cssStrings.map(function(cssString) {
    return {
      name: cssString.name,
      declarations: process(cssString.cssString)
    };
  });

  return declarations;
}
