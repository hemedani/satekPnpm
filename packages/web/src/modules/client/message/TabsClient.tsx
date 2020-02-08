import * as React from "react";

interface Props {
  textTabs: string[];
  change: (values: number) => void;
  selectTabs: number;
}

export const TabsClient: React.SFC<Props> = props => (
  <div className="tabs-client">
    {props.textTabs.map((text, index) => (
      <div
        key={index}
        onClick={() => props.change(index)}
        className={
          props.selectTabs === index
            ? "tab-select-client"
            : "tab-notselect-client"
        }
      >
        <p>{text}</p>
      </div>
    ))}
  </div>
);
