import React, { useState } from "react";

interface Props {
  value: number;
}
export const NumberInventory: React.FC<Props> = ({ value }) => {
  const [valueInventory, setValueInventory] = useState<number>(value);
  return (
    <div className="numberInventory-seller">
      {/* <p
        onClick={() => setValueInventory(valueInventory + 1)}
        className="plusMinus-numberInventory-seller"
      >
        +
      </p> */}
      <p className="value-numberInventory-seller">{valueInventory}</p>
      {/* <p
        onClick={() => setValueInventory(valueInventory - 1)}
        className="plusMinus-numberInventory-seller"
      >
        -
      </p> */}
    </div>
  );
};
