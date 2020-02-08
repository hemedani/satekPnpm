import { useStatesQuery } from "@satek/hooks";
import { getStates_getStates } from "@satek/resolvers";
import React from "react";
import { useFormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Loader } from "../../../../componentShare/loader/Loader";
import { Selector, SelectorOptions } from "../../../../componentShare/selectors/Selector";
import { Props } from "./StateParserTypes";

export const StateParser: React.FC<Props> = props => {
  const ParseStates: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
    // ---------------Use Form Context---------------
    const { watch, setValue, register } = useFormContext<any>();

    // const stateId = watch!("stateId");

    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    // ---------------Start Handlings---------------
    // ---------------
    const handleValue = (options: SelectorOptions[]) => {
      switch (props.type) {
        case "createCity":
          return options.find(({ value }) => value === watch!("stateId"));
        case "createUniversity":
          return options.find(({ value }) => value === watch!("stateId"));
        case "updateOrganization":
          return options.find(({ value }) => value === watch!("stateId"));
        case "createUnit":
          return options.find(({ value }) => value === watch!("stateId"));
        case "updateInfoSeller":
          return options.find(({ value }) => value === watch!("ceoStateId"));
        case "updateStore":
          return options.find(({ value }) => value === watch!("stateId"));
        case "updateStoreSpatialCommitments":
          return props.useStateProps && props.useStateProps.stateSelected;
        case "createUserToSite":
          return options.find(
            ({ value }) => value === props.useStateProps!.StateId
          );
        case "search":
          return options.find(
            ({ value }) => value === props.useStateProps!.StateId
          );
        default:
          break;
      }
    };
    // ---------------
    const handleDefaultValue = () => {
      if (props.defaultValue) {
        if (props.type === "updateStoreSpatialCommitments") {
          props.defaultValue.map((id: string) => {
            return options.find(({ value }) => value === id)!;
          });
        } else {
          return {
            value: props.defaultValue.id,
            label: props.defaultValue.name
          };
        }
      }
    };
    // ---------------
    const handleChange = (option: any) => {
      switch (props.type) {
        case "createUserToSite":
          props.useStateProps!.setCityId &&
            props.useStateProps!.setCityId(null);
          props.useStateProps!.setUniversityId &&
            props.useStateProps!.setUniversityId(null);
          props.useStateProps!.setOrganizationId &&
            props.useStateProps!.setOrganizationId(null);
          props.useStateProps!.setUnitId &&
            props.useStateProps!.setUnitId(null);
          props.useStateProps!.setStateId &&
            props.useStateProps!.setStateId(option.value);
          return true;

        case "search":
          props.useStateProps!.setStateId &&
            props.useStateProps!.setStateId(option.value);
          return true;

        case "createUnit":
          setValue!("cityId", "");
          setValue!("address", "");
          setValue!("stateId", option.value);
          return true;

        case "createCity":
          setValue!("stateId", option.value);
          return true;

        case "updateOrganization":
          setValue!("cityId", "");
          setValue!("stateId", option.value);
          return true;

        case "createUniversity":
          setValue!("cityId", "");
          setValue!("stateId", option.value);
          return true;

        case "updateInfoSeller":
          setValue("ceoCityId", "");
          setValue("ceoStateId", option.value);
          return true;

        case "updateStore":
          setValue("cityId", "");
          return true;

        case "updateStoreSpatialCommitments":
          props.useStateProps && props.useStateProps.setStateSelected(option);
          return true;

        default:
          break;
      }
    };
    // ---------------
    // ---------------End Handlings---------------

    return (
      <Selector
        className={props.className ? props.className : "selector"}
        classNameLabel={props.classNameLabel}
        name={props.name ? props.name : "stateId"}
        label={
          props.label !== false && props.label
            ? props.label
            : props.label !== false
            ? "استان"
            : ""
        }
        placeholder={props.placeholder ? props.placeholder : "انتخاب استان"}
        style={props.className ? {} : { marginLeft: "1rem" }}
        width={
          props.selectorStyles && props.selectorStyles.width
            ? props.selectorStyles.width
            : "12rem"
        }
        flex={
          props.selectorStyles && props.selectorStyles.flex
            ? props.selectorStyles.flex
            : ""
        }
        height={
          props.selectorStyles && props.selectorStyles.height
            ? props.selectorStyles.height
            : ""
        }
        boxShadow={
          props.selectorStyles && props.selectorStyles.boxShadow
            ? props.selectorStyles.boxShadow
            : ""
        }
        border={
          props.selectorStyles && props.selectorStyles.border
            ? props.selectorStyles.border
            : "12rem"
        }
        options={options}
        isMulti={props.isMulti}
        defaultValue={handleDefaultValue()}
        value={handleValue(options)}
        onChange={handleChange}
      />
    );
  };

  
  const StateResponse = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: ParseStates },
    {},
    client
  ).Response;

  return StateResponse;
};
