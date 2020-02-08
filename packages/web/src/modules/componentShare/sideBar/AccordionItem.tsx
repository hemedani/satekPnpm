import React, { useEffect, useRef, useState } from "react";
import MenuSvg from "./MenuSvg";

interface Props {
  index: number;
  icon?: string;
  title: string;
  content?: React.ReactNode;
  mainItemIndex: number;
  setMainItemIndex: (e: any) => void;
}

const AccordionItem: React.FC<Props> = ({
  icon,
  title,
  content,
  mainItemIndex,
  setMainItemIndex,
  index
}) => {
  const [Enable, setEnable] = useState("disable");
  const [Height, setHeight] = useState("0px");
  const [Rotate, setRotate] = useState("accordion__icon");

  const _content = useRef(document.createElement("div"));

  function toggleAccordion() {
    setMainItemIndex(index);
    setEnable(Enable === "disable" ? "enable" : "disable");
    setHeight(
      Enable === "enable" ? "0px" : `${_content.current.scrollHeight}px`
    );
    setRotate(
      Enable === "enable" ? "accordion__icon" : "accordion__icon rotate"
    );
  }
  useEffect(() => {
    if (mainItemIndex !== index) {
      setEnable("disable");
      setHeight("0px");
      setRotate("accordion__icon");
    }
  }, [mainItemIndex]);
  return (
    <div className="accordion__section">
      <button className={`accordion ${Enable}`} onClick={toggleAccordion}>
        <div className={icon} />
        <p className="accordion__title">{title}</p>
        <MenuSvg className={`${Rotate}`} width={10} fill={"#728DF1"} />
      </button>
      <div
        ref={_content}
        style={{ maxHeight: `${Height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
