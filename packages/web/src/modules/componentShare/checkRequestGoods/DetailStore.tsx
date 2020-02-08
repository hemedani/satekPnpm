import {
  ChosenPayment,
  getStuffs_getStuffs_items,
  LongPayment,
  OrderStatus,
  updateOrderStuffStatusVariables
} from "@satek/resolvers";
import cx from "classnames";
import { History } from "history";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { client } from "../../../Apollo";
import { ApolloVar } from "../../../ApolloVar";
import PathToStatus from "../../../PathToStatus";
import { ConvertDateToShamsi } from "../../function/ConvertDate";
import { optionpayLong } from "../../function/ConvertPayment";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";

interface Props {
  data: getStuffs_getStuffs_items;
  orderId: string;
  path?: string;
  index?: string;
  num?: number;
  isNewNum?: boolean;
  history?: History;
  setStuffId?: (value: string) => void;
  timePayment?: LongPayment | null;
  className?: string;
  animation?: string;
  setAnimation?: (value: string) => void;
}

export const DetailStore: React.FC<Props> = ({
  data,
  orderId,
  path,
  history,
  num = 0,
  timePayment,
  animation,
  setAnimation,
  index
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<
    updateOrderStuffStatusVariables
  >();
  const { id } = useParams();
  // const goh = wareId;

  // console.log(id, "id");
  // const [newWare, setNewWare] = useState(wareId && wareId);
  // const { updateOrderMutate } = UseUpdateOrderMutate(
  //   ApolloVar(path, PathToStatus(path!)!, meSiteId),
  //   client
  // );

  function showAnimation() {
    setAnimation!(index!);
  }
  function noneAnimation() {
    setAnimation!("");
  }

  const showModalAccept = () => {
    history!.push({
      pathname: `${path!.split(":")[0]}${id}/modalstuff`,
      state: { stuffId: data.id }
    });
  };
  return (
    <div className="DetailStore-admin">
      <div className="field-right-detailStore-depManger">
        <div className="row-detailStore-depManger">
          <div className="column-detailStore-history-depManger">
            <p className={cx("title-admin", "title-detailStore")}>
              تاریخ انقضا
            </p>
            <p className={cx("name-admin", "name-detailStore")}>
              {ConvertDateToShamsi(data.expiration.split("T")[0])!}
            </p>
          </div>
          <div className="column-detailStore-depManger">
            <p className={cx("title-detailStore")}>
              قیمت واحد کالا با ارزش افزوده
            </p>

            <p className={cx("name-admin", "name-detailStore")}>
              {timePayment && LongPayment[timePayment]
                ? Object(data)[
                    Object.keys(data).find(value =>
                      value.includes(timePayment)
                    )!
                  ]
                : data.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              ریال
              {/* {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال */}
            </p>
          </div>
        </div>
      </div>
      <div className="field-left-detailStore-depManger">
        <div className="castFinal-detailStore-depManger">
          <p className="title-castFinal-detailStore-depManger"> قیمت نهایی</p>
          <p className="title-comment-castFinal-detailStore-depManger">
            (با ارزش افزوده)
          </p>
          <p className="title-cast-detailStore-depManger">
            {timePayment && LongPayment[timePayment]
              ? Object(data)[
                  Object.keys(data).find(value => value.includes(timePayment))!
                ] * num
              : (data.price * num)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {/* {(data.price * num)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}{" "}
            ریال
          </p>
        </div>
        <div className="boxButton-detailStore-depManger">
          {path && path.includes("headofhospital") ? (
            <Button
              fontSize="0.7rem"
              padding={"0.5rem 0.7rem 0.5rem 0.7rem"}
              text="درخواست خرید"
              mainType="button"
              onClick={showAnimation}
              type="main"
            />
          ) : (
            <Button
              fontSize="0.7rem"
              padding={"0.5rem 0.7rem 0.5rem 0.7rem"}
              text="تعدیل و ارسال"
              mainType="button"
              to={`${path!.split(":")[0]}${id}/modalstuff/${data.id}`}
              type="main"
            />
          )}
        </div>
      </div>
    </div>
  );
};
