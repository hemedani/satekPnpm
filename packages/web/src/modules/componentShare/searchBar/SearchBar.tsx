import classNames from "classnames";
import React, { CSSProperties } from "react";
import { useForm, FormContext } from "react-hook-form";
import { Button } from "../button/Button";
import { Input } from "../Input/Input";
import { Selector, SelectorOptions } from "../selectors/Selector";

interface searchBarItem {
  name: string;
  placeHolder: string;
  title: string;
  type: "selector" | "input";
  options?: SelectorOptions[];
  className?: string;
}

interface Props {
  type: "default" | "customize";
  searchBarItems?: searchBarItem[];
  style?: CSSProperties;
  className?: string;
  buttonLinkTitle?: string;
  placeHolder: string;
  linkTo?: string;
  setFilter?: (e: any) => void;
}
export const SearchBar: React.FC<Props> = ({
  buttonLinkTitle,
  placeHolder,
  style,
  linkTo,
  setFilter,
  className,
  type,
  searchBarItems,
  children
}) => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit(async variables => {
    {
      console.log("----VARIABLES------", variables);
    }
    await setFilter!(variables);
  });
  return (
    <>
      {type && type == "customize" ? (
        <FormContext {...methods}>
          <form
            className={classNames(className, "customize-search-bar")}
            onSubmit={onSubmit}
          >
            {console.log(searchBarItems)}
            {searchBarItems!.map((Item, index) =>
              Item.type === "input" ? (
                <Input
                  key={index}
                  register={methods.register}
                  size="medium"
                  title={Item.title}
                  name={Item.name}
                  placeholder={Item.placeHolder}
                  className={Item.className}
                />
              ) : (
                <Selector
                  key={index}
                  className={Item.className}
                  name={Item.name}
                  label={Item.title}
                  placeholder={Item.placeHolder}
                  options={Item.options!}
                  value={Item.options!.find(
                    ({ value }) => value === methods.watch(Item.name)
                  )}
                  onChange={(option: SelectorOptions) => {
                    methods.setValue(Item.name, option.value);
                  }}
                />
              )
            )}
            {children}
            <Button
              className={!linkTo ? "btn-search-default" : "btn-search-large"}
              type="main"
              text="جستجو"
              mainType="submit"
              icon="ic_ic_search"
            ></Button>
            {!linkTo ? null : (
              <Button
                icon="ic_plus"
                className="btn-link-large"
                text={buttonLinkTitle!}
                to={linkTo}
                type="main"
              />
            )}
          </form>
        </FormContext>
      ) : (
        <div
          style={style}
          className={classNames("default-search-bar", className)}
        >
          <FormContext {...methods}>
            <form className="search-box" onSubmit={onSubmit}>
              <Input
                className="Input"
                register={methods.register}
                size="medium"
                title="جستجو"
                name="document"
                placeholder={placeHolder}
                titleStyle={{ width: "3rem" }}
                style={{ flex: "1" }}
              />
              <Button
                type="main"
                className="btn-search-default"
                text="جستجو"
                mainType="submit"
                icon="ic_ic_search"
              ></Button>
            </form>
            <Button
              icon="ic_plus"
              className="btn-link-large"
              text={buttonLinkTitle!}
              to={linkTo}
              type="main"
            />
          </FormContext>
        </div>
      )}
    </>
  );
};
