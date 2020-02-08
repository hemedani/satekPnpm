import {
  useUnitAllowedWareGroupsQuery,
  useUpdateAllowedWareGroupsForUnitMutate,
  useWareClassesQuery
} from "@satek/hooks";
import {
  getAllowedWareGroupsForUnit_getUnit_allowedWareGroups,
  getWareClasses_getWareClasses,
  updateAllowedWareGroupsForUnitVariables
} from "@satek/resolvers";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { LabelGeneral } from "../../../componentShare/labels/LabelGeneral";
import { LineSeparator } from "../../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../../componentShare/selectors/Selector";

interface Props {
  className?: string;
  id: string;
}

export const UnitUpdateWareGroups: React.FC<Props> = ({ className, id }) => {
  const [wareClass, setWareClass] = useState({ label: "", value: "" });
  const [foundItem, setFoundItem] = useState("0");
  const [wareGroups, setWareGroups] = useState<SelectorOptions[]>();

  const { watch, setValue, register, handleSubmit } = useForm<
    updateAllowedWareGroupsForUnitVariables
  >();

  const {
    updateAllowedWareGroupsForUnitMutate
  } = useUpdateAllowedWareGroupsForUnitMutate({ id }, client);

  const onSubmit = handleSubmit(async variables => {
    console.log("variables in web before = ", variables);
    let _wareGroupIds;
    if (wareGroups) {
      _wareGroupIds = wareGroups.reduce<string[]>((bb, b) => {
        bb.push(b.value);
        return bb;
      }, []);
    }
    console.log("_wareGroupIds", _wareGroupIds);
    variables.unitId = id;
    console.log("variables in web after = ", variables);
    const result = await updateAllowedWareGroupsForUnitMutate({ variables });
    console.log("result = ", result);
  });

  /*-----------------(UnitWareGroups Hook)-----------------*/
  const ParseUnitWareGroup: React.FC<{
    data: getAllowedWareGroupsForUnit_getUnit_allowedWareGroups[] | null;
  }> = ({ data }) => {
    data && setFoundItem(String(data.length));
    return (
      <>
        {data &&
          data.map(
            (
              wareGroup: getAllowedWareGroupsForUnit_getUnit_allowedWareGroups
            ) => <LabelGeneral key={wareGroup.id} name={wareGroup.name} />
          )}
      </>
    );
  };

  const ResponseUnitWareGroup = useUnitAllowedWareGroupsQuery(
    { error: CustomError, loading: Loader, parsing: ParseUnitWareGroup },
    { id: id },
    client
  );

  /*-----------------(WareClass Hook)-----------------*/
  const ParseWareClass: React.FC<{ data: getWareClasses_getWareClasses[] }> = ({
    data
  }) => {
    let options = data.reduce<SelectorOptions[]>((options, option) => {
      options.push({ label: option.name, value: option.id });
      return options;
    }, []);

    return (
      <Selector
        name="wareClassId"
        label="گروه کالایی"
        className="selector"
        placeholder="گروه کالایی مورد نظر را انتخاب کنید"
        placeholderFontSize="0.55rem"
        options={options}
        value={options.find(({ value }) => value === wareClass.value)}
        onChange={(option: SelectorOptions) => {
          setWareClass(option);
        }}
      />
    );
  };
  const ResponseWareClass = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseWareClass },
    {},
    client
  );
  /*-----------------(WareClassGroup Hook)-----------------*/
  // const ParseWareGroup: React.FC<{
  //   data: getWareClassWareGroups_getWareClass;
  // }> = ({ data }) => {
  //   if (data.wareGroups) {
  //     let options = data.wareGroups.reduce<SelectorOptions[]>(
  //       (options, option) => {
  //         options.push({ label: option.name, value: option.id });
  //         return options;
  //       },
  //       []
  //     );
  //     return (
  //       <Selector
  //         name="allowedWareGroupsIds"
  //         className="selector"
  //         placeholder="زیر گروه کالایی مورد نظر را جستجو کنید"
  //         placeholderFontSize="0.55em"
  //         label="زیرگروه کالا"
  //         isMulti
  //         options={options}
  //         value={wareGroups}
  //         onChange={(option: SelectorOptions[]) => {
  //           setWareGroups(option);
  //         }}
  //       />
  //     );
  //   }
  //   return null;
  // };
  // const ResponseWareClassGroup = useWareClassWareGroupsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseWareGroup },
  //   { id: wareClass.value },
  //   client
  // );
  /*-----------------(JSX)-----------------*/
  return (
    <form className={classNames(className)} onSubmit={onSubmit}>
      <Container
        title="زیر گروه‌های کالایی مرتبط واحد"
        className="update_ware_group"
        classNameChild="child"
      >
        <div className="add_box">
          <div className="selectors">
            {ResponseWareClass.Response}
            {/* {wareClass.value && ResponseWareClassGroup.Response} */}
          </div>

          <div className="btns">
            <Button
              mainType="submit"
              className="btn"
              text="افزودن"
              type="main"
            />
          </div>
        </div>
        <LineSeparator color="gray" foundItem={foundItem} />
        <div className="items">{ResponseUnitWareGroup.Response}</div>
      </Container>
    </form>
  );
};
