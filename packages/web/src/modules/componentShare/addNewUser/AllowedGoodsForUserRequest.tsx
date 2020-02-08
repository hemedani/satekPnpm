import {
  useAllowedWaresUserQuery,
  useUpdateAllowedWaresForUserMutate,
  useWareClassesQuery,
  useWareGroupWaresQuery
} from "@satek/hooks";
import {
  getAllowedWaresUser_getUser,
  getWareClasses_getWareClasses,
  getWareGroupWares_getWareGroup,
  updateAllowedWaresForUserVariables
} from "@satek/resolvers";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../Apollo";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";
import { Selector, SelectorOptions } from "../selectors/Selector";
import { DetailNameAllowedGoods } from "./DetailNameAllowedGoods";

interface Props {
  id: string;
  className?: string;
}

export const AllowedGoodsForUserRequest: React.FC<Props> = ({
  id,
  className
}) => {
  const [wareClass, setWareClass] = useState({ label: "", value: "" });
  const [wareGroup, setWareGroup] = useState({ label: "", value: "" });
  const [showWares, setShowWares] = useState(false);
  const [wares, setWares] = useState<SelectorOptions[]>();
  const UserId = id;

  const methods = useForm<updateAllowedWaresForUserVariables>();

  const {
    updateAllowedWaresForUserMutate
  } = useUpdateAllowedWaresForUserMutate({ id: UserId }, client);

  const onSubmit = methods.handleSubmit(async variables => {
    // const val = { ...variables, id: "ali" };
    // setWares([...wares, variables.allowedWaresIds]);

    const result = await updateAllowedWaresForUserMutate({ variables });
    setShowWares(true);
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
        labelStyle={{ width: "unset", marginLeft: ".5rem" }}
        label="گروه کالایی"
        placeholder="انتخاب گروه کالایی"
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.7rem",
          marginLeft: "1.5rem"
        }}
        width="12rem"
        options={options}
        value={wareClass}
        onChange={(option: SelectorOptions) => {
          setWareClass(option);
        }}
      />
    );
  };
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
  //         name="wareGroupId"
  //         labelStyle={{ width: "unset", marginLeft: ".5rem" }}
  //         label="زیرگروه کالا"
  //         placeholder="انتخاب زیرگروه کالایی"
  //         style={{
  //           display: "flex",
  //           fontSize: "0.7rem",
  //           alignItems: "center",
  //           marginLeft: "1.5rem"
  //         }}
  //         width="12rem"
  //         options={options}
  //         value={wareGroup}
  //         onChange={(option: SelectorOptions) => setWareGroup(option)}
  //       />
  //     );
  //   }
  //   return null;
  // };
  const ParseWare: React.FC<{ data: getWareGroupWares_getWareGroup }> = ({
    data
  }) => {
    if (data.wares) {
      let options = data.wares.reduce<SelectorOptions[]>((options, option) => {
        options.push({ label: option.name, value: option.id });
        return options;
      }, []);
      return (
        <Selector
          name="allowedWaresIds"
          labelStyle={{ width: "unset", marginLeft: ".5rem" }}
          label=" کالا"
          placeholder="انتخاب  کالا"
          style={{
            display: "flex",
            height: "2rem",
            flex: "1",
            alignItems: "center",
            fontSize: "0.7rem"
          }}
          options={options}
          isMulti
          value={wares}
          onChange={(option: SelectorOptions[]) => {
            console.log("option", option);
            setWares(option);
            let bb = option.reduce<string[]>((bb, b) => {
              bb.push(b.value);
              return bb;
            }, []);
            // setValue("allowedWaresIds", option);
            methods.setValue("allowedWaresIds", bb);
            methods.setValue("userId", id);
            console.log(id, "<==============id");
          }}
        />
      );
    }

    return null;
  };
  const ParseAllowedWares: React.FC<{ data: getAllowedWaresUser_getUser }> = ({
    data
  }) => {
    if (data.allowedWares) {
      // setWares([data.allowedWares]);
      return (
        <React.Fragment>
          {data.allowedWares.map(allowedWare => (
            <DetailNameAllowedGoods
              key={allowedWare.id}
              nameDetail={allowedWare.name}
            />
          ))}
        </React.Fragment>
      );
    }

    return null;
  };

  useEffect(() => {
    methods.register({ name: "wareClassId" });
    methods.register({ name: "wares" });
    methods.register({ name: "wareGroupId" });
    methods.register({ name: "allowedWaresIds" });
    methods.register({ name: "userId" });
  }, [methods]);

  const ResponseClass = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClass },
    {},
    client
  );
  // const ResponseGroup = useWareClassWareGroupsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseGroup },
  //   { id: wareClass.value },
  //   client
  // );
  const ResponseWare = useWareGroupWaresQuery(
    { error: CustomError, loading: Loader, parsing: ParseWare },
    { id: wareGroup.value },
    client
  );
  const ResponseAllowedWares = useAllowedWaresUserQuery(
    { error: CustomError, loading: Loader, parsing: ParseAllowedWares },
    { id: UserId },
    client
  );

  // const wareClassId = methods.watch("wareClassId");
  // const wareGroupId = methods.watch("wareGroupId");
  const allowedWaresIds = methods.watch("allowedWaresIds");
  console.log(ResponseAllowedWares, "response");
  return (
    <Container title="کالاهای مجاز برای درخواست کاربر" className={className}>
      <form className="form-input-vertical" onSubmit={onSubmit}>
        <div className="inputs-allowedGoods-admin">
          {ResponseClass.Response}
          {/* {wareClass.value && ResponseGroup.Response} */}
          {wareGroup.value && ResponseWare.Response}

          {/* <button type={UserId===''?"disable":"submit"}
             className="button-AddUniversity-admin">
              تایید اطلاعات
            </button> */}
        </div>
        <div className="bottom-allowedGoodsForUserRequest-admin">
          <div className="bottom-detail-allowedGoodsForUserRequest-admin">
            {id && ResponseAllowedWares.Response}
          </div>
          <div className="button-bottom-allowedGoodsForUserRequest">
            <Button
              mainType="submit"
              type={UserId === "" ? "disable" : "main"}
              text="افزودن کالا"
              fontSize=".9rem"
              padding="0.5rem 2rem 0.5rem 2rem"
              margin="0 .5rem 0 0"
            />
          </div>
        </div>
      </form>
    </Container>
  );
};
