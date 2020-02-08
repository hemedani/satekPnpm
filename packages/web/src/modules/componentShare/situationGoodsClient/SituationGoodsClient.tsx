import { useMeQuery, useUpdateOrderStatusMutate } from "@satek/hooks";
import { getOrders_getOrders_items, OrderStatus, updateOrderStatusVariables } from "@satek/resolvers";
import { default as classNames, default as cx } from "classnames";
import { History } from "history";
import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { client } from "../../../Apollo";
import PathToStatus from "../../../PathToStatus";
import { Status } from "../../../Status";
import { ConvertDateToShamsi } from "../../function/ConvertDate";
import { ConvertFastDeliverToHour } from "../../function/ConvertFastDeliverTime";
import { AnimationECG } from "../animation/AnimationECG";
import { Button } from "../button/Button";
import { CustomError } from "../customError/CustomError";
import { Loader } from "../loader/Loader";

interface Props {
    name?: string;
    buttonName: string; 
    colorButton: "blue" | "green";
    typeButton: "Tracking" | "Deliver" | "check" | "Paying";
    lastSituation:
        | "sended"
        | "checking detector"
        | "checking detector"
        | "preparing";
    data: getOrders_getOrders_items;
    detail?: string[] | null;
    textDetail?: string;
    className?: string; 
    setOrderId?: (value:string)=>void;
    path?: string;
    history?: History;
}
export const SituationGoodsClient: React.FC<Props> = props => {
    const { register, handleSubmit, watch, setValue } = useForm<
        updateOrderStatusVariables
    >();
    const way = props.path;
    const data = props.data!;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [showModalDelivery, setShowModalDelivery] = useState(false);
    const [accept, setAccept] = useState<boolean | null>(null);
    const [sent, setSent] = useState<boolean | null>(null);
    function textLastSituation(textSituation: string) {
        switch (textSituation) {
            case "sended":
                return "توسط فروشنده ارسال شد";
            case "checking detector":
                return "در حال بررسی مقام تشخیص";
            case "checking detector":
                return "در حال بررسی مسول واحد";
            case "preparing":
                return "در حال آماده سازی توسط فروشنده";
            default:
                break;
        }
    }
    function setId(val:string):any {
        props.setOrderId!(val)
    }
    // function updateOrderStatus() {
    //   async (variables: any) => {
    //     console.log("variables", variables);

    //     try {
    //       // const result = await updateOrderStatusMutate({ variables });
    //       // console.log("result is", result);
    //     } catch (err) {
    //       console.log(JSON.stringify(err), "error is ....");
    //     }
    //     // console.groupEnd();
    //   };
    // }
    // function organizeStatus(accept: boolean) {}
    
    const meSiteId = useMeQuery(
        { error: CustomError, loading: Loader },

        client
    ).data;
    // console.log(meSiteId, "me site");

    const { updateOrderStatusMutate } = useUpdateOrderStatusMutate(
        {
            organizationId:
                props.path!.includes("hospital") &&
                meSiteId &&
                meSiteId.me &&
                meSiteId.me.userToSites
                    ? meSiteId!.me!.userToSites!.filter(
                          (t: { role: string }) => t.role === "OrganizationHead"
                      )[0].site!.id
                    : "",
            unitId:
                props.path!.includes("manager") &&
                meSiteId &&
                meSiteId.me &&
                meSiteId.me.userToSites
                    ? meSiteId!.me!.userToSites!.filter(
                          (t: { role: string }) => t.role === "UnitHead"
                      )[0].site!.id
                    : props.path!.includes("client") &&
                      meSiteId &&
                      meSiteId.me &&
                      meSiteId.me.userToSites
                    ? meSiteId!.me!.userToSites!.filter(
                          (t: { role: string }) => t.role === "UnitEmployee"
                      )[0].site!.id
                    : "",
            storeId:
                props.path!.includes("seller") &&
                meSiteId &&
                meSiteId.me &&
                meSiteId.me.userToSites
                    ? meSiteId!.me!.userToSites!.filter(
                          (t: { role: string }) => t.role === "StoreHead"
                      )[0].site!.id
                    : "",
             statuses:PathToStatus(props.path!)? PathToStatus(props.path!):null
        },
        client
    );
    setValue("id", data.id);
    // console.log(
    //   {
    //     organizationId:
    //       props.path!.includes("hospital") &&
    //       meSiteId &&
    //       meSiteId.me &&
    //       meSiteId.me.userToSites
    //         ? meSiteId!.me!.userToSites!.filter(
    //             (t: { role: string }) => t.role === "OrganizationHead"
    //           )[0].site!.id
    //         : "",
    //     unitId:
    //       props.path!.includes("manager") &&
    //       meSiteId &&
    //       meSiteId.me &&
    //       meSiteId.me.userToSites
    //         ? meSiteId!.me!.userToSites!.filter(
    //             (t: { role: string }) => t.role === "UnitHead"
    //           )[0].site!.id
    //         : props.path!.includes("client") &&
    //           meSiteId &&
    //           meSiteId.me &&
    //           meSiteId.me.userToSites
    //         ? meSiteId!.me!.userToSites!.filter(
    //             (t: { role: string }) => t.role === "UnitEmployee"
    //           )[0].site!.id
    //         : "",
    //     storeId:
    //       props.path!.includes("seller") &&
    //       meSiteId &&
    //       meSiteId.me &&
    //       meSiteId.me.userToSites
    //         ? meSiteId!.me!.userToSites!.filter(
    //             (t: { role: string }) => t.role === "StoreHead"
    //           )[0].site!.id
    //         : "",
    //     status: PathToStatus(props.path!)
    //   },
    //   "id cached"
    // );
    const onSubmit = handleSubmit(async variables => {
        // console.log(accept, "called... accept");
        // console.log(sent, "called... from seller sent");
        if (accept !== null) {
            let val;
            // console.log("variables", variables);
            switch (props.path) {
                case "/headofhospital/paymentconfirmation":
                    {
                        val = {
                            ...variables,
                            orderStatus: accept
                                ? OrderStatus.Paid
                                : OrderStatus.rejectedByOrganizationHead
                        };
                    }
                    break;
                case "/client/deliverygoods":
                    {
                        val = {
                            ...variables,
                            orderStatus: accept
                                ? OrderStatus.pendingForPay
                                : OrderStatus.rejectedByEmployee
                        };
                    }
                    break;
                case "/seller/newrequests":
                    {
                        val = {
                            ...variables,
                            orderStatus: accept
                                ? OrderStatus.PreparationByStore
                                : OrderStatus.rejectedByStore
                        };
                    }
                    break;
                case "/seller/unfinishedrequest":
                    {
                        val = {
                            ...variables,
                            orderStatus: accept
                                ? OrderStatus.sentByStore
                                : OrderStatus.rejectedByStore
                        };
                    }
                    break;
                case "/headofhospital/viewrequest":
                    {
                        val = {
                            ...variables,
                            orderStatus: accept
                                ? OrderStatus.pendingInStore
                                : OrderStatus.rejectedByOrganizationHead
                        };
                    }

                    break;
                // case "/departmentmanager/viewrequest":
                //   {
                //     val = {
                //       ...variables,
                //       orderStatus: accept
                //         ? OrderStatus.pendingInOrganizationHead
                //         : OrderStatus.rejectedByUnitHead
                //     };
                //   }

                //   break;

                default: {
                    val = {
                        ...variables,
                        orderStatus: accept
                            ? OrderStatus.pendingForPay
                            : OrderStatus.pendingForPay
                    };
                }
            }
            try {
                // val = { ...val };
                console.log(val, "...=<< at first ");

                const result = await updateOrderStatusMutate({
                    variables: val
                });
                // console.log("result is", JSON.stringify(result));
            } catch (err) {
                // console.log(val, "...=<<");
             console.log(err, "error is ....");
            }
        }
        // console.groupEnd();
    });
    useEffect(() => {
        register({ name: "orderStatus" });
        register({ name: "id" });
    }, [register]);
    // console.log(watch("accept"), "<==........accept");
    // console.log(props.path, "its strong but i called...");

    return (
        <>
            <form
                className={classNames(props.className, "SituationGoods-client")}
                onSubmit={onSubmit}
            >
                <div
                    className={cx("fringeColor-SituationGoods-client", [
                        `fringeColor-SituationGoods-${
                            data.status.split(" ")[0]
                        }-client`
                    ])}
                ></div>
                <div className="container-SituationGoods-client">
                    <div className="Situation-container-SituationGoods-client">
                        <div className="colNameGoods-SituationGoods-client">
                            <div className="rowUp-SituationGoods-client">
                                <div className="detail-SituationGoods-client">
                                    
                                {data.fastDelivery&&<div className="box-title-fastDeliver-SituationGoods-client"> <p className="title-fastDeliver-SituationGoods-client">فوری</p></div>  }
                                    <p className="detailGoods-SituationGoods-client font-family-SituationGoods-client ">
                                        {data && data.ware && data.ware.name}
                                    </p>
                                    {data.fastDelivery&& <div style={{width:"4rem"}} ><AnimationECG/> </div>}
                                       </div>
                            </div>
                            <div className="rowDown-SituationGoods-client">
                                <div className="historySubmitRequest-SituationGoods-client">
                                    <span className="ic_calender icon-size-SituationGoods"></span>
                                    <p className="title-SituationGoods-client">
                                        تاریخ ثبت درخواست :
                                    </p>
                                    <p className="detailGoods-SituationGoods-client color-detailGoods-SituationGoods-client">
                                        {data &&
                                            data.ware &&
                                            ConvertDateToShamsi(
                                                data.createdAt.split("T")[0]
                                            )!}
                                    </p>
                                </div>
                                <div className="trackingCode-SituationGoods-client">
                                    <span className="ic_document icon-size-SituationGoods"></span>
                                    <p className="title-SituationGoods-client">
                                        کد پیگیری ساتک
                                    </p>
                                    <p className="detailGoods-SituationGoods-client color-detailGoods-SituationGoods-client small-font-SituationGoods-client">
                                        {data && data.ware && data.trackingcode}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="colNumberGoods-SituationGoods-client">
                            <div className="rowUp-SituationGoods-client">
                                <div className="number-SituationGoods-client">
                                    <p className="title-SituationGoods-client font-family-SituationGoods-client">
                                        تعداد/مقدار
                                    </p>
                                    <p className="detailGoods-SituationGoods-client font-family-SituationGoods-client">
                                        {data && data.ware && data.num} بسته
                                    </p>
                                </div>
                                <div className="dataNeed-SituationGoods-client">
                                    <p className="title-SituationGoods-client">
                                        تاریخ نیاز
                                    </p>
                                    <p className="detailGoods-SituationGoods-client">
                                        {data.fastDelivery
                                            ? data.fastDeliveryTime &&
                                              ConvertFastDeliverToHour(
                                                  data.fastDeliveryTime
                                              )
                                            : data.deliveryTime &&
                                              ConvertDateToShamsi(
                                                  data.deliveryTime.split(
                                                      "T"
                                                  )[0]
                                              )!}
                                    </p>
                                </div>
                            </div>
                            <div className="rowDown-SituationGoods-client">
                                <div className="detail-SituationGoods-client">
                                    <span className="ic_table icon-size-SituationGoods"></span>
                                    <p className="title-SituationGoods-client">
                                        آخرین وضعیت درخواست
                                    </p>
                                    <p
                                        className={cx(
                                            `detailGoods-SituationGoods-${
                                                data.status.split(" ")[0]
                                            }-client`,
                                            "detailGoods-SituationGoods-client"
                                        )}
                                    >
                                        {Status(data.status)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* {console.log(
                            props.path,
                            "path i",
                            props!.path!.includes("headofhospital")
                        )} */}

                        {props!.path!.includes("history") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`${props.path}/detailrequest/${data.id}`}
                                    text={"جزییات درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : props!.path!.includes("expert") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`/expert/checkrequestgood/${props.data.id}`}
                                    text={"بررسی درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : props.path!.includes("departmentmanager") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`/departmentmanager/checkrequestgoods/${props.data.id}`}
                                    text={"بررسی درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : props.path!.includes("seller/newrequests") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`${props.path}/modalviewrequest/${data.id}`}
                                    text={"مشاهده درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : props.path!.includes("seller/unfinishedrequest") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`${props.path}/modalviewrequest/${data.id}`}
                                    text={"مشاهده درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : props.path!.includes("seller/historyrequest") ? (
                            <div className="boxButton-SituationGoods-client">
                                <Button
                                    type="main"
                                    padding="0.5rem 1rem"
                                    fontSize="0.8rem"
                                    to={`${props.path}/modalviewrequest/${data.id}`}
                                    text={"مشاهده درخواست"}
                                    className={cx(
                                        `button-SituationGoods-${props.colorButton}-client`
                                    )}
                                />
                            </div>
                        ) : (
                            <div
                                className={cx(
                                    "checkBoxButton-SituationGoods-client",
                                    {
                                        "checkBoxButton-column-SituationGoods-client": props.path!.includes(
                                            "deliver"
                                        )
                                    }
                                )}
                            >
                                {!props.path!.includes("deliver") && (
                                    <Button
                                        type="main"
                                        padding="0.5rem 0.8rem"
                                        fontSize="0.7rem"
                                        width="3rem"
                                        justifyContent="center"
                                        to={
                                            props.path!.includes(
                                                "headofhospital"
                                            )
                                                ?  props.path!.includes(
                                                    "paymentconfirmation"
                                                )?`/headofhospital/paymentconfirmationfinal/${props.data.id}`:
                                                `/headofhospital/checkrequestgood/${props.data.id}`
                                                : `${props.path}/detailrequest`
                                        }
                                        text={"بررسی"}
                                        className={cx(
                                            `button-SituationGoods-${props.colorButton}-client`
                                        )}
                                    />
                                )}
                                {props.path!.includes(
                                    "headofhospital/viewrequest"
                                ) && (
                                    <>
                                        <Button
                                            className="checkButton-SituationGoods-client"
                                            text="تایید"
                                            fontSize="0.7rem"
                                            margin="0 0.3rem"
                                            padding="0.5rem 0.8rem"
                                            width="3rem"
                                            type="sendReq"
                                            onClick={setId(data.id)}
                                            to={`/headofhospital/viewrequest/acceptorghead/${data.id}`}
                                        />
                                        <Button
                                            className="checkButton-SituationGoods-client"
                                            fontSize="0.7rem"
                                            padding="0.5rem 0.8rem"
                                            width="3rem"
                                            margin="0 0 0 0.5rem"
                                            text="رد"
                                            type="redCancel"
                                            to={`${props.path}/rejectorghead/${data.id}`}
                                        />
                                    </>
                                )}
                                {props.path!.includes(
                                    "headofhospital/paymentconfirmation"
                                ) && (
                                    <>
                                        <Button
                                            className="checkButton-SituationGoods-client"
                                            text="تایید"
                                            fontSize="0.7rem"
                                            margin="0 0.3rem"
                                            padding="0.5rem 0.8rem"
                                            width="3rem"
                                            type="sendReq"
                                            mainType="submit"
                                            onClick={() => setAccept(true)}
                                        />
                                        <Button
                                            className="checkButton-SituationGoods-client"
                                            fontSize="0.7rem"
                                            padding="0.5rem 0.8rem"
                                            width="3rem"
                                            margin="0 0 0 0.5rem"
                                            text="رد"
                                            type="redCancel"
                                            mainType="submit"
                                            onClick={() => setAccept(false)}
                                        />
                                    </>
                                )}
                                {props.path!.includes(
                                    "client/deliverygoods"
                                ) && (
                                    <>
                                        <Button
                                            text="دریافت کالا"
                                            fontSize="0.7rem"
                                            padding="0.5rem 0.8rem"
                                            margin="0 0 0.5rem 1rem"
                                            mainType="submit"
                                            type="sendReq"
                                            to={`${props.path}/modaldeliveryaccept/${data.id}`}
                                            // onClick={() => setShowModalDelivery(true)}
                                        />
                                        <Button
                                            fontSize="0.7rem"
                                            padding="0.5rem 0.8rem"
                                            margin="0 0 0 1rem"
                                            text="استرداد کالا"
                                            mainType="submit"
                                            type="redCancel"
                                            to={`${props.path}/modaldeliveryreject/${data.id}`}

                                            // onClick={() => {
                                            //   setAccept(false);
                                            // }}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    {props.detail && props.detail !== null && (
                        <div className="detailStoreHospital-SituationGoods-client">
                            <div className="detail-detailStoreHospital-SituationGoods-client">
                                <span className="ic_doc_doc icon-color-SituationGoods"></span>
                                <p className="textDetail-SituationGoods-client">
                                    {props.detail[0]}
                                </p>
                                <p className="textDetail-detailStoreHospital-SituationGoods-client">
                                    جزییات
                                </p>
                            </div>
                            {props.detail[1] && (
                                <div className="detail-detailStoreHospital-SituationGoods-client">
                                    <span>#</span>
                                    <p className="textDetail-SituationGoods-client">
                                        {props.detail[1]}
                                    </p>
                                    <p className="textDetail-detailStoreHospital-SituationGoods-client">
                                        جزییات
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* {console.log(props.data, "ehasnakefi")} */}
                {/* <Route
                    exact
                    path={`${props.path}/detailrequest/:id`}
                    render={(asb: any) => {
                        // console.log(props, "pass props...");
                        return (
                            <ModalDetailsRequest
                                {...asb}
                                details={props.data}
                            />
                        );
                    }}
                /> */}
                {/* {showModalDelivery && (
          <ModalDelivery
            history={props.history}
            nameGood={data.ware ? data.ware.name : ""}
            expiration={data.stuff ? data.stuff.expiration : ""}
            company={
              data.stuff && data.stuff.ware
                ? data.stuff.ware.manufacturername
                : ""
            }
            num={data.num ? String(data.num) : ""}
            setAccept={setAccept}
            setShowModalDelivery={setShowModalDelivery}
          />
 
        )} */}
              
              
              
            </form>
        </>
    );
};
