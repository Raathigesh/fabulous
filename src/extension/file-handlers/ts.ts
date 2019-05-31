import traverse from "@babel/traverse";
import { parse } from "../parsers/babel";
import {
  updateProperty,
  getDeclarations,
  getRules,
  removeProperty
} from "./utils";
import { FileHandler, EditableBlock, StyleExpressions } from "./types";
import console = require("console");

export function getClassDeclarationStrings(ast: any) {
  const results: StyleExpressions[] = [];
  traverse(ast, {
    ClassDeclaration(path: any) {
      try {
        const stylesNode = path.node.decorators[0].expression.arguments[0].properties.find(
          (prop: any) => prop.key.name === "styles"
        );
        if (stylesNode && stylesNode.value.elements.length > 0) {
          const cssString = stylesNode.value.elements[0].quasis[0].value.raw;
          const location = stylesNode.value.elements[0].quasis[0].loc;

          results.push({
            name: path.node.id.name,
            cssString: cssString,
            location: {
              start: {
                column: (location.start && location.start.column) || 0,
                line: (location.start && location.start.line - 1) || 0
              },
              end: {
                column: (location.end && location.end.column) || 0,
                line: (location.end && location.end.line - 1) || 0
              },
              input: null as any
            }
          });
        }
      } catch (ex) {
        // ignore?
        console.log("Error", ex);
      }
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
    ClassDeclaration(path: any) {
      try {
        if (path.node.id.name) {
          const stylesNode = path.node.decorators[0].expression.arguments[0].properties.find(
            (prop: any) => prop.key.name === "styles"
          );
          if (stylesNode && stylesNode.value.elements.length > 0) {
            const cssString = stylesNode.value.elements[0].quasis[0].value.raw;
            updatedCssString = updateProperty(cssString, property, value);
            stylesNode.value.elements[0].quasis[0].value.raw = updatedCssString;
          }
        }
      } catch (ex) {
        // ignore?
        console.log("Error", ex);
      }
    }
  });
}

export function getEditableBlocks(content: string, languageId: string) {
  const ast = parse(content, languageId);
  const styledBlocks = getClassDeclarationStrings(ast);

  const results: EditableBlock[] = [];

  styledBlocks.forEach(({ cssString, location }) => {
    getRules(cssString).forEach(rule => {
      const declarations = getDeclarations(rule);

      // Get accurate overall locations based on total document and rule within styles string
      const locStart = location.start ? location.start : { column: 0, line: 0 };
      const sourceStart = (rule.source && rule.source.start) || {
        column: 0,
        line: 0
      };
      const sourceEnd = (rule.source && rule.source.end) || {
        column: 0,
        line: 0
      };

      const startLine = locStart.line + sourceStart.line - 1;
      const endLine = startLine + sourceEnd.line - sourceStart.line;
      // If ` is on the same line as the CSS tag, then the start column should be the actual column
      let startColumn =
        sourceStart.line === 1 ? locStart.column : sourceStart.column - 1;

      results.push({
        selector: rule.selector,
        declarations,
        source: {
          start: {
            column: startColumn,
            line: startLine
          },
          end: {
            column: sourceEnd.column,
            line: endLine
          },
          input: (rule.source as any).input
        },
        rule
      });
    });
  });
  return results;
}

const DecoratedClassComponentsInspector: FileHandler = {
  getEditableBlocks(fileContent: string, languageId: string) {
    return getEditableBlocks(fileContent, languageId);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    return updateProperty(activeBlock.rule, prop, value);
  },
  removeProperty(activeBlock: EditableBlock, prop: string) {
    return removeProperty(activeBlock.rule, prop);
  }
};
export default DecoratedClassComponentsInspector;
