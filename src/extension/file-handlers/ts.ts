import traverse from "@babel/traverse";
import { parse } from "../parsers/babel";
import {
  updateProperty,
  getDeclarations,
  getRules,
  removeProperty,
  getNodeSourceWithLocationOffset
} from "./utils";
import { FileHandler, EditableBlock, StyleExpressions } from "./types";

/**
 * Traverse AST and listed for the ClassDeclaration event to fire
 *
 * Example:
 * @Component()
 * class Foo { }
 *
 * This is used for Angular components that have inline styles
 *
 * @param ast babel AST
 */
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
        // TODO: do something with exception
      }
    }
  });
  return results;
}

export function getEditableBlocks(content: string, languageId: string) {
  const ast = parse(content, languageId);
  const styledBlocks = getClassDeclarationStrings(ast);

  const results: EditableBlock[] = [];

  styledBlocks.forEach(({ cssString, location }) => {
    getRules(cssString).forEach(rule => {
      const declarations = getDeclarations(rule);

      results.push({
        selector: rule.selector,
        declarations,
        source: getNodeSourceWithLocationOffset(location, rule),
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
