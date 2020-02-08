import React from "react";

interface Props {
  borderWidth?: string;
  height?: string;
  width?: string;
  borderColor?: string;
}

export const Tick: React.FC<Props> = ({
  borderWidth = "0.1rem",
  height = "0.8rem",
  width = "0.3rem",
  borderColor = "white"
}) => {
  return (
    <div
      style={{
        borderBottom: `${borderWidth} solid ${borderColor}`,
        borderRight: `${borderWidth} solid ${borderColor}`,
        height: height,
        width: width
      }}
      className="tick"
    ></div>
  );
};
