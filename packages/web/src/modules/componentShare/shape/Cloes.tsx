import React from "react";

interface Props {
  height?: string;
  width?: string;
  color?: string;
}

export const Close: React.FC<Props> = ({
  height = "1rem",
  width = "1rem",
  color = ""
}) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        color: color
      }}
      className="close"
    ></div>
  );
};
