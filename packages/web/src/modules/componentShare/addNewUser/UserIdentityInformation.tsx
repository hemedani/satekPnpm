import { useRegisterMutate } from "@satek/hooks";
import { registerStaffVariables } from "@satek/resolvers";
import React, { useState } from "react";
import { FormContext, useForm } from "react-hook-form";
import { client } from "../../../Apollo";
import { Input } from "../../componentShare/Input/Input";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import { LogoSelector } from "../logoSelector/LogoSelector";
import { Selector } from "../selectors/Selector";

interface Props {
  hasUserRole: boolean;
  myCallback(props: string): void;
  path?: string;
  siteLabel: string;
}

export const UserIdentityInformation: React.FC<Props> = props => {
  const { registerMutate } = useRegisterMutate({}, client);
  const [idReceived, setIdReceived] = useState(false);

  const methods = useForm<registerStaffVariables>();
  const onSubmit = methods.handleSubmit(async variables => {
    const val = { ...variables, phoneNumber: variables.phoneNumber };

    const { data, errors } = await registerMutate({ variables: val });
    props.myCallback(data!.registerStaff.id);
    if (data!.registerStaff.id !== "") {
      setIdReceived(true);
    }
  });
  return (
    <FormContext {...methods}>
      <form className="user-basic-info-cnt" onSubmit={onSubmit}>
        <div className="top">
          <Container className="right" title="اطلاعات هویتی کاربر">
            <div className="row-twice">
              <Input
                register={methods.register}
                size="medium"
                name="firstName"
                title="نام"
                className="input"
              />
              <Input
                className="input"
                title="نام خانوادگی"
                size="medium"
                name="lastName"
                register={methods.register}
              />
            </div>
            <div className="row-twice">
              <Input
                className="input"
                title="کد ملی"
                size="medium"
                name="ssn"
                register={methods.register}
              />
              <Input
                className="input"
                title="شماره تماس"
                size="medium"
                name="phoneNumber"
                selectType="Number"
                register={methods.register}
              />
            </div>
            <div className="row-twice">
              <Input
                className="input"
                title="رمز عبور"
                size="medium"
                name="password"
                register={methods.register}
                selectType="password"
              />
              <div className="btns">
                <p className="title">محل خدمت</p>
                <Button
                  className="btn"
                  fontSize="0.8rem"
                  padding="0.5rem 1rem"
                  disabled={idReceived ? false : true}
                  to={`/${props.path}/addnewuser/serviceuser`}
                  type={idReceived ? "main" : "disable"}
                  text={props.siteLabel ? props.siteLabel : "انتخاب محل خدمت"}
                />
              </div>
            </div>
            <div className="bottom-useridentityinformation">
              <Button
                className="btn"
                mainType="button"
                type="cancel"
                text="انصراف"
              />
              <Button
                className="btn"
                mainType="submit"
                type="main"
                text="افزودن"
              />
            </div>
            {props.hasUserRole && (
              <Selector
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between"
                }}
                labelStyle={{ width: "6rem" }}
                width="100%"
                label="نقش کاربری"
                placeholder=""
                options={[{ label: "Asd", value: "asdas" }]}
                name="state"
              />
            )}
          </Container>
          <div className="left">
            <Container title="انتخاب لوگو">
              <LogoSelector imageHeight="6rem" imageWidth="6rem" />
            </Container>
          </div>
        </div>
      </form>
    </FormContext>
  );
};
