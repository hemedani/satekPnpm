import { useCreateStateMutate } from "@satek/hooks";
import { createStateVariables } from "@satek/resolvers";
import * as H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Button } from "../../../../componentShare/button/Button";
import { Input } from "../../../../componentShare/Input/Input";
import { MapSelector } from "../../../../componentShare/mapSelector/MapSelector";

interface Props {
  isEditable: boolean;
  history: H.History;
  path: string;
}

export const StateCreate: React.FC<Props> = ({ isEditable, history, path }) => {
  const methods = useForm<createStateVariables>();

  const { createStateMutate } = useCreateStateMutate({}, client);

  const onSubmit = methods.handleSubmit(async variables => {
    try {
      await createStateMutate({ variables });
      history.goBack();
    } catch (err) {
      console.group("err");
      console.log(err);
      console.log("err", err);
      console.groupEnd();
    }
  });

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} className="basic_setting_modal_box">
        <div className="details">
          <div className="inputs">
            <Input
              className="input"
              classNameTitle="title"
              register={methods.register}
              size="medium"
              name="name"
              title="نام"
            />
            <Input
              className="input"
              classNameTitle="title"
              register={methods.register}
              size="medium"
              name="enName"
              title="نام انگلییسی"
            />
          </div>
          <MapSelector
            style={{ flex: 5, width: "90%", marginTop: "2rem" }}
            mapStyle={{
              borderRadius: ".5rem",
              height: "100%",
              border: ".5rem"
            }}
            // setValue={setValue}
          />
        </div>
        <div className="btns">
          <Button
            className="btn"
            mainType="submit"
            type="main"
            text={isEditable ? "ویرایش استان" : "افزودن استان"}
          />
          <Button
            className="btn"
            mainType="button"
            type="cancel"
            onClick={() => history.goBack()}
            text="انصراف"
          />
        </div>
      </form>
    </FormContext>
  );
};
