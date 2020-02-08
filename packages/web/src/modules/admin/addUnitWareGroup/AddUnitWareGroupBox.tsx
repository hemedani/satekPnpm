import {
  useUpdateAllowedWareGroupsForUnitMutate,
  useWareClassesQuery
} from "@satek/hooks";
import {
  getWareClasses_getWareClasses,
  updateAllowedWareGroupsForUnitVariables
} from "@satek/resolvers";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../Apollo";
import { Button } from "../../componentShare/button/Button";
import { Container } from "../../componentShare/container/Container";
import { CustomError } from "../../componentShare/customError/CustomError";
import { Loader } from "../../componentShare/loader/Loader";
import {
  Selector,
  SelectorOptions
} from "../../componentShare/selectors/Selector";

interface Props {
  className?: string;
}

export const AddUnitWareGroupBox: React.FC<Props> = ({ className }) => {
  const [wareClass, setWareClass] = useState({ label: "", value: "" });
  const [wareGroups, setWareGroup] = useState<SelectorOptions[]>();
  const { handleSubmit } = useForm<updateAllowedWareGroupsForUnitVariables>();

  const UnitId = "3905b94b-fa2f-42ac-ac58-978b70dda573";

  const {
    updateAllowedWareGroupsForUnitMutate
  } = useUpdateAllowedWareGroupsForUnitMutate({ id: UnitId }, client);

  const onSubmit = handleSubmit(async variables => {
    if (wareGroups) {
      variables.allowedWareGroupsIds = wareGroups.reduce<string[]>((bb, b) => {
        bb.push(b.value);
        return bb;
      }, []);
    }
    variables.unitId = UnitId;
    console.log("==================");
    console.log("variables", variables);
    console.log("==================");
    const result = await updateAllowedWareGroupsForUnitMutate({ variables });
    console.group(result, "result from submit");
  });

  const ParseClass: React.FC<{ data: getWareClasses_getWareClasses[] }> = ({
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
  const ResponseClass = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClass },
    {},
    client
  );
  // const ParseGroup: React.FC<{ data: getWareClassWareGroups_getWareClass }> = ({
  //   data
  // }) => {
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
  //           setWareGroup(option);
  //         }}
  //       />
  //     );
  //   }
  //   return null;
  // };
  // const ResponseGroup = useWareClassWareGroupsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseGroup },
  //   { id: wareClass.value },
  //   client
  // );

  return (
    <form className={classNames(className)} onSubmit={onSubmit}>
      <Container
        width="100%"
        height="100%"
        title="زیر گروه‌های کالایی مرتبط واحد"
        className="add-ware-group-box-cnt"
        classNameChild="child"
      >
        <div className="top">
          {ResponseClass.Response}
          {/* {wareClass.value && ResponseGroup.Response} */}

          <div className="btns">
            <Button
              mainType="submit"
              className="btn"
              text="افزودن"
              type="main"
            />
          </div>
        </div>
        <div className="bottom">
          <div className="good-SubgroupGoods-admin"></div>
        </div>
      </Container>
    </form>
  );
};
