import * as postcss from "postcss";
import { NodeSource } from "postcss";

function processWithPlugin(cssString: string, plugin: any) {
  return postcss([plugin]).process(cssString).css;
}

export interface Declaration {
  value: string;
  prop: string;
  source?: NodeSource;
}

export interface Rule {
  selector: string;
  declarations: Declaration[];
  source?: NodeSource;
  raw: string;
  rule: postcss.Rule;
}

export default function getCSSRules(cssString: string) {
  const results: Rule[] = [];
  const DeclarationWalker = postcss.plugin("reignite-style-parser", () => {
    return function(root, result) {
      return root.walkRules(rule => {
        const declarations: Declaration[] = [];

        rule.walkDecls(({ prop, value, source }) => {
          declarations.push({
            prop,
            value,
            source: source
          });
        });

        results.push({
          selector: rule.selector,
          declarations,
          source: rule.source,
          raw: rule.toString(),
          rule
        });
      });
    };
  });

  processWithPlugin(cssString, DeclarationWalker);
  return results;
}

export function updateProperty(
  rule: postcss.Rule,
  propertyName: string,
  propertyValue: string
) {
  /*  const DeclarationWalker = postcss.plugin("reignite-style-parser", () => {
    return function(root, result) {
      if (!hasRule(root, propertyName)) {
        const firstRule = root.first;
        if (firstRule) {
          firstRule.append(`${propertyName}:${propertyValue}`);
        }
      } else {
        return root.walkDecls(rule => {
          if (rule.prop === propertyName) {
            rule.value = propertyValue;
          }
        });
      }
    };
  });

  return processWithPlugin(cssString, DeclarationWalker); */

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
}

function hasDeclaration(rule: postcss.Rule, propertyName: string) {
  let has = false;
  rule.walkDecls(dec => {
    if (dec.prop == propertyName) {
      has = true;
    }
  });
  return has;
}
