import * as postcss from "postcss";
import {
  getDeclarations,
  processWithPlugin,
  EditableBlock,
  getRules,
  updateProperty
} from "./utils";
import { Inspector } from "./inspector";

function getCSSRules(cssString: string) {
  const results: EditableBlock[] = [];

  getRules(cssString).forEach(rule => {
    const declarations = getDeclarations(rule);
    results.push({
      selector: rule.selector,
      declarations,
      source: rule.source,
      raw: rule.toString(),
      rule
    });
  });
  return results;
}

const CSSFileInspector: Inspector = {
  getEdiableBlocks(fileContent: string) {
    return getCSSRules(fileContent);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    return updateProperty(activeBlock.rule, prop, value);
  }
};
export default CSSFileInspector;
