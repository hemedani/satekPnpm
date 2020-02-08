import { useCreateUniversityMutate } from "@satek/hooks";
import { createUniversityVariables } from "@satek/resolvers";
import * as H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { LogoSelector } from "../../../componentShare/logoSelector/LogoSelector";
import { MapSelector } from "../../../componentShare/mapSelector/MapSelector";
import { UniversityBasicInfo } from "../components/BasicInfo/BasicInfo";

interface Props {
  isEditable: boolean;
  history: H.History;
}

export const UniversityCreate: React.FC<Props> = ({ isEditable, history }) => {
  const { createUniversityMutate } = useCreateUniversityMutate(
    { document: "" },
    client
  );
  const methods = useForm<createUniversityVariables>();

  const onSubmit = methods.handleSubmit(async variables => {
    const result = await createUniversityMutate({ variables });
    history.goBack();
  });

  return (
    <FormContext {...methods}>
      <form className="university_modal_box" onSubmit={onSubmit}>
        <div className="details">
          <div className="right">
            <UniversityBasicInfo isEditable={isEditable} />
          </div>
          <div className="log_and_map_selector">
            <Container title="انتخاب لوگو" margin="0 0 1.5rem 0" width="100%">
              <LogoSelector imageHeight="6rem" imageWidth="6rem" />
            </Container>
            <MapSelector
              style={{ flex: 5 }}
              mapStyle={{
                borderRadius: ".5rem",
                height: "100%",
                border: ".5rem"
              }}
            />
          </div>
        </div>
        <div className="btns">
          <Button
            className="btn"
            mainType="button"
            type="cancel"
            to="/admin/university"
            text="انصراف"
          />
          <Button
            className="btn"
            mainType="submit"
            type="main"
            text={isEditable ? "ویرایش دانشگاه" : "افزودن دانشگاه"}
          />
        </div>
      </form>
    </FormContext>
  );
};
