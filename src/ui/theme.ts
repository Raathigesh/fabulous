const getVariableValue = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

export default {
  colors: {
    textColor: getVariableValue("--vscode-sideBar-foreground")
  }
};
