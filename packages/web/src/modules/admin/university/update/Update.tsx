import { UseUpdateUniversityMutate } from "@satek/hooks";
import {
  getUniversity_getUniversity,
  updateUniversityVariables
} from "@satek/resolvers";
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
  id: string;
  details: getUniversity_getUniversity;
  history: H.History;
}

export const UniversityUpdate: React.FC<Props> = ({
  isEditable,
  id,
  details,
  history
}) => {
  const { updateUniversityMutate } = UseUpdateUniversityMutate(
    { document: "" },
    client
  );
  const methods = useForm<updateUniversityVariables>({
    defaultValues: {
      name: details.name,
      address: details.address,
      cityId: details.city!.id,
      stateId: details.state!.id
    }
  });

  const onSubmit = methods.handleSubmit(async variables => {
    console.log(variables, "result");
    let val;
    if (id && details) {
      val = {
        ...variables,
        id: id,
        stateId: details.state!.id,
        cityId: details.city!.id
      };
      try {
        const result = await updateUniversityMutate({ variables: val });
      } catch (err) {}
    }
    history.goBack();
  });

  return (
    <FormContext {...methods}>
      <form className="university_modal_box" onSubmit={onSubmit}>
        <div className="details">
          <div className="right">
            <UniversityBasicInfo
              isEditable={isEditable}
              details={isEditable ? details : undefined}
            />
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
