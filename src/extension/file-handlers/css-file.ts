import * as postcss from "postcss";
import { getDeclarations, getRules, updateProperty } from "./utils";
import { FileHandler, EditableBlock } from "./types";

function getCSSRules(cssString: string) {
  const results: EditableBlock[] = [];

  getRules(cssString).forEach(rule => {
    const declarations = getDeclarations(rule);
    results.push({
      selector: rule.selector,
      declarations,
      source: rule.source,
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
  }
};
export default CSSFileInspector;
