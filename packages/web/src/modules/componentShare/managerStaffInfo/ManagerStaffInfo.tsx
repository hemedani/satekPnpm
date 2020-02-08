import React, { useState } from "react";
import { Container } from "../container/Container";
import { HelpMessage } from "../helpMessage/HelpMessage";
import { Selector } from "../selectors/Selector";

export const ManagerStaffInfo = () => {
  const [showHelp, setShowHelp] = useState<boolean | null>(false);
  const handleChange = (e: any) => {
    if (e && e !== null) {
      setShowHelp(true);
    } else {
      setShowHelp(false);
    }
  };
  return (
    <Container
      title="اطلاعات مدیر و کارمندان واحد"
      width="100%"
      height="100%"
      childStyle={{
        display: "flex",
        flexBasis: "column",
        justifyContent: "space-evenly"
      }}
    >
      <Selector
        style={{ padding: "0 1rem", flex: "1", marginTop: "2rem" }}
        labelStyle={{ marginBottom: ".5rem" }}
        label="مسئول واحد"
        name="unitBoss"
        options={[
          { label: "کرمان", value: "kerman" },
          { label: "همدان", value: "hamedan" }
        ]}
        placeholder="کاربر مورد نظر خود را انتخاب کنید"
      />
      <Selector
        style={{ padding: "0 1rem", flex: "1" }}
        labelStyle={{ marginBottom: ".5rem" }}
        label="کارمندان واحد"
        name="unitBoss"
        options={[
          { label: "کرمان", value: "kerman" },
          { label: "همدان", value: "hamedan" }
        ]}
        placeholder="کاربر مورد نظر خود را انتخاب کنید"
      />
      <Selector
        isMulti
        style={{ padding: "0 1rem", flex: showHelp ? "3" : "1" }}
        labelStyle={{ marginBottom: ".5rem" }}
        label="زیر واحد"
        name="unitBoss"
        options={[
          { label: "کرمان", value: "kerman" },
          { label: "همدان", value: "hamedan" }
        ]}
        placeholder="کاربر مورد نظر خود را انتخاب کنید"
        onChange={handleChange}
      />
      {showHelp ? null : (
        <HelpMessage
          size="medium"
          showBtn={false}
          flex="2"
          title="تا کنون زیر واحدی انتخاب نشده است"
          description="زیر واحد مورد نظر خود را انخاب کنید"
        />
      )}
    </Container>
  );
};
