import { SelectorOptions } from "../../../../componentShare/selectors/Selector";

export type Props = {
  [K in keyof TypeMap]: {
    type: K;
    useStateProps?: TypeMap[K];
    className?: string;
    name?: string;
    label?: string | false;
    placeholder?: string;
    defaultValue?: any;
    isMulti?: boolean;
    classNameLabel?: string;
    selectorStyles?: SelectorStyleTypes;
  };
}[keyof TypeMap];

interface SelectorStyleTypes {
  width?: string;
  height?: string;
  flex?: string;
  boxShadow?: string;
  border?: string;
  placeholderFontSize?: string;
}

interface TypeMap {
  createUserToSite: CreateUserToSiteUseStates;
  updateStoreSpatialCommitments: UpdateStoreSpatialCommitmentsUseStates;
  search: SearchUseStates;
  createUnit: null;
  createCity: null;
  createUniversity: null;
  updateOrganization: null;
  updateInfoSeller: null;
  updateStore: null;
}

interface CreateUserToSiteUseStates {
  setUniversityId?: (
    value: React.SetStateAction<string | null | undefined>
  ) => void;
  setStateId?: (value: React.SetStateAction<string | null | undefined>) => void;
  StateId: string | null | undefined;
  setCityId?: (value: React.SetStateAction<string | null | undefined>) => void;
  setOrganizationId?: (
    value: React.SetStateAction<string | null | undefined>
  ) => void;
  setUnitId?: (value: React.SetStateAction<string | null | undefined>) => void;
}

interface UpdateStoreSpatialCommitmentsUseStates {
  setStateSelected: (
    value: React.SetStateAction<SelectorOptions[] | undefined>
  ) => void;
  stateSelected: SelectorOptions[] | undefined;
}

interface SearchUseStates {
  setStateId?: (value: React.SetStateAction<string | null | undefined>) => void;
  StateId: string | null | undefined;
}
