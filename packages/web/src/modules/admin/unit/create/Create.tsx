import {
  useCreateUnitMutate,
  useMeQuery,
  useOrganizationParentsQuery
} from "@satek/hooks";
import { createUnitVariables } from "@satek/resolvers";
import * as H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { LogoSelector } from "../../../componentShare/logoSelector/LogoSelector";
import { MapSelector } from "../../../componentShare/mapSelector/MapSelector";
import { UnitBasicInfo } from "../components/basicInfo/BasicInfo";

interface Props {
  isEditable: boolean;
  history: H.History;
  path: string;
}

export const UnitCreate: React.FC<Props> = ({ isEditable, history, path }) => {
  const { createUnitMutate } = useCreateUnitMutate(
    { document: "", organizationId: null },
    client
  );
  const methods = useForm<createUnitVariables>();

  // ---------------------------------
  // ---------------------------------
  const ResponseMe = useMeQuery(
    { error: CustomError, loading: Loader },

    client
  );
  // ---------------------------------
  // ---------------------------------
  const ResponseOrganizationParents = useOrganizationParentsQuery(
    { error: CustomError, loading: Loader },
    {
      id:
        ResponseMe.data &&
        ResponseMe.data.me &&
        ResponseMe.data.me.userToSites &&
        ResponseMe.data.me.userToSites &&
        ResponseMe.data.me.userToSites &&
        path.includes("hospital")
          ? ResponseMe.data!.me!.userToSites!.filter(
              (t: { role: string }) => t.role === "OrganizationHead"
            )[0].site!.id
          : ""
    },
    client
  );

  const onSubmit = methods.handleSubmit(async variables => {
    let val = variables;
    if (
      path.includes("hospital") &&
      ResponseOrganizationParents.data &&
      ResponseOrganizationParents.data.getOrganization &&
      ResponseOrganizationParents.data.getOrganization.city &&
      ResponseOrganizationParents.data.getOrganization.state &&
      ResponseOrganizationParents.data.getOrganization.university
    ) {
      val = {
        ...variables,
        cityId: ResponseOrganizationParents.data.getOrganization.city.id,
        stateId: ResponseOrganizationParents.data.getOrganization.state.id,
        universityId:
          ResponseOrganizationParents.data.getOrganization.university.id,
        organizationId: ResponseOrganizationParents.data.getOrganization.id
      };
    }
    console.log(variables);
    try {
      const result = await createUnitMutate({ variables: val });
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <FormContext {...methods}>
      <form className="university_modal_box" onSubmit={onSubmit}>
        <div className="details">
          <div className="right">
            <UnitBasicInfo
              isHeadOfHospital={path.includes("hospital") ? true : false}
              isEditable={isEditable}
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
            onClick={() => history.goBack()}
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
