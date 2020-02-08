import React from "react";
import { Link } from "react-router-dom";

interface Props {
  level: number;
}
export const ListLevelRegister: React.FC<Props> = ({ level }) => {
  const registerStorage = JSON.parse(localStorage.getItem("register")!);
  if (registerStorage && registerStorage.length + 1 >= level) {
    level = registerStorage.length + 1;
  }
  const FiledName = [
    "ثبت اطلاعات هویتی",
    "بارگذاری مدارک هویتی",
    "ثبت اطلاعات مالی",
    "تعهدات فروش و ارسال",
    "مطالعه قوانین و مقررات",
    "تایید نهایی سامانه"
  ];
  const path = [
    "/register/StoreOrganization",
    "/register/photodocumentsmanager",
    "/register/informationbank",
    "/register/commitmentssales",
    "/register/rule",
    "/register/finalapproval"
  ];
  return (
    <svg className="svgRegisterListLevel">
      {FiledName.map((name: string, index: number) => (
        <React.Fragment key={index}>
          <circle
            cx="15"
            cy={65 + 80 * index}
            r="8"
            fill={level > index ? "blue" : "gray"}
          />
          <text x="30" y={65 + 80 * index}>
            {level > index ? (
              <Link
                to={level > index ? path[index] : ""}
                className={
                  level === index + 1
                    ? "thisNameRegisterListLevel"
                    : "pastNameRegisterListLevel"
                }
              >
                {name}
              </Link>
            ) : (
              <a className="otherNameRegisterListLevel">{name}</a>
            )}
          </text>
          {index + 1 !== 6 ? (
            <line
              x1="15"
              y1={73 + 80 * index}
              x2="15"
              y2={70 + 80 * (index + 1)}
              className="styleLineRegisterListLevel"
            />
          ) : null}
        </React.Fragment>
      ))}
    </svg>
  );
};
