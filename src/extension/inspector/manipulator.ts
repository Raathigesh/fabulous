import * as postcss from "postcss";
import { getTypeForCSSProperty } from "./util";
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
}

export default function getCSSRules(cssString: string) {
  const results: Rule[] = [];
  const DeclarationWalker = postcss.plugin("reignite-style-parser", () => {
    return function(root, result) {
      return root.walkRules(rule => {
        const declarations: Declaration[] = [];

        rule.walkDecls(({ prop, value }) => {
          declarations.push({
            prop,
            value,
            source: rule.source
          });
        });

        results.push({
          selector: rule.selector,
          declarations,
          source: rule.source
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
      if (!hasRule(root, propertyName)) {
        root.append(`${propertyName}:${propertyValue}`);
        return;
      }

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
