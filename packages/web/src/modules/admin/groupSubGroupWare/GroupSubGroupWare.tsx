import { useWareClassesQuery } from "@satek/hooks";
import { getWareClasses_getWareClasses } from "@satek/resolvers";
import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { client } from "../../../Apollo";
import { ContainerClient } from "../../componentShare/containerClient/ContainerClient";
import { CustomError } from "../../componentShare/customError/CustomError";
import { LineSeparator } from "../../componentShare/lineSeparator/LineSeparator";
import { Loader } from "../../componentShare/loader/Loader";
import { SearchGoodsClient } from "../../componentShare/RequestableGoods/SearchGoodsClient";
// import Group from "../../componentShare/ware/Group";
import { ModalAddGroup } from "../modalBox/modalAddGroup/ModalAddGroup";
import { ModalAddSubGroup } from "../modalBox/modalAddSubGroup/ModalAddSubGroup";

interface Props extends RouteComponentProps {}
export const GroupSubGroupWare: React.FC<Props> = ({ match: { path } }) => {
  const [foundItem, setFoundItem] = useState("0");

  // const ParseGroup: React.FC<{
  //   data: getWareGroups_getWareGroups[];
  // }> = ({ data }) => {
  //   console.log(data, "allowed wares ids...=>>><<<<");
  //   setFoundItem(data ? String(data!.length) : "0");
  //   return (
  //     <React.Fragment>
  //       {data.map((details: getWareGroups_getWareGroups) => {
  //         return (
  //           <Group
  //             en={details.enName}
  //             key={details.id}
  //             path={path}
  //             id={details.id}
  //             group={details.name}
  //             classId={details.wareClasses!.id}
  //           />
  //         );
  //       })}
  //     </React.Fragment>
  //   );
  // };
  const ParseClass: React.FC<{
    data: getWareClasses_getWareClasses[];
  }> = ({ data }) => {
    console.log(data, "allowed wares ids...=>>><<<<");
    setFoundItem(data ? String(data!.length) : "0");
    return (
      <React.Fragment>
        {data.map((details: getWareClasses_getWareClasses) => {
          return (
            <></>
            // <Group
            //   key={details.id}
            //   path={path}
            //   id={details.id}
            //   en={details.enName}
            //   group={details.name}
            // />
          );
        })}
      </React.Fragment>
    );
  };

  // const ResponseWareGroups = useWareGroupsQuery(
  //   { error: CustomError, loading: Loader, parsing: ParseGroup },
  //   {},
  //   client
  // ).Response;
  const ResponseWareClasses = useWareClassesQuery(
    { error: CustomError, loading: Loader, parsing: ParseClass },
    {},
    client
  ).Response;
  console.log(path, "path...");
  return (
    <ContainerClient
      colorHeader="blue"
      textHeader="مدیریت کالاها > گروه ها و زیرگروه ها"
    >
      <div className="top-RequestableGoods">
        <div className="Search-RequestableGoods">
          <SearchGoodsClient
            button={{
              text: !path.includes("sub") ? "تعریف گروه" : "تعریف زیر گروه",
              to: `/admin/${path.split("/")[2]}/modaladd${path.split("/")[2]}`
            }}
            vertical={true}
            hasSubGroup={false}
          />
        </div>
        <LineSeparator />
      </div>
      <div className="detailGoodsClient-DeliveryGoods">
        <div className="grid-goods">
          {/* {path.includes("sub") && ResponseWareGroups} */}
          {!path.includes("sub") && ResponseWareClasses}
        </div>
      </div>
      <Route
        exact
        path={`/admin/subgroup/modaladdsubgroup/:id?`}
        render={props => <ModalAddSubGroup {...props} />}
      />
      <Route
        exact
        path={`/admin/group/modaladdgroup/:id?`}
        render={props => <ModalAddGroup {...props} />}
      />
    </ContainerClient>
  );
};
