import React, { CSSProperties } from "react";
import { Selector } from "../../componentShare/selectors/Selector";

interface Filter {
  name: string;
  placeholder: string;
}

interface Sort {
  name: string;
}

interface Props {
  style?: CSSProperties;
  filtersStyle?: CSSProperties;
  filters: Filter[];
  sorts?: Sort[];
}
export const TopFilterSearchBar: React.FC<Props> = ({
  style,
  filtersStyle,
  filters
}) => {
  return (
    <div style={style} className="top-filter-search-bar">
      <div className="filters" style={filtersStyle}>
        {filters.map(filter => (
          <Selector
            className="async-selector"
            label={filter.name}
            name={filter.name}
            options={[
              { label: "کرمان", value: "kerman" },
              { label: "همدان", value: "hamedan" }
            ]}
            placeholder={filter.placeholder}
          />
        ))}
      </div>
    </div>
  );
};
