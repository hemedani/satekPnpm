import cx from "classnames";
import React, { useState } from "react";
import { Avatar } from "../avatar/Avatar";
import AccordionItem from "./AccordionItem";
import MonoItem from "./MonoItem";
import SideBarMenuItem from "./SideBarMenuItem";

interface AccordionItemProps {
  itemPath: string;
  title: string;
  icon?: string;
}
interface GeneralItemProps {
  type: "Accordion" | "Mono";
  itemPath?: string;
  title: string;
  icon?: string;
  innerMenuArray?: AccordionItemProps[];
}
interface Props {
  imageURL: string;
  fullName: string;
  level: string;
  path: string;
  hamburgerBtn?: boolean;
  menuArray: GeneralItemProps[];
  location?: string;
}
export const SideBar: React.FC<Props> = ({
  imageURL,
  fullName,
  level,
  path,
  menuArray,
  location,
  hamburgerBtn
}) => {
  const [MainItemIndex, setMainItemIndex] = useState();
  return (
    <div className={cx("SideBar", { "SideBar-show": hamburgerBtn })}>
      <Avatar imageURL={imageURL} fullName={fullName} level={level} />
      {menuArray.map((Item, index) =>
        Item.type === "Accordion" ? (
          <AccordionItem
            mainItemIndex={MainItemIndex}
            setMainItemIndex={setMainItemIndex}
            key={index}
            index={index}
            icon={Item.icon}
            title={Item.title}
            content={
              <div>
                {Item.innerMenuArray
                  ? Item.innerMenuArray.map((InnerItem, _index) => (
                      <SideBarMenuItem
                        key={_index}
                        path={`${path}/${InnerItem.itemPath}`}
                        title={InnerItem.title}
                        icon={InnerItem.icon}
                        location={location}
                      />
                    ))
                  : null}
              </div>
            }
          />
        ) : (
          <MonoItem
            key={index}
            path={`${path}/${Item.itemPath}`}
            title={Item.title}
            icon={Item.icon}
            location={location}
          />
        )
      )}
    </div>
  );
};
