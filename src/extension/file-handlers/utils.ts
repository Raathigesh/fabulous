import * as postcss from 'postcss';
import { Rule, Declaration, NodeSource } from 'postcss';
import { processWithPlugin } from '../parsers/post-css';
import { SupportedFiletypes } from './types';

export const isAngularComponentRegex = /.component.ts$/;

export const getRules = (cssString: string, syntax?: postcss.Syntax) => {
  const results: Rule[] = [];
  const DeclarationWalker = postcss.plugin('fabulous-parser', () => {
    return function(root, result) {
      return root.walkRules(rule => {
        results.push(rule);
      });
    };
  });
  processWithPlugin(cssString, DeclarationWalker, syntax);
  return results;
};

export const getDeclarations = (rule: Rule) => {
  const declarations: Declaration[] = [];
  rule.walkDecls(declaration => {
    declarations.push(declaration);
  });
  return declarations;
};

export const hasDeclaration = (rule: postcss.Rule, propertyName: string) => {
  let has = false;
  rule.walkDecls(dec => {
    if (dec.prop == propertyName) {
      has = true;
    }
  });
  return has;
};

export const updateProperty = (rule: postcss.Rule, propertyName: string, propertyValue: string) => {
  if (hasDeclaration(rule, propertyName)) {
    rule.walkDecls(dec => {
      if (dec.prop == propertyName) {
        dec.value = propertyValue;
      }
    });
  } else {
    rule.append({ prop: propertyName, value: propertyValue });
  }
  return rule.toString();
};

export const removeProperty = (rule: postcss.Rule, propertyName: string) => {
  if (hasDeclaration(rule, propertyName)) {
    rule.walkDecls(dec => {
      if (dec.prop == propertyName) {
        dec.remove();
      }
    });
  }
  return rule.toString();
};

/**
 * When CSS is parsed from a parent document, the locations must take
 * into account the overall location and the location of a specific tag.
 * This utility will return a NodeSource that will ensure that the overall
 * document is correctly calculated.
 * @param location
 * @param rule
 * @param locStartColOffset Some types, such as JS/TS have a backtick character so no additional offset is needed
 */
export const getNodeSourceWithLocationOffset = (location: NodeSource, rule: Rule, locStartColOffset: number = 1): NodeSource => {
  const locStart = location.start ? location.start : { column: 0, line: 0 };
  const sourceStart = (rule.source && rule.source.start) || {
    column: 0,
    line: 0,
  };
  const sourceEnd = (rule.source && rule.source.end) || {
    column: 0,
    line: 0,
  };

  const startLine = locStart.line + sourceStart.line - 1;
  const endLine = startLine + sourceEnd.line - sourceStart.line;
  // If ` is on the same line as the CSS tag, then the start column should be the actual column
  let startColumn = sourceStart.line === 1 ? locStart.column - locStartColOffset : sourceStart.column - 1;
  return {
    start: {
      column: startColumn,
      line: startLine,
    },
    end: {
      column: sourceEnd.column,
      line: endLine,
    },
    input: (rule.source as any).input,
  };
};
