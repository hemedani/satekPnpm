import { useRegisterMutate } from "@satek/hooks";
import { registerStaffVariables } from "@satek/resolvers";
import H from "history";
import React from "react";
import { useForm, FormContext } from "react-hook-form";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { Container } from "../../../componentShare/container/Container";
import { Input } from "../../../componentShare/Input/Input";
import { LogoSelector } from "../../../componentShare/logoSelector/LogoSelector";
import { Selector } from "../../../componentShare/selectors/Selector";
interface Props {
  hasUserRole?: boolean;
  history: H.History;
  path: string;
}

export const UserCreate: React.FC<Props> = ({ history, path, hasUserRole }) => {
  const { registerMutate } = useRegisterMutate({}, client);
  const methods = useForm<registerStaffVariables>();

  const onSubmit = methods.handleSubmit(async variables => {
    const val = { ...variables, phoneNumber: variables.phoneNumber };
    const { data, errors } = await registerMutate({ variables: val });
    history.goBack();
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
            {hasUserRole && (
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
