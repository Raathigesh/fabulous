import React from "react";

interface Props {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const BorderIcon = ({
  top = "#AFAFAF",
  right = "#AFAFAF",
  bottom = "#AFAFAF",
  left = "#AFAFAF"
}: Props) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.5" x2="15" y2="0.5" stroke={top} />
      <line x1="0.5" y1="1" x2="0.5" y2="14" stroke={right} />
      <line x1="14.5" y1="1" x2="14.5" y2="14" stroke={left} />
      <line y1="14.5" x2="15" y2="14.5" stroke={bottom} />
    </svg>
  );
};

export default BorderIcon;
