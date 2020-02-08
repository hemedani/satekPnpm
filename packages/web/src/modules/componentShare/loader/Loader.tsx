import React from "react";
import { Circle, DotsHide, DotsShake } from "./LoaderTypes";

interface Style {
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
}

interface Props extends Style {
  type: "DotsHide" | "DotsShake" | "Circle";
}

export const Loader: React.FC<Props> = ({
  type,
  width,
  height,
  margin,
  color
}) => {
  switch (type) {
    case "DotsHide":
      return (
        <DotsHide height={height} width={width} margin={margin} color={color} />
      );
    case "DotsShake":
      return (
        <DotsShake
          height={height}
          width={width}
          margin={margin}
          color={color}
        />
      );
    case "Circle":
      return (
        <Circle height={height} width={width} margin={margin} color={color} />
      );
    default:
      return (
        <Circle height={height} width={width} margin={margin} color={color} />
      );
  }
};
