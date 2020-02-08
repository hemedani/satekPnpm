import {
  useCreateCategoryMutate,
  useMeQuery,
  useOrganizationParentsQuery
} from "@satek/hooks";
import { createCategoryVariables } from "@satek/resolvers";
import * as H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { CustomError } from "../../../componentShare/customError/CustomError";
import { Loader } from "../../../componentShare/loader/Loader";
import { CategoryBasicInfo } from "../components/basicInfo/BasicInfo";

interface Props {
  isEditable: boolean;
  history: H.History;
  path: string;
}

export const CategoryCreate: React.FC<Props> = ({
  isEditable,
  history,
  path
}) => {
  const { createCategoryMutate } = useCreateCategoryMutate(
    { document: "", organizationId: null },
    client
  );
  const methods = useForm<createCategoryVariables>();

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
    try {
      const result = await createCategoryMutate({ variables: val });
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
            <CategoryBasicInfo
              isHeadOfHospital={path.includes("hospital") ? true : false}
              isEditable={isEditable}
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
            text={isEditable ? "ویرایش بخش" : "افزودن بخش"}
          />
        </div>
      </form>
    </FormContext>
  );
};
