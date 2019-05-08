import { useContext } from "react";
import { ThemeContext } from "styled-components";

const getVariableValue = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

export interface ThemeColors {
  background: string;
  sectionHeader: string;
  textColor: string;
  textBoxColor: string;
  textBoxHover: string;
  textboxBorder: string;
  textboxBackground: string;
  iconBackground: string;
  iconBorder: string;
  iconHover: string;
  iconActive: string;
  iconColor: string;
  spaceSampleBoxBorder: string;
}
export interface Theme {
  colors: ThemeColors;
}

const DefaultTheme: Theme = {
  colors: {
    background: "#111111",
    sectionHeader: "#181818",
    textColor: "#FFFBE4",
    textBoxColor: "#2B2B2B",
    textBoxHover: "#070707",
    textboxBorder: "#070707",
    textboxBackground: "#222222",
    iconBackground: "#333333",
    iconBorder: "#2B2B2B",
    iconHover: "#111111",
    iconActive: "#1A9BFC",
    iconColor: "#FFFBE4",
    spaceSampleBoxBorder: "#333333"
  }
};

export default DefaultTheme;

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme as Theme;
};

export const getThemeColors = () => {
  const theme = useTheme();
  return theme.colors;
};
