import { useUpdateOrganizationMutate } from "@satek/hooks";
import {
  getOrganizationSimple_getOrganization,
  updateOrganizationVariables
} from "@satek/resolvers";
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
  id: string;
  details: getOrganizationSimple_getOrganization;
  history: H.History;
}

export const HospitalUpdate: React.FC<Props> = ({
  isEditable,
  id,
  details,
  history
}) => {
  const { updateOrganizationMutate } = useUpdateOrganizationMutate(
    { document: "" },
    client
  );

  const methods = useForm<updateOrganizationVariables>({
    defaultValues: {
      name: details.name,
      contact: details.contact,
      address: details.address,
      cityId: details.city!.id,
      stateId: details.state!.id,
      universityId: details.university!.id,
      location: details.location,
      logoUrl: details.logoUrl
    }
  });

  const onSubmit = methods.handleSubmit(async variables => {
    let val;
    if (id && details) {
      val = {
        ...variables,
        id: id,
        universityId: details.university!.id,
        stateId: details.state!.id,
        cityId: details.city!.id
      };
      try {
        const result = await updateOrganizationMutate({ variables: val });
      } catch (err) {}
    }
    history.goBack();
  });

  return (
    <FormContext {...methods}>
      <form className="hospital_modal_box" onSubmit={onSubmit}>
        <div className="details">
          <div className="right">
            <HospitalBasicInfo
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
