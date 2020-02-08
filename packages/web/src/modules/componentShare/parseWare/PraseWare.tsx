import { useQuery } from "@apollo/react-hooks";
import {
  getWares,
  getWaresVariables,
  getWares_getWares,
  GQL_GET_WARES
} from "@satek/resolvers";
import React, { useState } from "react";
import { InputActionMeta } from "react-select";
import { Selector, SelectorOptions } from "../selectors/Selector";

interface Props {
  idUser?: string;
  setValue: (value: any, variables: any) => void;
  setMyWare: (value: getWares_getWares | undefined) => void;
  wareId: string;
}
export const ParseWare: React.FC<Props> = ({
  idUser,
  setValue,
  setMyWare,
  wareId
}) => {
  const [document, setDocument] = useState("");
  const [isSpacePress, setSpacePress] = useState(false);
  const { loading, error, data } = useQuery<getWares, getWaresVariables>(
    GQL_GET_WARES,
    { variables: { document, userId: idUser ? idUser : "" } }
  );
  let options: SelectorOptions[] = [];
  const parsOptions = () => {
    if (data && data.getWares && !loading) {
      options = data.getWares.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);
    }
  };
  parsOptions();

  const onInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    console.log(actionMeta, isSpacePress, "ok", inputValue);
    if (actionMeta.action === "input-change" && isSpacePress) {
      setDocument(inputValue);
    }
    if (actionMeta.action === "input-change" && inputValue === "") {
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
  console.log(
    wareId,
    "wareId",
    options.find(({ value }) => value === wareId)
  );
  return (
    <Selector
      name="wareId"
      width="100%"
      isLoading={loading}
      style={{ width: "100%" }}
      placeholder=""
      options={options}
      onInputChange={onInputChange}
      filterOption={filterOption}
      onKeyDown={handleKeyDown}
      value={
        options.find(({ value }) => value === wareId)
          ? options.find(({ value }) => value === wareId)
          : { label: "", value: "" }
      }
      onChange={(option: SelectorOptions) => {
        console.log("change");
        setValue("wareId", option.value);
        data &&
          data.getWares &&
          setMyWare(data!.getWares.find(({ id }) => id === option.value));
      }}
    />
  );
};
