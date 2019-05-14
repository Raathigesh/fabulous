import traverse from "@babel/traverse";
import { parse } from "../parsers/babel";
import {
  updateProperty,
  getDeclarations,
  getRules,
  removeProperty
} from "./utils";
import { FileHandler, EditableBlock } from "./types";
import { NodeSource } from "postcss";

interface StyleExpresions {
  name: string;
  cssString: string;
  location: NodeSource;
}

function wrapWithDummySelector(declaraions: string) {
  return `.dummy{${declaraions}}`;
}

export function getTaggedTemplateExpressionStrings(ast: any) {
  const results: StyleExpresions[] = [];
  traverse(ast, {
    TaggedTemplateExpression(path: any) {
      const cssString = path.node.quasi.quasis[0].value.raw;
      const location = path.node.quasi.loc;

      results.push({
        name: path.parent.id.name,
        cssString: wrapWithDummySelector(cssString),
        location: {
          start: {
            column: (location.start && location.start.column) || 0,
            line: (location.start && location.start.line - 1) || 0
          },
          end: {
            column: (location.end && location.end.column) || 0,
            line: (location.end && location.end.line - 1) || 0
          },
          input: path.node.quasi.loc.input
        }
      });
    }
  });
  return results;
}

export function updateCSSProperty(
  content: string,
  name: string,
  property: string,
  value: string,
  languageId: string
) {
  const ast = parse(content, languageId);
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
}

export function getEditableBlocks(content: string, languageId: string) {
  const ast = parse(content, languageId);
  const styledBlocks = getTaggedTemplateExpressionStrings(ast);

  const results: EditableBlock[] = [];

  styledBlocks.forEach(({ cssString, location }) => {
    getRules(cssString).forEach(rule => {
      const declarations = getDeclarations(rule);
      results.push({
        selector: rule.selector,
        declarations,
        source: location,
        rule
      });
    });
  });
  return results;
}

const StyledComponentsInspector: FileHandler = {
  getEdiableBlocks(fileContent: string, languageId: string) {
    return getEditableBlocks(fileContent, languageId);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    let updatedCSS = updateProperty(activeBlock.rule, prop, value);
    updatedCSS = updatedCSS.substr(7, updatedCSS.length); // removes .dummy{
    updatedCSS = updatedCSS.substr(0, updatedCSS.length - 1); // removes }
    updatedCSS = `\`${updatedCSS}\``; // ads the `` back
    return updatedCSS;
  },
  removeProperty(activeBlock: EditableBlock, prop: string) {
    let updatedCSS = removeProperty(activeBlock.rule, prop);
    updatedCSS = updatedCSS.substr(7, updatedCSS.length); // removes .dummy{
    updatedCSS = updatedCSS.substr(0, updatedCSS.length - 1); // removes }
    updatedCSS = `\`${updatedCSS}\``; // ads the `` back
    return updatedCSS;
  }
};
export default StyledComponentsInspector;
