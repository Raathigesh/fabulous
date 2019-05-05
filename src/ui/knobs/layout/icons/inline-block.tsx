import React from "react";
import { getThemeColors } from "../../../theme";

interface Props {
  isActive: boolean;
}

const InlineBlock = ({ isActive }: Props) => {
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
      <line x1="4.5" y1="4" x2="4.5" y2="21" stroke={color} />
      <line x1="20.5" y1="4" x2="20.5" y2="21" stroke={color} />
      <rect x="8.5" y="8.5" width="8" height="8" fill={color} stroke={color} />
    </svg>
  );
};

export default InlineBlock;
