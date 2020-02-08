import { useCreateCityMutate } from "@satek/hooks";
import { createCityVariables } from "@satek/resolvers";
import { createCityValidation } from "@satek/validations";
import H from "history";
import React, { useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../../Apollo";
import { Button } from "../../../../componentShare/button/Button";
import { Input } from "../../../../componentShare/Input/Input";
import { MapSelector } from "../../../../componentShare/mapSelector/MapSelector";
import { StateParser } from "../../../user/components/parsers/StateParser";

interface Props {
  isEditable: boolean;
  history: H.History;
  path: string;
}

export const CityCreate: React.FC<Props> = ({ isEditable, history, path }) => {
  const methods = useForm<createCityVariables>({
    validationSchema: createCityValidation
  });

  const { createCityMutate } = useCreateCityMutate({}, client);

  const onSubmit = methods.handleSubmit(async variables => {
    try {
      await createCityMutate({ variables });
      history.goBack();
    } catch (err) {
      console.log("err", err);
    }
  });

  useEffect(() => {
    methods.register({ name: "stateId" });
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
            <StateParser type="createCity" />
          </div>
          <MapSelector
            style={{ flex: 5, width: "90%", marginTop: "2rem" }}
            mapStyle={{
              borderRadius: ".5rem",
              height: "100%",
              border: ".5rem"
            }}
          />
        </div>
        <div className="btns">
          <Button
            className="btn"
            mainType="submit"
            type="main"
            text={isEditable ? "ویرایش شهر" : "افزودن شهر"}
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
