import React from "react";

interface Style {
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
}
export const DotsHide: React.FC<Style> = ({ width, height, margin, color }) => (
  <svg
    style={{
      width: width,
      height: height,
      margin: margin
    }}
    className="loader"
    version="1.1"
    id="L4"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 0 0"
  >
    <circle fill={color ? color : "#2b2b2b"} stroke="none" cx="6" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle
      fill={color ? color : "#707070"}
      stroke="none"
      cx="26"
      cy="50"
      r="6"
    >
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle
      fill={color ? color : "#a3a3a3"}
      stroke="none"
      cx="46"
      cy="50"
      r="6"
    >
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </svg>
);

export const Circle: React.FC<Style> = ({ width, height, margin, color }) => {
  return (
    <svg
      style={{
        width: width,
        height: height,
        margin: margin
      }}
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <path
        fill={color ? color : "#2b2b2b"}
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export const DotsShake: React.FC<Style> = ({
  width,
  height,
  margin,
  color
}) => {
  return (
    <svg
      style={{
        width: width,
        height: height,
        margin: margin
      }}
      version="1.1"
      id="L5"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <circle
        fill={color ? color : "#2b2b2b"}
        stroke="none"
        cx="6"
        cy="50"
        r="6"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 15 ; 0 -15; 0 15"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle
        fill={color ? color : "#707070"}
        stroke="none"
        cx="30"
        cy="50"
        r="6"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 10 ; 0 -10; 0 10"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle
        fill={color ? color : "#a3a3a3"}
        stroke="none"
        cx="54"
        cy="50"
        r="6"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 5 ; 0 -5; 0 5"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
};
