import { History } from "history";
import React from "react";
import NameSatek from "../../../image/Logo/satek type.svg";
import Logo from "../../../image/Logo/Satek_logo.svg";
import { unAuth } from "../../function/unAuth";

interface Props {
  history: History;
  hamburgerBtn?: boolean;
  setHamburgerBtn?: (variable: boolean) => void;
}
export const NavbarClient: React.FC<Props> = ({
  history,
  setHamburgerBtn,
  hamburgerBtn
}) => {
  const openSide = () => {
    setHamburgerBtn!(!hamburgerBtn);
  };
  return (
    <div className="nav-client">
      <div className="right-nav-client">
        <div className="nav-navbarlogo">
          <span
            onClick={openSide}
            className="hamburger-icon-navbarlogo ic_hamburger_menu"
          ></span>
          <img className="logoicon-navbarlogo" alt="NotFound" src={Logo} />
          <img
            className="textlogoicon-navbarlogo"
            alt="NotFound"
            src={NameSatek}
          />
        </div>
      </div>
      <div className="left-nav-client">
        <ul className="field-nav-client">
          <li onClick={() => unAuth(history!)} className="list-account">
            خروج
          </li>
          <li className="list-account">
            اطلاعیه ها
            <span className="ic_alarm icon-nav"></span>
          </li>
          <li className="list-account">
            پیام ها
            <div>
              <span className="ic_mail icon-nav"></span>
              {/* <div className="alarm-notification-nav">3</div> */}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
