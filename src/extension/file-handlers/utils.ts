import * as postcss from "postcss";
import { Rule, Declaration, NodeSource } from "postcss";
import { processWithPlugin } from "../parsers/post-css";

export const getRules = (cssString: string) => {
  const results: Rule[] = [];
  const DeclarationWalker = postcss.plugin("fabulous-parser", () => {
    return function(root, result) {
      return root.walkRules(rule => {
        results.push(rule);
      });
    };
  });
  processWithPlugin(cssString, DeclarationWalker);
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

export const updateProperty = (
  rule: postcss.Rule,
  propertyName: string,
  propertyValue: string
) => {
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
