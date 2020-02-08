export function _control(
  style: any,
  height: string | undefined,
  boxShadow: string | undefined,
  border: string | undefined
) {
  return {
    ...style,
    boxShadow: boxShadow ? boxShadow : "0 0 .15rem #702684",
    border: border ? border : "0px solid #702684",
    minHeight: height ? height : "1.9rem",
    alignContent: "center",
    fontFamily: "IRANSANS"
  };
}
export function _container(
  style: any,
  width: string | undefined,
  minWidth: string | undefined,
  flex: string | undefined
) {
  return {
    ...style,
    width: width ? width : "100%",
    minWidth: minWidth ? minWidth : "",
    flex: flex ? flex : "1"
  };
}

export function _placeholder(
  style: any,
  placeholderFontSize: string | undefined
) {
  return {
    ...style,
    fontFamily: "IRANSANS_LIGHT",
    fontSize: placeholderFontSize ? placeholderFontSize : ".7rem"
  };
}

export function _clearIndicator(style: any) {
  return {
    ...style,
    padding: "0",
    width: "1rem"
  };
}

export function _dropdownIndicator(style: any) {
  return {
    ...style,
    padding: ".1rem .2rem"
  };
}

export function _menu(style: any) {
  return {
    ...style,
    zIndex: 999999
  };
}

export function _menuList(style: any) {
  return {
    ...style,
    fontFamily: "IRANSANS",
    fontSize: ".7rem"
  };
}

export function _input(style: any) {
  return {
    ...style,
    fontFamily: "IRANSANS",
    fontSize: ".7rem"
  };
}

export function _option(provided: any, state: any) {
  return {
    ...provided,
    ...state,
    color: state.isSelected ? "white" : "gray"
  };
}
