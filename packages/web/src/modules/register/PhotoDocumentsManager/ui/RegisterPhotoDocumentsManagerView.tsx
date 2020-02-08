import { useUploadImage } from "@satek/hooks";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import DatePicker from "react-modern-calendar-datepicker";
import { RouteComponentProps } from "react-router";
import Logo from "../../../../image/Client/file.png";
import { Button } from "../../../componentShare/button/Button";
import {
  ConvertDateToDatePicker,
  ConvertDateToMiladi
} from "../../../function/ConvertDate";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

interface Props extends RouteComponentProps {}

export const RegisterPhotoDocumentsManagerView: React.FC<Props> = ({
  history
}) => {
  let registerStorage: any;
  if (localStorage.getItem("register")) {
    registerStorage = JSON.parse(localStorage.getItem("register")!);
  }
  const { register, handleSubmit, setValue } = useForm();

  let { onDrop, img, err } = useUploadImage(setValue, "cardMelliUrl");
  let { onDrop: onDrop1, img: img1 } = useUploadImage(
    setValue,
    "lastNewspaperUrl"
  );
  let { onDrop: onDrop2, img: img2 } = useUploadImage(setValue, "mojavvezUrl");
  let { onDrop: onDrop3, img: img3 } = useUploadImage(setValue, "ceoPhotoUrl");
  const [image, setImage] = useState(img);
  const [image1, setImage1] = useState(img1);
  const [image2, setImage2] = useState(img2);
  const [image3, setImage3] = useState(img3);

  // const onDrop1 = useUploadImage(setValue, "cardMelli").onDrop;
  // const img1 = useUploadImage(setValue, "cardMelli").img;
  // const onDrop2 = useUploadImage(setValue, "cardMelli").onDrop;
  // const img2 = useUploadImage(setValue, "cardMelli").img;
  // const onDrop3 = useUploadImage(setValue, "cardMelli").onDrop;
  // const img3 = useUploadImage(setValue, "cardMelli").img;
  //@ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1
    //@ts-ignore
  } = useDropzone({ onDrop: onDrop1 });
  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2
    //@ts-ignore
  } = useDropzone({ onDrop: onDrop2 });
  const {
    getRootProps: getRootProps3,
    getInputProps: getInputProps3,
    isDragActive: isDragActive3
    //@ts-ignore
  } = useDropzone({ onDrop: onDrop3 });

  const [selectedDay, setSelectedDay] = useState(
    registerStorage && registerStorage[1]
      ? registerStorage[1].certificateExpireDate
        ? ConvertDateToDatePicker(registerStorage[1].certificateExpireDate)
        : null
      : null
  );
  const onSubmit = handleSubmit(variables => {
    if (!selectedDay) {
      return;
    }
    let selectedDays = {
      certificateExpireDate: ConvertDateToMiladi(selectedDay!),
      certificateNumber: variables.certificateNumber
    };
    if (
      !variables.cardMelliUrl &&
      registerStorage &&
      registerStorage[1] &&
      registerStorage[1].cardMelliUrl
    ) {
      variables.cardMelliUrl = registerStorage[1].cardMelliUrl;
    }
    if (
      !variables.lastNewspaperUrl &&
      registerStorage &&
      registerStorage[1] &&
      registerStorage[1].lastNewspaperUrl
    ) {
      variables.lastNewspaperUrl = registerStorage[1].lastNewspaperUrl;
    }
    if (
      !variables.mojavvezUrl &&
      registerStorage &&
      registerStorage[1] &&
      registerStorage[1].mojavvezUrl
    ) {
      variables.mojavvezUrl = registerStorage[1].mojavvezUrl;
    }
    if (
      !variables.ceoPhotoUrl &&
      registerStorage &&
      registerStorage[1] &&
      registerStorage[1].ceoPhotoUrl
    ) {
      variables.ceoPhotoUrl = registerStorage[1].ceoPhotoUrl;
    }
    // if (registerStorage && registerStorage[1]) {
    //   variables.cardMelliUrl && registerStorage[1].cardMelliUrl
    //     ? (variables.cardMelliUrl = registerStorage[1].cardMelliUrl)
    //     : null;
    // }
    selectedDays = Object.assign({}, variables, selectedDays);
    let levelOneRegister = JSON.parse(localStorage.getItem("register")!);
    if (levelOneRegister) {
      levelOneRegister[1] = selectedDays;
      localStorage.setItem("register", JSON.stringify(levelOneRegister));
    } else {
      localStorage.setItem("register", JSON.stringify([selectedDays]));
    }
    console.log(selectedDays);
    history.push("/register/informationbank");
  });
  useEffect(() => {
    register({ name: "cardMelliUrl" });
    register({ name: "ceoPhotoUrl" });
    register({ name: "lastNewspaperUrl" });
    register({ name: "mojavvezUrl" });
    if (!localStorage.getItem("register")) {
      history.push("/register/StoreOrganization");
    }
    if (registerStorage && registerStorage[1]) {
      registerStorage[1].cardMelliUrl &&
        setImage(registerStorage[1].cardMelliUrl);
      registerStorage[1].lastNewspaperUrl &&
        setImage1(registerStorage[1].lastNewspaperUrl);
      registerStorage[1].mojavvezUrl &&
        setImage2(registerStorage[1].mojavvezUrl);
      registerStorage[1].ceoPhotoUrl &&
        setImage3(registerStorage[1].ceoPhotoUrl);
    }
  }, [history, register, registerStorage]);

  return (
    <ContainerRegister
      btn={true}
      btnName="مرحله بعدی"
      title="ثبت اطلاعات هویتی"
    >
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="containerRegisterPhoto">
          <div className="up-itemRegisterPhotoEdit">
            <div
              className={cx(
                "itemRegisterPhotoEdit",
                "itemRegisterPhotoEdit-width",
                {
                  "border-new-itemRegisterPhotoEdit": image || img
                }
              )}
            >
              <div
                className={cx("border-itemRegisterPhotoEdit")}
                {...getRootProps()}
              >
                {/*
 // @ts-ignore */}
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-upload-center">
                    تصویر کارت ملی مدیرعامل به اینجا بکشید ...
                  </p>
                ) : (
                  <p className="text-upload-center">
                    تصویر کارت ملی مدیرعامل در اینجا رها یا آن را از فایل انتخاب
                    کنید
                  </p>
                )}
                <div className="img-uploader">
                  <img
                    className={cx("img-containerRegisterPhoto", {
                      "img-size-containerRegisterPhoto": image || img
                    })}
                    id="image"
                    src={
                      image
                        ? `http://localhost:4000/files/images/${image}`
                        : img
                        ? `http://localhost:4000/files/images/${img}`
                        : Logo
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className={cx(
                "itemRegisterPhotoEdit",
                "itemRegisterPhotoEdit-width",
                {
                  "border-new-itemRegisterPhotoEdit": image2 || img2
                }
              )}
            >
              <div
                className={cx("border-itemRegisterPhotoEdit")}
                {...getRootProps2()}
              >
                {/*
 // @ts-ignore */}
                <input {...getInputProps2()} />
                {isDragActive2 ? (
                  <p className="text-upload-center">
                    تصویر مجوز فعالیت/پروانه تولید به اینجا بکشید ...
                  </p>
                ) : (
                  <p className="text-upload-center">
                    تصویر مجوز فعالیت/پروانه تولید در اینجا رها یا آن را از فایل
                    انتخاب کنید
                  </p>
                )}
                <div className="img-uploader">
                  <img
                    className={cx("img-containerRegisterPhoto")}
                    id="image"
                    src={
                      image2
                        ? `http://localhost:4000/files/images/${image2}`
                        : img2
                        ? `http://localhost:4000/files/images/${img2}`
                        : Logo
                    }
                  />
                </div>
              </div>
              <div className="box-input-itemRegisterPhotoEdit">
                <p className="title-itemRegisterPhotoEdit">تاریخ اعتبار</p>
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  inputPlaceholder=" "
                  shouldHighlightWeekends
                  wrapperClassName="input-date-itemRegisterPhotoEdit "
                  calendarClassName="responsive-calendar-itemRegisterPhotoEdit"
                  locale="fa"
                />
              </div>
              <div className="box-input-itemRegisterPhotoEdit">
                <p className="title-itemRegisterPhotoEdit">شماره مجوز</p>
                <input
                  ref={register}
                  defaultValue={
                    registerStorage &&
                    registerStorage[1] &&
                    registerStorage[1].certificateNumber
                  }
                  name="certificateNumber"
                  className="input-share input-dir-left-RegisterStoreOrgan"
                />
              </div>
            </div>
          </div>
          <div className="up-itemRegisterPhotoEdit">
            <div
              className={cx(
                "itemRegisterPhotoEdit",
                "itemRegisterPhotoEdit-width",
                {
                  "border-new-itemRegisterPhotoEdit": image1 || img1
                }
              )}
            >
              <div
                className={cx("border-itemRegisterPhotoEdit")}
                {...getRootProps1()}
              >
                {/*
 // @ts-ignore */}
                <input {...getInputProps1()} />
                {isDragActive1 ? (
                  <p className="text-upload-center">
                    تصویر آخرین تغییرات روزنامه رسمی به اینجا بکشید ...
                  </p>
                ) : (
                  <p className="text-upload-center">
                    تصویر آخرین تغییرات روزنامه رسمی در اینجا رها یا آن را از
                    فایل انتخاب کنید
                  </p>
                )}
                <div className="img-uploader">
                  <img
                    className={cx("img-containerRegisterPhoto", {
                      "img-size-containerRegisterPhoto": image1 || img1
                    })}
                    id="image"
                    src={
                      image1
                        ? `http://localhost:4000/files/images/${image1}`
                        : img1
                        ? `http://localhost:4000/files/images/${img1}`
                        : Logo
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className={cx(
                "itemRegisterPhotoEdit",
                "itemRegisterPhotoEdit-width",
                {
                  "border-new-itemRegisterPhotoEdit": image3 || img3
                }
              )}
            >
              <div
                className={cx("border-itemRegisterPhotoEdit")}
                {...getRootProps3()}
              >
                {/*
 // @ts-ignore */}
                <input {...getInputProps3()} />
                {isDragActive3 ? (
                  <p className="text-upload-center">
                    تصویر عکس پرسنلی مدیرعامل به اینجا بکشید ...
                  </p>
                ) : (
                  <p className="text-upload-center">
                    تصویر عکس پرسنلی مدیرعامل در اینجا رها یا آن را از فایل
                    انتخاب کنید
                  </p>
                )}
                <div className="img-uploader">
                  <img
                    className={cx("img-containerRegisterPhoto", {
                      "img-size-containerRegisterPhoto": img3 || image3
                    })}
                    id="image"
                    src={
                      image3
                        ? `http://localhost:4000/files/images/${image3}`
                        : img3
                        ? `http://localhost:4000/files/images/${img3}`
                        : Logo
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomBodyBoxRegisterStoreContainer">
          <div className="itemContainerRegisterStore">
            <Button
              text="مرحله بعدی"
              type="main"
              mainType="submit"
              padding="0.5rem 0.8rem 0.5rem 0.8rem"
            />
          </div>
        </div>
      </form>
    </ContainerRegister>
  );
};
