import { useQuery } from "@apollo/react-hooks";
import { getOrganizations, getOrganizationsVariables, getOrganizations_getOrganizations, GQL_GET_ORGANIZATIONS } from "@satek/resolvers";
import React, { useState } from "react";
import { InputActionMeta } from "react-select";
import { Selector, SelectorOptions } from "../selectors/Selector";

interface Props {
  setValue: (value: string, variables: any) => void;
  setOrganization: (
    value: getOrganizations_getOrganizations | undefined
  ) => void;
}
export const ParseOrganization: React.FC<Props> = ({
  setValue,
  setOrganization
}) => {
  const [document, setDocument] = useState("");
  const [isSpacePress, setSpacePress] = useState(false);
  const { loading, error, data } = useQuery<
    getOrganizations,
    getOrganizationsVariables
  >(GQL_GET_ORGANIZATIONS, { variables: { document } });
  let options: SelectorOptions[] = [];
  const parsOptions = () => {
    if (data && !loading) {
      options = data.getOrganizations.reduce<SelectorOptions[]>(
        (options, option) => {
          options.push({ label: option.name, value: option.id });
          return options;
        },
        []
      );
    }
  };
  parsOptions();
  const onInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    if (actionMeta.action === "input-change" && isSpacePress) {
      setDocument(inputValue);
    }
  };
  const filterOption = () => true;

  const handleKeyDown = (key: React.KeyboardEvent<HTMLElement>) => {
    if (key.keyCode === 32) {
      setSpacePress(true);
    } else {
      setSpacePress(false);
    }
  };
  return (
    <Selector
      name="Organization"
      isLoading={loading}
      style={{ width: "64%", display: "flex", alignItems: "center" }}
      label="بیمارستان"
      placeholder=""
      options={options}
      onInputChange={onInputChange}
      filterOption={filterOption}
      onKeyDown={handleKeyDown}
      onChange={(option: SelectorOptions) => {
        setValue("Organization", option.value);
        setOrganization(
          data!.getOrganizations.find(({ id }) => id === option.value)
        );
      }}
    />
  );
};
