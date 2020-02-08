import { useMeQuery, useUpdateOrderStatusMutate } from "@satek/hooks";
import { ExpertCommentStatus, FinanceCommentStatus, OrderStatus, updateOrderStatusVariables } from "@satek/resolvers";
import classNames from "classnames";
import React from "react";
import { client } from "../../../Apollo";
import PathToStatus from "../../../PathToStatus";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";

interface Props {
  size: "medium" | "small" | "large";
  showBtn?: boolean;
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  flex?: string;
  id?: string;
  role?: string;
  path?: string;
}

export const HelpMessage: React.FC<Props> = ({
  size,
  showBtn,
  icon,
  title,
  description,
  buttonText,
  width,
  height,
  padding,
  margin,
  flex,
  id,
  path,
  role
}) => {
  
  const meSiteId = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  ).data;
  const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
    {
      organizationId:
        path!.includes("headHospital") &&
        meSiteId &&
        meSiteId.me &&
        meSiteId.me.userToSites
          ? meSiteId!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : "",
      unitId: "",
      storeId: "",
      statuses: PathToStatus("/headofhospital/viewrequest")!
    },
    client
  );

  async function sendMessage() {
    console.log(path, "this message headHospital");
    if (path === "headHospital") {
      try {
        const val: updateOrderStatusVariables = {
          orderStatus: OrderStatus.pendingInOrganizationHead,
          id: id!
        };
        role === "Finance"
          ? (val.commentByFinanceStatus = FinanceCommentStatus.sentNoResponse)
          : (val.commentByExpertStatus = ExpertCommentStatus.sentNoResponse);
        console.log(val, "...=<< at first this message");
        const variables = val;
        console.log(variables, "...=<< at variables this message");
        const result = await updateOrderStatusMutate({ variables });
        console.log("result is avasd", JSON.stringify(result));
      } catch (err) {
        // console.log(val, "...=<<");
        console.log(err, "error is ....");
      }
    }
  }

  return (
    <div
      className={classNames("help-message-cnt", size)}
      style={{
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        flex: flex
      }}
    >
      <div className={icon ? icon : "ic_info_circle"}></div>
      <div className="title">
        {title ? title : "نیاز به نتایج بیشتری دارید؟"}
      </div>
      <div className="description">
        {description
          ? description
          : " درصورتی که نیاز به دیدن قیمت و فروشندگان از سایر شهر‌ها و استان‌ها را دارید، این گزینه را انتخاب کنید."}
      </div>
      {showBtn ? (
        <Button
          margin="1rem 0"
          fontSize=".8rem"
          padding=".4rem 1rem"
          type="extra"
          mainType="button"
          onClick={sendMessage}
          text={buttonText ? buttonText : "گسترش دایره مکانی جست و جو"}
        />
      ) : null}
    </div>
  );
};
