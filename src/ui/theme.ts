const getVariableValue = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

const Theme = {
  colors: {
    background: "#404040",
    sectionHeader: "#2B2B2B",
    textColor: "#d9d9d9",
    textBoxColor: "#2B2B2B",
    textboxBorder: "#2B2B2B",
    textboxBackground: "#333333"
  }
};

export default Theme;
