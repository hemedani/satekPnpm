import React from "react";

interface IProps {
  text: string;
  fontFamily?: "light" | "medium" | "bold";
  className?: string;
}

export const InputCheckbox: React.FC<IProps> = ({
  text,
  fontFamily,
  className
}) => {
  return (
    <div className="check-box">
      <input
        className="shape"
        type="checkbox"
        name="simultaneousDiscount"
        id="simultaneousDiscountCheckbox"
      />
      <label htmlFor="simultaneousDiscountCheckbox" className="text">
        <p className={`text ${fontFamily} ${className}`}>{text}</p>
      </label>
    </div>
  );
};
