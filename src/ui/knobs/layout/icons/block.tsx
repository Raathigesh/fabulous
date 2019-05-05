import React from "react";
import { getThemeColors } from "../../../theme";

interface Props {
  isActive: boolean;
}

const Block = ({ isActive }: Props) => {
  const { iconActive, iconColor } = getThemeColors();
  const color = isActive ? iconActive : iconColor;

  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4.5" y="8.5" width="16" height="8" fill={color} stroke={color} />
      <line x1="4" y1="4.5" x2="21" y2="4.5" stroke={color} />
      <line x1="4" y1="20.5" x2="21" y2="20.5" stroke={color} />
    </svg>
  );
};

export default Block;
