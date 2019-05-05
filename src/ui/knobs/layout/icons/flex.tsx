import React from "react";
import { getThemeColors } from "../../../theme";

interface Props {
  isActive: boolean;
}

const Flex = ({ isActive }: Props) => {
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
      <rect x="4.5" y="4.5" width="16" height="16" stroke={color} />
      <rect x="6.5" y="6.5" width="5" height="12" fill={color} stroke={color} />
      <rect
        x="13.5"
        y="6.5"
        width="5"
        height="12"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};

export default Flex;
