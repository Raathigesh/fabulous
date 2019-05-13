import * as postcss from "postcss";
import {
  getDeclarations,
  getRules,
  updateProperty,
  removeProperty
} from "./utils";
import { FileHandler, EditableBlock } from "./types";

function getCSSRules(cssString: string) {
  const results: EditableBlock[] = [];

  getRules(cssString).forEach(rule => {
    const declarations = getDeclarations(rule);
    const location = rule.source;
    const source = {
      start: {
        column: (location && location.start && location.start.column - 1) || 0,
        line: (location && location.start && location.start.line - 1) || 0
      },
      end: {
        column: (location && location.end && location.end.column) || 0,
        line: (location && location.end && location.end.line - 1) || 0
      },
      input: null as any
    };

    results.push({
      selector: rule.selector,
      declarations,
      source,
      rule
    });
  });
  return results;
}

const CSSFileInspector: FileHandler = {
  getEdiableBlocks(fileContent: string) {
    return getCSSRules(fileContent);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    return updateProperty(activeBlock.rule, prop, value);
  },
  removeProperty(activeBlock: EditableBlock, prop: string) {
    return removeProperty(activeBlock.rule, prop);
  }
};
export default CSSFileInspector;
