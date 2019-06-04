import * as postcssScss from 'postcss-scss';
import { getDeclarations, getRules, updateProperty, removeProperty } from './utils';
import { FileHandler, EditableBlock, SupportedFiletypes } from './types';

function getCSSRules(cssString: string, languageId: string) {
  const results: EditableBlock[] = [];
  const syntax = languageId === 'scss' ? postcssScss : undefined;

  getRules(cssString, syntax).forEach(rule => {
    const declarations = getDeclarations(rule);
    const location = rule.source;
    const source = {
      start: {
        column: (location && location.start && location.start.column - 1) || 0,
        line: (location && location.start && location.start.line - 1) || 0,
      },
      end: {
        column: (location && location.end && location.end.column) || 0,
        line: (location && location.end && location.end.line - 1) || 0,
      },
      input: null as any,
    };

    results.push({
      selector: rule.selector,
      declarations,
      source,
      rule,
    });
  });
  return results;
}

const CSSFileInspector: FileHandler = {
  getEditableBlocks(fileContent: string, languageId: SupportedFiletypes) {
    return getCSSRules(fileContent, languageId);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    return updateProperty(activeBlock.rule, prop, value);
  },
  removeProperty(activeBlock: EditableBlock, prop: string) {
    return removeProperty(activeBlock.rule, prop);
  },
};
export default CSSFileInspector;
