import * as postcss from "postcss";

export const processWithPlugin = (cssString: string, plugin: any) => {
  return postcss([plugin]).process(cssString).css;
};
