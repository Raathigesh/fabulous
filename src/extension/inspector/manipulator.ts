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
          raw: rule.toString()
        });
      });
    };
  });

  processWithPlugin(cssString, DeclarationWalker);
  return results;
}

export function updateProperty(
  cssString: string,
  propertyName: string,
  propertyValue: string
) {
  const DeclarationWalker = postcss.plugin("reignite-style-parser", () => {
    return function(root, result) {
      return root.walkDecls(rule => {
        if (rule.prop === propertyName) {
          rule.value = propertyValue;
        }
      });
    };
  });

  return processWithPlugin(cssString, DeclarationWalker);
}

function hasRule(root: any, ruleName: string) {
  return root.some((rule: any) => rule.prop === ruleName);
}
