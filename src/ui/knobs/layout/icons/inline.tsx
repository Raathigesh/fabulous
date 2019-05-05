import React from "react";
import { getThemeColors } from "../../../theme";

interface Props {
  isActive: boolean;
}

const Inline = ({ isActive }: Props) => {
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
      <line x1="4.5" y1="3" x2="4.5" y2="22" stroke={color} />
      <line x1="20.5" y1="3" x2="20.5" y2="22" stroke={color} />
      <path
        d="M14.6514 14.4023H10.4814L9.54492 17H8.19141L11.9922 7.04688H13.1406L16.9482 17H15.6016L14.6514 14.4023ZM10.8779 13.3223H14.2617L12.5664 8.66699L10.8779 13.3223Z"
        fill={color}
      />
    </svg>
  );
};

export default Inline;
