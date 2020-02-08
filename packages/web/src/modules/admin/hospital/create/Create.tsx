import { useCreateOrganizationMutate } from "@satek/hooks";
import { createOrganizationVariables } from "@satek/resolvers";
import * as H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { LogoSelector } from "../../../componentShare/logoSelector/LogoSelector";
import { MapSelector } from "../../../componentShare/mapSelector/MapSelector";
import { HospitalBasicInfo } from "../components/basicInfo/BasicInfo";

interface Props {
  isEditable: boolean;
  history: H.History;
}

export const HospitalCreate: React.FC<Props> = ({ isEditable, history }) => {
  const { createOrganizationMutate } = useCreateOrganizationMutate(
    { document: "" },
    client
  );

  const methods = useForm<createOrganizationVariables>();

  const onSubmit = methods.handleSubmit(async variables => {
    try {
      const result = await createOrganizationMutate({ variables });
    } catch (err) {}
    history.goBack();
  });

  return (
    <FormContext {...methods}>
      <form className="hospital_modal_box" onSubmit={onSubmit}>
        <div className="details">
          <div className="right">
            <HospitalBasicInfo isEditable={isEditable} />
          </div>
          <div className="log_and_map_selector">
            <Container title="انتخاب لوگو" margin="0 0 1.5rem 0" width="100%">
              <LogoSelector imageHeight="5rem" imageWidth="5rem" />
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
            to="/admin/hospital"
            text="انصراف"
          />
          <Button
            className="btn"
            mainType="submit"
            type="main"
            text={isEditable ? "ویرایش بیمارستان" : "افزودن بیمارستان"}
          />
        </div>
      </form>
    </FormContext>
  );
};
