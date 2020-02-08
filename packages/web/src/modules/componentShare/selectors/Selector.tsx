import classNames from "classnames";
import React, { CSSProperties } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { InputActionMeta, KeyboardEventHandler } from "react-select/src/types";
import {
  _clearIndicator,
  _container,
  _control,
  _dropdownIndicator,
  _input,
  _menu,
  _menuList,
  _option,
  _placeholder
} from "./SelectorStyle";

export interface SelectorOptions {
  label: string;
  value: string;
}
export interface Props {
  onChange?: (option: any) => void;
  classNameLabel?: string;
  value?: SelectorOptions | SelectorOptions[];
  style?: CSSProperties;
  name: string;
  options: SelectorOptions[];
  label?: string;
  placeholder: string;
  placeholderFontSize?: string;
  className?: string;
  boxShadow?: string;
  border?: string;
  labelStyle?: CSSProperties;
  isMulti?: boolean;
  width?: string;
  height?: string;
  flex?: string;
  disable?: boolean;
  defaultValue?: SelectorOptions | SelectorOptions[];
  async?: boolean;
  loadOptions?: any;
  defaultInputValue?: string;
  onKeyDown?: KeyboardEventHandler;
  isLoading?: boolean;
  isClearable?: boolean;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  filterOption?:
    | ((option: SelectorOptions, rawInput: string) => boolean)
    | null;
  minWidth?: string;
}

export const Selector: React.FC<Props> = ({
  style,
  name,
  options,
  label,
  placeholder,
  className,
  labelStyle,
  onChange,
  onInputChange,
  isMulti,
  height,
  width,
  flex,
  placeholderFontSize,
  boxShadow,
  border,
  disable,
  value,
  defaultValue,
  loadOptions,
  async,
  defaultInputValue,
  onKeyDown,
  isLoading,
  isClearable,
  filterOption,
  classNameLabel,
  minWidth
}) => {
  const selectStyles = {
    clearIndicator: (style: any) => _clearIndicator(style),
    menuList: (style: any) => _menuList(style),
    container: (style: any) => _container(style, width, minWidth, flex),
    control: (style: any) => _control(style, height, boxShadow, border),
    input: (style: any) => _input(style),
    option: (provided: any, state: any) => _option(provided, state),
    menu: (style: any) => _menu(style),
    dropdownIndicator: (style: any) => _dropdownIndicator(style),
    placeholder: (style: any) => _placeholder(style, placeholderFontSize)
  };

  return (
    <div style={style} className={classNames("custom-selector-cnt", className)}>
      <p
        className={classNames(classNameLabel ? classNameLabel : "default")}
        style={labelStyle}
      >
        {label}
      </p>
      {async ? (
        <AsyncSelect
          defaultValue={defaultValue}
          isDisabled={disable}
          styles={selectStyles}
          placeholder={placeholder ? placeholder : label}
          className="custom_selector"
          classNamePrefix="select"
          isRtl={true}
          isSearchable={true}
          name={name}
          options={options}
          onChange={onChange}
          value={value}
          cacheOptions
          isMulti={isMulti}
          loadOptions={loadOptions}
          defaultOptions
          defaultInputValue={defaultInputValue}
          onKeyDown={onKeyDown}
          onInputChange={onInputChange}
          isClearable={isClearable}
          filterOption={filterOption}
        />
      ) : (
        <Select
          defaultValue={defaultValue}
          defaultInputValue={defaultInputValue}
          isDisabled={disable}
          placeholder={placeholder ? placeholder : label}
          styles={selectStyles}
          className="custom_selector"
          classNamePrefix="select"
          isRtl={true}
          isSearchable={true}
          isClearable={isClearable}
          name={name}
          options={options}
          onChange={onChange}
          cacheOptions
          isMulti={isMulti}
          defaultOptions={options}
          value={value}
          isLoading={isLoading}
          onKeyDown={onKeyDown}
          onInputChange={onInputChange}
          filterOption={filterOption}
        />
      )}
    </div>
  );
};
