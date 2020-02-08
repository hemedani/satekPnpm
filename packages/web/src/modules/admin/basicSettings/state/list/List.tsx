import { useDeleteStateMutate, useStatesQuery } from "@satek/hooks";
import { getStates_getStates } from "@satek/resolvers";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { client } from "../../../../../Apollo";
import { Button } from "../../../../componentShare/button/Button";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { LabelGeneral } from "../../../../componentShare/labels/LabelGeneral";
import { Loader } from "../../../../componentShare/loader/Loader";

interface Props {
  className?: string;
}

const Parse: React.FC<{ data: getStates_getStates[] }> = ({ data }) => {
  const { deleteStateMutate, setId } = useDeleteStateMutate({}, client);
  return (
    <>
      {data.map(state => (
        <LabelGeneral
          key={state.id}
          name={state.name}
          onClick={() => {
            setId(state.id);
            deleteStateMutate({ variables: { id: state.id } });
          }}
        />
      ))}
    </>
  );
};

export const StatesBox: React.FC<Props> = ({ className }) => {
  const [Filter, setFilter] = useState({ document: "" });
  const [OnSpace, setOnSpace] = useState(false);

  const { Response } = useStatesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { document: Filter.document },
    client
  );
  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.charCode === 32 && setOnSpace(true);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    OnSpace === true && setFilter({ document: event.target.value });
  };
  useEffect(() => {}, [Filter]);
  return (
    <Container
      title="استان‌ها"
      className={classNames("states-box-cnt", className)}
      childStyle={{ padding: "0 .7rem" }}
    >
      <div className="top-bar">
        <Input
          title="جستجو :"
          size="medium"
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          titleStyle={{ fontSize: ".7rem", width: "3rem" }}
          placeholder="استان مورد نظر خود را وارد نمائید"
        />
        <Button
          to="/admin/basicsettings/addstate"
          text="افزودن استان جدید"
          fontSize=".75rem"
          padding=".5rem 1.5rem"
          type="main"
        />
      </div>
      <div className="bottom-bar">
        <div className="responses">{Response}</div>
      </div>
    </Container>
  );
};
